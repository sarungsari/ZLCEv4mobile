import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Metadata cache draft untuk pemantauan dan audit state editor
 */
export interface AutoDraftMeta {
  savedAt: number;
  savedAtFormatted: string;
  charCount: number;
  lineCount: number;
  docType?: string;
  source: 'debounce-400ms' | 'manual-save' | 'lifecycle-flush' | 'storage-sync';
}

export interface UseAutoDraftCacheOptions {
  /**
   * Kunci penyimpanan LocalStorage untuk teks Markdown.
   * Default: 'zlce_workspace_draft_content'
   */
  storageKey?: string;
  /**
   * Kunci penyimpanan LocalStorage untuk metadata draft.
   * Default: 'zlce_workspace_draft_meta'
   */
  metaKey?: string;
  /**
   * Durasi debounce ketikan dalam milidetik.
   * Standar TASK-012 ZLCE: 400ms.
   */
  debounceMs?: number;
  /**
   * Pulihkan draft terakhir secara transparan saat komponen dimuat.
   * Default: true.
   */
  autoRestore?: boolean;
  /**
   * Tipe dokumen terdeteksi opsional untuk pencatatan metadata.
   */
  docType?: string;
  /**
   * Callback yang dipicu saat draft berhasil disimpan otomatis.
   */
  onAutoSave?: (content: string, meta: AutoDraftMeta) => void;
  /**
   * Callback yang dipicu saat draft lama dipulihkan saat startup.
   */
  onRestore?: (content: string, meta: AutoDraftMeta | null) => void;
}

export interface UseAutoDraftCacheReturn {
  /** Konten teks saat ini yang sedang diedit */
  draftContent: string;
  /** Pengubah teks yang secara otomatis memicu debounce 400ms */
  setDraftContent: (newContent: string | ((prev: string) => string)) => void;
  /** Status sedang menunggu debounce atau proses penyimpanan */
  isSaving: boolean;
  /** Status apakah teks di memori sudah tersimpan persis di LocalStorage */
  isDraftSaved: boolean;
  /** Waktu penyimpanan sukses terakhir */
  lastSavedAt: Date | null;
  /** Apakah ada draft yang tersimpan di LocalStorage */
  hasStoredDraft: boolean;
  /** Metadata detail dari draft yang tersimpan */
  storedDraftMeta: AutoDraftMeta | null;
  /** Menandakan apakah konten awal saat ini berasal dari pemulihan draft otomatis */
  isRestoredFromDraft: boolean;
  /** Simpan instan tanpa menunggu debounce 400ms */
  saveNow: () => void;
  /** Buang draft dari LocalStorage dan kembalikan ke teks acuan */
  discardDraft: (fallbackContent?: string) => void;
  /** Paksa pemulihan draft dari LocalStorage secara eksplisit */
  restoreStoredDraft: () => string | null;
  /** Hapus seluruh penyimpanan draft di LocalStorage */
  clearDraftStorage: () => void;
}

const DEFAULT_STORAGE_KEY = 'zlce_workspace_draft_content';
const DEFAULT_META_KEY = 'zlce_workspace_draft_meta';
const DEFAULT_DEBOUNCE_MS = 400; // Standar kanonik ZLCE TASK-012

/**
 * Custom Hook: useAutoDraftCache
 * Mengelola cache draft editor Markdown di LocalStorage dengan debounce 400ms.
 * Memastikan proteksi data loss terhadap:
 * 1. Penutupan tab tidak sengaja
 * 2. Pembersihan memori oleh Android Low Memory Killer (LMK) saat berpindah ke Termux / peramban AI
 * 3. Pemulihan transparan saat aplikasi dibuka kembali
 */
export function useAutoDraftCache(
  initialContent: string = '',
  options: UseAutoDraftCacheOptions = {}
): UseAutoDraftCacheReturn {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    metaKey = DEFAULT_META_KEY,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    autoRestore = true,
    docType,
    onAutoSave,
    onRestore
  } = options;

  // Baca metadata awal dari LocalStorage
  const getInitialStoredMeta = (): AutoDraftMeta | null => {
    if (typeof window === 'undefined') return null;
    try {
      const rawMeta = localStorage.getItem(metaKey);
      if (rawMeta) {
        return JSON.parse(rawMeta);
      }
    } catch (e) {
      console.warn('[useAutoDraftCache] Gagal membaca metadata draft:', e);
    }
    return null;
  };

  // Status awal apakah draft berhasil dipulihkan secara transparan
  const initialCheckRef = useRef<{ restored: boolean; content: string }>({
    restored: false,
    content: initialContent
  });

  // Tentukan konten awal (apakah pulihkan dari draft atau gunakan initialContent)
  const [draftContent, setDraftContentState] = useState<string>(() => {
    if (typeof window === 'undefined') return initialContent;

    if (autoRestore) {
      try {
        const savedDraft = localStorage.getItem(storageKey);
        // Pulihkan jika ada draft tersimpan yang valid dan tidak kosong
        if (savedDraft !== null && savedDraft.trim().length > 0) {
          initialCheckRef.current = {
            restored: true,
            content: savedDraft
          };
          return savedDraft;
        }
      } catch (e) {
        console.warn('[useAutoDraftCache] Gagal membaca draft saat inisialisasi:', e);
      }
    }

    initialCheckRef.current = {
      restored: false,
      content: initialContent
    };
    return initialContent;
  });

  const [isRestoredFromDraft, setIsRestoredFromDraft] = useState<boolean>(
    initialCheckRef.current.restored
  );
  const [storedDraftMeta, setStoredDraftMeta] = useState<AutoDraftMeta | null>(getInitialStoredMeta);
  const [hasStoredDraft, setHasStoredDraft] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(storageKey);
      return Boolean(saved && saved.trim().length > 0);
    } catch {
      return false;
    }
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDraftSaved, setIsDraftSaved] = useState<boolean>(true);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(() => {
    const meta = getInitialStoredMeta();
    return meta ? new Date(meta.savedAt) : null;
  });

  // Refs untuk pelacakan nilai terbaru tanpa re-bind callback
  const contentRef = useRef<string>(draftContent);
  contentRef.current = draftContent;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDirtyRef = useRef<boolean>(false);
  const initialContentRef = useRef<string>(initialContent);

  // Memicu callback onRestore jika terjadi pemulihan awal
  useEffect(() => {
    if (initialCheckRef.current.restored) {
      onRestore?.(initialCheckRef.current.content, storedDraftMeta);
    }
  }, []);

  // Fungsi internal untuk menulis ke LocalStorage
  const persistDraft = useCallback(
    (
      textToSave: string,
      source: AutoDraftMeta['source'] = 'debounce-400ms'
    ): AutoDraftMeta | null => {
      if (typeof window === 'undefined') return null;

      try {
        const now = Date.now();
        const lines = textToSave ? textToSave.split('\n').length : 0;
        const meta: AutoDraftMeta = {
          savedAt: now,
          savedAtFormatted: new Date(now).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          charCount: textToSave.length,
          lineCount: lines,
          docType: docType,
          source
        };

        localStorage.setItem(storageKey, textToSave);
        localStorage.setItem(metaKey, JSON.stringify(meta));

        setIsSaving(false);
        setIsDraftSaved(true);
        setLastSavedAt(new Date(now));
        setHasStoredDraft(Boolean(textToSave && textToSave.trim().length > 0));
        setStoredDraftMeta(meta);
        isDirtyRef.current = false;

        onAutoSave?.(textToSave, meta);

        // Notifikasi ke jendela / tab lain
        window.dispatchEvent(
          new CustomEvent('zlce-draft-saved', {
            detail: { storageKey, meta }
          })
        );

        return meta;
      } catch (err) {
        console.error('[useAutoDraftCache] Gagal menyimpan draft ke LocalStorage:', err);
        setIsSaving(false);
        return null;
      }
    },
    [storageKey, metaKey, docType, onAutoSave]
  );

  // Handler update konten dari pemanggil
  const setDraftContent = useCallback(
    (newContentOrFn: string | ((prev: string) => string)) => {
      setDraftContentState((prev) => {
        const nextContent =
          typeof newContentOrFn === 'function' ? newContentOrFn(prev) : newContentOrFn;

        if (nextContent === prev) return prev;

        contentRef.current = nextContent;
        isDirtyRef.current = true;
        setIsDraftSaved(false);
        setIsSaving(true);

        // Bersihkan timer debounce sebelumnya
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Mulai timer debounce 400ms kanonik
        timerRef.current = setTimeout(() => {
          persistDraft(nextContent, 'debounce-400ms');
          timerRef.current = null;
        }, debounceMs);

        return nextContent;
      });
    },
    [debounceMs, persistDraft]
  );

  // Simpan segera tanpa menunggu timer debounce
  const saveNow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    persistDraft(contentRef.current, 'manual-save');
  }, [persistDraft]);

  // Buang draft dari LocalStorage
  const discardDraft = useCallback(
    (fallbackContent?: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      try {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(metaKey);
      } catch {
        // Abaikan
      }

      const targetText = fallbackContent !== undefined ? fallbackContent : initialContentRef.current;
      contentRef.current = targetText;
      setDraftContentState(targetText);
      setIsRestoredFromDraft(false);
      setHasStoredDraft(false);
      setStoredDraftMeta(null);
      setIsDraftSaved(true);
      setIsSaving(false);
      isDirtyRef.current = false;
    },
    [storageKey, metaKey]
  );

  // Hapus seluruh penyimpanan draft
  const clearDraftStorage = useCallback(() => {
    discardDraft();
  }, [discardDraft]);

  // Paksa pemulihan draft dari storage jika ada
  const restoreStoredDraft = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        contentRef.current = saved;
        setDraftContentState(saved);
        setIsRestoredFromDraft(true);
        setIsDraftSaved(true);
        isDirtyRef.current = false;
        const meta = getInitialStoredMeta();
        setStoredDraftMeta(meta);
        if (meta) {
          setLastSavedAt(new Date(meta.savedAt));
        }
        onRestore?.(saved, meta);
        return saved;
      }
    } catch (e) {
      console.warn('[useAutoDraftCache] Gagal memulihkan draft:', e);
    }
    return null;
  }, [storageKey, onRestore]);

  // PROTEKSI SPESIFIK ANDROID LMK & LIFECYCLE:
  // Segera flush draft saat browser beralih ke background atau proses akan dimatikan
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const flushDirtyDraft = () => {
      if (isDirtyRef.current) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        persistDraft(contentRef.current, 'lifecycle-flush');
      }
    };

    const handleVisibilityChange = () => {
      // Saat PWA diminimalkan atau pengguna beralih ke Termux
      if (document.visibilityState === 'hidden') {
        flushDirtyDraft();
      }
    };

    const handlePageHide = () => {
      flushDirtyDraft();
    };

    const handleBeforeUnload = () => {
      flushDirtyDraft();
    };

    // Sinkronisasi lintas-tab (Storage Event)
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue !== null) {
        // Jika tab lain menyimpan draft baru
        if (e.newValue !== contentRef.current && !isDirtyRef.current) {
          contentRef.current = e.newValue;
          setDraftContentState(e.newValue);
          const meta = getInitialStoredMeta();
          setStoredDraftMeta(meta);
          setHasStoredDraft(true);
          setIsDraftSaved(true);
        }
      } else if (e.key === storageKey && e.newValue === null) {
        // Jika tab lain membuang draft
        setHasStoredDraft(false);
        setStoredDraftMeta(null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      // Cleanup: flush jika ada ketikan tersisa sebelum unmount
      flushDirtyDraft();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [persistDraft, storageKey]);

  return {
    draftContent,
    setDraftContent,
    isSaving,
    isDraftSaved,
    lastSavedAt,
    hasStoredDraft,
    storedDraftMeta,
    isRestoredFromDraft,
    saveNow,
    discardDraft,
    restoreStoredDraft,
    clearDraftStorage
  };
}
