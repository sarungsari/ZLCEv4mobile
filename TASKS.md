# BACKLOG TASK PENGEMBANGAN: ZLCE MOBILE WORKBENCH v4.0.0
## Rincian Task Atomik Implementasi Tablet Bersama (Samsung Galaxy Tab A7 Lite • 8 Anggota)

Definisi seluruh task implementasi Track 2. **Status task aktif tidak ditulis di sini**; status dan matriks dinamis dikelola di `SESSION_STATE.md`. Aturan, enum, dan protokol: `docs/mobile/blueprint/`.

---

## 1. PETA FASE IMPLEMENTASI

* **FASE 0: Baseline & Persiapan Lingkungan Uji** (`TASK-001` s/d `TASK-002`)
* **FASE 1: Fondasi PWA Tablet Android & Ergonomi Layar Sentuh** (`TASK-003` s/d `TASK-007`)
* **FASE 2: Markdown Workspace & Manajemen Multi-Proyek** (`TASK-008` s/d `TASK-012`)
* **FASE 3: Multi-AI & Context Pack Portabel [PRIORITAS UTAMA]** (`TASK-013` s/d `TASK-018`)
* **FASE 4: Multi-Akun & Tim Estafet 8 Anggota [PRIORITAS UTAMA]** (`TASK-019` s/d `TASK-024`)
* **FASE 5: Command Hub & Termux Dispatcher** (`TASK-025` s/d `TASK-030`)
* **FASE 6: Git Sync & Kolaborasi Cabang Tim** (`TASK-031` s/d `TASK-035`)
* **FASE 7: Uji Integrasi Penuh & Verifikasi Tablet Fisik SM-T225** (`TASK-036` s/d `TASK-040`)
* **FASE 8: Dokumentasi & Panduan Operasional Terpadu** (`TASK-041` s/d `TASK-043`)

---

## 2. RINCIAN TASK ATOMIK

### ============================================================================
### FASE 0: BASELINE & PERSIAPAN LINGKUNGAN UJI
### ============================================================================

### TASK-001: Verifikasi Baseline Uji & Test Runner
* **Fase:** FASE 0
* **Deskripsi:** Memverifikasi integritas repositori kerja, memastikan skrip `npm test`, linter, dan validator ZLCE berada dalam kondisi 0 error sebagai fondasi awal Track 2.
* **Dependensi:** -
* **File:** `package.json`, `tsconfig.json`
* **Docs Terkait:** `docs/mobile/blueprint/01_SYSTEM_OVERVIEW.md`, `10_TEST_STRATEGY.md`
* **Docs Impact:** `SESSION_STATE.md`
* **Acceptance Criteria:**
  1. `npm test` atau runner test eksisting lulus 100% tanpa error.
  2. `npm run lint` menghasilkan 0 error dan 0 fatal warning.
  3. `npm run build` sukses menghasilkan bundel produksi Vite.
* **Test Case:** `TC-P0-01`
* **Metode Verifikasi:** Jalankan `npm test`, `npm run lint`, dan `npm run build`; tempel output log.

---

### TASK-002: Penyiapan Struktur Direktori Komponen Mobile & Types
* **Fase:** FASE 0
* **Deskripsi:** Membuat direktori terisolasi `src/components/mobile/` dan berkas tipe data TypeScript (`src/types/mobile.ts`) untuk memfasilitasi penambahan modul tablet tanpa merusak kode desktop eksisting.
* **Dependensi:** `TASK-001`
* **File:** `src/types/mobile.ts`, `src/components/mobile/`
* **Docs Terkait:** `docs/mobile/blueprint/06_REPOSITORY_CHANGES.md`, `02_COMPONENT_ARCHITECTURE.md`
* **Docs Impact:** `src/types/index.ts`
* **Acceptance Criteria:**
  1. Direktori `src/components/mobile/` terbuat dan terisolasi.
  2. Berkas `src/types/mobile.ts` memuat tipe `TeamMember`, `ProjectMeta`, `ContextPack`, `CommandTemplate`, `TerminalPasteResult`.
  3. Tipe TypeScript tervalidasi bersih saat `npm run build`.
* **Test Case:** `TC-P0-02`
* **Metode Verifikasi:** Kompilasi proyek dengan TypeScript compiler (`npm run build`).

---

### ============================================================================
### FASE 1: FONDASI PWA TABLET ANDROID & ERGONOMI LAYAR SENTUH
### ============================================================================

### TASK-003: Web App Manifest & Aset Ikon PWA Standalone
* **Fase:** FASE 1
* **Deskripsi:** Membuat berkas Web App Manifest (`manifest.webmanifest`) dengan display mode `standalone`, orientasi `any`, theme color gelap, dan ikon PWA lengkap (192x192, 512x512, maskable) untuk mendukung instalasi ke layar utama Android.
* **Dependensi:** `TASK-002`
* **File:** `public/manifest.webmanifest`, `index.html`, `public/icons/*`
* **Docs Terkait:** `docs/mobile/blueprint/03_PWA_ARCHITECTURE.md`
* **Docs Impact:** `index.html`
* **Acceptance Criteria:**
  1. `manifest.webmanifest` valid sesuai spesifikasi W3C dengan `display: "standalone"` dan short name.
  2. Tag `<link rel="manifest">` dan meta theme-color terpasang di `index.html`.
  3. Ikon 192px dan 512px terhubung dengan benar.
* **Test Case:** `TC-P1-01`
* **Metode Verifikasi:** Validasi manifest via browser audit dan inspeksi DOM di Chrome DevTools.

---

### TASK-004: Service Worker & Strategi Offline Shell Caching
* **Fase:** FASE 1
* **Deskripsi:** Mengimplementasikan Service Worker (`public/sw.js`) dan modul pendaftaran (`src/sw-register.ts`) dengan strategi caching: Cache-First untuk aset statis (HTML/JS/CSS/ikon) dan Network-First/Fallback untuk konten dinamis.
* **Dependensi:** `TASK-003`
* **File:** `public/sw.js`, `src/sw-register.ts`, `src/main.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/03_PWA_ARCHITECTURE.md`
* **Docs Impact:** `src/main.tsx`
* **Acceptance Criteria:**
  1. Service Worker terdaftar sukses saat aplikasi dimuat.
  2. Aplikasi dapat dibuka kembali dan beroperasi secara utuh saat jaringan dimatikan (Offline/Mode Pesawat).
  3. Pembaruan cache otomatis tertrigger saat ada versi aplikasi baru.
* **Test Case:** `TC-P1-02`
* **Metode Verifikasi:** Nonaktifkan koneksi jaringan di DevTools (Offline mode) lalu refresh halaman.

---

### TASK-005: Adaptasi Ergonomi Tablet 8.7" & Viewport Awareness
* **Fase:** FASE 1
* **Deskripsi:** Mengoptimalkan tata letak CSS Tailwind untuk layar 8.7 inci (1340x800): menerapkan target sentuh minimal 44x44 piksel pada semua tombol aksi, spasi kontrol ramah jempol, dan penanganan keyboard virtual melalui `visualViewport` API agar input tidak tertutup.
* **Dependensi:** `TASK-004`
* **File:** `src/index.css`, `src/components/mobile/MobileLayout.tsx`, `src/App.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/02_COMPONENT_ARCHITECTURE.md`, `03_PWA_ARCHITECTURE.md`
* **Docs Impact:** `src/App.tsx`
* **Acceptance Criteria:**
  1. Seluruh tombol interaktif utama memiliki tinggi minimal 44px (`min-h-[44px]`).
  2. Panel input dan tombol aksi utama tetap terlihat saat keyboard virtual Android aktif (`window.visualViewport`).
  3. Antarmuka responsif tanpa horizontal scrollbar yang tidak diinginkan pada resolusi 1340x800 dan orientasi potret/lanskap.
* **Test Case:** `TC-P1-03`
* **Metode Verifikasi:** Uji visual pada preset resolusi 1340x800 dan simulasi resize viewport keyboard virtual.

---

### TASK-006: Komponen Active Member Selector di Header
* **Fase:** FASE 1
* **Deskripsi:** Membangun komponen `ActiveMemberSelector.tsx` di bilah atas PWA yang memungkinkan pemilihan instan salah satu dari 8 anggota tim, menampilkan avatar/inisial, dan menyimpan anggota aktif di LocalStorage.
* **Dependensi:** `TASK-005`
* **File:** `src/components/mobile/ActiveMemberSelector.tsx`, `src/components/Header.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** `src/components/Header.tsx`
* **Acceptance Criteria:**
  1. Komponen dropdown/modal cepat menampilkan 8 anggota tim (Budi, Siti, Agus, Dewi, Eko, Rina, Fajar, Hani).
  2. Memilih anggota mengubah state global dan tersimpan di `localStorage.getItem('zlce_active_member')`.
  3. Header menampilkan badge visual anggota yang sedang memegang tablet.
* **Test Case:** `TC-P1-04`
* **Metode Verifikasi:** Pilih anggota di UI, refresh halaman, verifikasi state anggota aktif bertahan.

---

### TASK-007: Komponen Project Switcher & Registry Ringan
* **Fase:** FASE 1
* **Deskripsi:** Membangun komponen `ProjectSwitcher.tsx` untuk mengelola daftar proyek yang dikerjakan pada tablet, memungkinkan penambahan proyek baru, pergantian proyek aktif, dan pencatatan path Termux masing-masing.
* **Dependensi:** `TASK-006`
* **File:** `src/components/mobile/ProjectSwitcher.tsx`, `src/hooks/useProjectRegistry.ts`
* **Docs Terkait:** `docs/mobile/blueprint/05_STORAGE_AND_SYNC.md`
* **Docs Impact:** `src/components/Header.tsx`
* **Acceptance Criteria:**
  1. Registry multi-proyek tersimpan di `localStorage.getItem('zlce_projects_registry')`.
  2. Pengguna dapat menambah, mengedit, dan berpindah antar proyek secara instan.
  3. Berganti proyek memuat context dan draft yang sesuai untuk proyek bersangkutan.
* **Test Case:** `TC-P1-05`
* **Metode Verifikasi:** Tambahkan 2 proyek uji ("Proyek A", "Proyek B"), lakukan pergantian dan verifikasi isolasi state.

---

### ============================================================================
### FASE 2: MARKDOWN WORKSPACE & MANAJEMEN MULTI-PROYEK
### ============================================================================

### TASK-008: Workspace Reader & Parser Dokumen Kontrol ZLCE
* **Fase:** FASE 2
* **Deskripsi:** Membangun parser berkas Markdown kontrol ZLCE (`BLUEPRINT.md`, `TASKS.md`, `SESSION_STATE.md`) untuk mengekstrak metadata, daftar task, status aktif, dan entri WAL ke dalam objek terstruktur di memori PWA.
* **Dependensi:** `TASK-007`
* **File:** `src/utils/markdownParser.ts`, `src/components/mobile/WorkspaceReader.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/02_COMPONENT_ARCHITECTURE.md`, `templates/`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Parser mampu membedakan format dokumen `SESSION_STATE.md`, `TASKS.md`, dan `BLUEPRINT.md`.
  2. Matriks task diparsing menjadi array objek dengan ID, Nama, Dependensi, Status, dan Disetujui.
  3. Tidak memicu crash bila terdapat baris Markdown tak terduga.
* **Test Case:** `TC-P2-01`
* **Metode Verifikasi:** Uji unit parsing terhadap berkas contoh di `templates/` dan `examples/`.

---

### TASK-009: Workspace Editor & Integrasi File Picker Impor
* **Fase:** FASE 2
* **Deskripsi:** Membangun antarmuka editor Markdown yang responsif dengan tombol File Picker eksplisit (`input type="file"`) untuk membaca berkas Markdown dari penyimpanan tablet ke editor PWA.
* **Dependensi:** `TASK-008`
* **File:** `src/components/mobile/WorkspaceEditor.tsx`, `src/hooks/useFileImport.ts`
* **Docs Terkait:** `docs/mobile/blueprint/05_STORAGE_AND_SYNC.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Tombol "Buka Berkas .md" membuka pemilih file bawaan Android tanpa error.
  2. Isi berkas Markdown terimpor langsung ke state editor PWA.
  3. Memberikan feedback visual ukuran berkas dan waktu impor.
* **Test Case:** `TC-P2-02`
* **Metode Verifikasi:** Pilih berkas `.md` lokal via file input dan pastikan teks muncul di editor.

---

### TASK-010: Markdown Exporter & Unduh Berkas Blob
* **Fase:** FASE 2
* **Deskripsi:** Mengimplementasikan fungsi ekspor instan Markdown ke berkas fisik yang dapat diunduh langsung ke folder `Download/` tablet Android via Blob URL dan tombol salin 1-ketukan ke clipboard.
* **Dependensi:** `TASK-009`
* **File:** `src/utils/fileExport.ts`, `src/components/mobile/WorkspaceExportBar.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/05_STORAGE_AND_SYNC.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Tombol "Unduh .md" mengunduh berkas dengan penamaan yang benar (misal: `SESSION_STATE.md`).
  2. Tombol "Salin Seluruh Markdown" menyalin teks lengkap ke clipboard Android dengan feedback visual.
  3. Karakter baris baru LF dipertahankan secara utuh tanpa rusak menjadi CRLF.
* **Test Case:** `TC-P2-03`
* **Metode Verifikasi:** Unduh berkas uji, periksa kelengkapan konten dan integritas karakter baris baru.

---

### TASK-011: Penegakan Integritas SESSION_STATE sebagai Single Source of Truth
* **Fase:** FASE 2
* **Deskripsi:** Memastikan format berkas `SESSION_STATE.md` yang dihasilkan dan disunting di PWA 100% mematuhi aturan kanonik ZLCE Core (nomor bagian 0–7, header, format tabel matriks task, dan format WAL).
* **Dependensi:** `TASK-010`
* **File:** `src/utils/sessionStateValidator.ts`, `src/components/SessionStateTab.tsx`
* **Docs Terkait:** `templates/SESSION_STATE.template.md`, `docs/mobile/blueprint/01_SYSTEM_OVERVIEW.md`
* **Docs Impact:** `src/components/SessionStateTab.tsx`
* **Acceptance Criteria:**
  1. Output `SESSION_STATE.md` lulus validasi skrip `scripts/zlce-check.py` tanpa error format.
  2. Kolom matriks task memuat header `| ID Task | Nama | Dependensi | Status | Bukti Verifikasi | Disetujui |`.
  3. Bagian 3 (WAL) mematuhi format 7 butir kanonik.
* **Test Case:** `TC-P2-04`
* **Metode Verifikasi:** Validasi teks SESSION_STATE yang dihasilkan PWA menggunakan `scripts/zlce-check.py`.

---

### TASK-012: Cache Draft LocalStorage dengan Debounce 400ms & Auto-Sync
* **Fase:** FASE 2
* **Deskripsi:** Membangun mekanisme persistensi draft lokal di LocalStorage dengan debounce 400ms untuk melindungi perubahan pengguna saat PWA ditutup atau dibunuh oleh Android LMK saat beralih aplikasi.
* **Dependensi:** `TASK-011`
* **File:** `src/hooks/useAutoDraftCache.ts`, `src/components/mobile/WorkspaceEditor.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/09_FAILURE_AND_RECOVERY.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Setiap ketikan pengguna disimpan otomatis ke LocalStorage setelah jeda 400ms.
  2. Saat aplikasi dibuka kembali setelah di-refresh atau ditutup paksa, draft terakhir dipulihkan secara transparan.
  3. Menampilkan indikator visual ringkas "Draft tersimpan" di sudut layar.
* **Test Case:** `TC-P2-05`
* **Metode Verifikasi:** Ketik perubahan teks, tutup tab / refresh paksa browser, buka kembali, pastikan teks tidak hilang.

---

### ============================================================================
### FASE 3: MULTI-AI & CONTEXT PACK PORTABEL [PRIORITAS UTAMA]
### ============================================================================

### TASK-013: Portable Context Pack Generator (Schema-before-Data)
* **Fase:** FASE 3
* **Deskripsi:** Membangun generator paket konteks mandiri yang merangkum ringkasan proyek, blueprint, task aktif, status sesi terkini, dan keputusan teknis dalam format Markdown terstruktur yang siap dikirimkan ke model AI mana pun.
* **Dependensi:** `TASK-012`
* **File:** `src/utils/contextPackGenerator.ts`, `src/components/mobile/ContextPackTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/PromptEngineTab.tsx`
* **Acceptance Criteria:**
  1. Context Pack memuat blok metadata wajib (Proyek, Task ID, Anggota Aktif, AI Target, Timestamp).
  2. Menyertakan seluruh informasi yang dibutuhkan AI tanpa mengharuskan riwayat chat sebelumnya (Invarian I1 & I2).
  3. Struktur output konsisten dan deterministik.
* **Test Case:** `TC-P3-01`
* **Metode Verifikasi:** Bangkitkan Context Pack untuk task aktif dan verifikasi kelengkapan komponen konteks.

---

### TASK-014: Context Budget Manager & Adapter Kuota Token per Model AI
* **Fase:** FASE 3
* **Deskripsi:** Membangun modul pengatur anggaran token yang menyesuaikan kedalaman dan panjang Context Pack berdasarkan profil model AI target (misal: mode komprehensif untuk Gemini 1M token vs mode ringkas terkonsolidasi untuk Claude/ChatGPT 8K–30K token).
* **Dependensi:** `TASK-013`
* **File:** `src/utils/tokenBudgetAdapter.ts`, `src/components/mobile/TokenBudgetSelector.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/TokenUsageGauge.tsx`
* **Acceptance Criteria:**
  1. Tersedia pilihan profil AI: Gemini (Large Context), Claude (Mid Context), ChatGPT (Compact Context).
  2. Estimasi token ditampilkan secara visual sebelum menyalin Context Pack.
  3. Context Pack otomatis memotong lampiran historis berlebih saat memilih profil kompak agar tidak melampaui kuota.
* **Test Case:** `TC-P3-02`
* **Metode Verifikasi:** Beralih antar profil AI dan periksa variasi panjang teks hasil Context Pack.

---

### TASK-015: Prompt Generator Multi-Model Terstruktur
* **Fase:** FASE 3
* **Deskripsi:** Mengintegrasikan Context Pack dengan instruksi peran AI yang presisi (Landing Prompt, Task Execution Prompt, Review Prompt, Handover Prompt) yang dioptimalkan untuk respons deterministik bebas halusinasi.
* **Dependensi:** `TASK-014`
* **File:** `src/utils/promptGenerator.ts`, `src/components/mobile/PromptStudio.tsx`
* **Docs Terkait:** `LANDING_PROMPT.md`, `HANDOVER_PROMPT.md`, `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/PromptEngineTab.tsx`
* **Acceptance Criteria:**
  1. Generator menghasilkan prompt siap pakai yang menggabungkan Context Pack dan instruksi tugas.
  2. Format prompt menegaskan aturan "Schema-before-Data" dan pelarangan kode placeholder.
  3. Tombol "Salin Prompt Lengkap" menyalin seluruh teks dengan 1 ketukan.
* **Test Case:** `TC-P3-03`
* **Metode Verifikasi:** Salin prompt ke clipboard dan periksa kecocokan teks yang ditempelkan.

---

### TASK-016: Result Capture Module dengan Injeksi Provenance Otomatis
* **Fase:** FASE 3
* **Deskripsi:** Membangun antarmuka untuk menempelkan hasil jawaban dari Browser AI, mengekstrak blok kode/solusi, dan secara otomatis menyematkan metadata *provenance* (Model AI, Alias Akun, Nama Anggota, Timestamp, Task ID).
* **Dependensi:** `TASK-015`
* **File:** `src/components/mobile/ResultCaptureTab.tsx`, `src/utils/provenanceInjector.ts`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** `src/components/RecoveryTab.tsx`
* **Acceptance Criteria:**
  1. Antarmuka Result Capture menyediakan area tempel hasil AI berukuran besar.
  2. Provenance terinjeksi otomatis dalam format tag komentar Markdown atau baris metadata.
  3. Hasil dapat langsung dialirkan untuk memperbarui draft `SESSION_STATE.md` atau WAL.
* **Test Case:** `TC-P3-04`
* **Metode Verifikasi:** Tempel teks solusi AI, verifikasi tag metadata provenance terbentuk dengan lengkap.

---

### TASK-017: Handover Manager Lintas AI & Deteksi Konflik Keputusan
* **Fase:** FASE 3
* **Deskripsi:** Membangun modul serah terima (*Handover Manager*) saat berpindah dari satu AI ke AI lain (misal dari Claude yang kehabisan limit ke Gemini), termasuk deteksi inkonsistensi keputusan antar-model AI dan pencatatan eskalasi.
* **Dependensi:** `TASK-016`
* **File:** `src/components/mobile/AiHandoverWizard.tsx`, `src/utils/conflictDetector.ts`
* **Docs Terkait:** `HANDOVER_PROMPT.md`, `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Wizard memandu pembuatan handover lintas AI dalam 3 langkah sederhana.
  2. Bila terdeteksi perbedaan keputusan antar AI, sistem menandainya sebagai `CONFLICT_DECISION` dan meminta konfirmasi manusia.
  3. Catatan serah terima terangkum di Bagian 6 `SESSION_STATE.md`.
* **Test Case:** `TC-P3-05`
* **Metode Verifikasi:** Jalankan wizard handover AI dan verifikasi teks handover prompt yang dihasilkan.

---

### TASK-018: Test Suite Uji Cold-Start Lintas AI (Claude -> Gemini)
* **Fase:** FASE 3
* **Deskripsi:** Mengimplementasikan test suite otomatis dan skenario uji verifikasi bahwa sesi pekerjaan dapat dilanjutkan oleh model AI baru secara murni hanya dari berkas repositori dan Context Pack tanpa riwayat chat (Invarian I2).
* **Dependensi:** `TASK-017`
* **File:** `src/tests/coldStartAi.test.ts`, `src/components/TestHarnessTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/10_TEST_STRATEGY.md`, `14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/TestHarnessTab.tsx`
* **Acceptance Criteria:**
  1. Test harness memverifikasi bahwa Context Pack memuat 100% parameter pemulihan state.
  2. Skenario uji pergantian Claude -> Gemini menghasilkan instruksi kelanjutan yang valid dan identik.
  3. Test suite lulus dengan status PASS pada runner uji.
* **Test Case:** `TC-P3-06`
* **Metode Verifikasi:** Eksekusi test suite via `npm test` atau tombol uji di Test Harness tab PWA.

---

### ============================================================================
### FASE 4: MULTI-AKUN & TIM ESTAFET 8 ANGGOTA [PRIORITAS UTAMA]
### ============================================================================

### TASK-019: Team Member Registry (8 Profil Alias Non-Kredensial)
* **Fase:** FASE 4
* **Deskripsi:** Membangun registry profil 8 anggota tim estafet (Budi, Siti, Agus, Dewi, Eko, Rina, Fajar, Hani) dengan atribut nama alias, email publik non-rahasia, peran, dan preferensi AI — dengan penegakan keras *Zero-Secret Policy* (nol token/password).
* **Dependensi:** `TASK-018`
* **File:** `src/data/teamMembers.ts`, `src/components/mobile/TeamRegistryModal.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** `src/types/mobile.ts`
* **Acceptance Criteria:**
  1. Terdaftar 8 profil anggota dengan data valid tanpa informasi rahasia.
  2. Pengguna dapat mengubah email commit publik masing-masing anggota.
  3. Registry tersimpan di LocalStorage dengan fallback data default yang aman.
* **Test Case:** `TC-P4-01`
* **Metode Verifikasi:** Buka modal registry tim di PWA, ubah profil, dan pastikan data tersimpan.

---

### TASK-020: Mekanisme Klaim Task & Penegakan Aturan 1 Task IN_PROGRESS
* **Fase:** FASE 4
* **Deskripsi:** Mengimplementasikan aturan kolaborasi tablet bersama: hanya satu task yang diizinkan berstatus `IN_PROGRESS` pada satu waktu di tablet, dengan pencatatan anggota yang mengklaim task dan waktu mulai klaim.
* **Dependensi:** `TASK-019`
* **File:** `src/utils/taskClaimManager.ts`, `src/components/mobile/TaskClaimBanner.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/SessionStateTab.tsx`
* **Acceptance Criteria:**
  1. Sistem menolak transisi status menjadi `IN_PROGRESS` bila sudah ada task lain yang berstatus `IN_PROGRESS`.
  2. Task yang sedang dikerjakan menampilkan badge nama anggota pemegang klaim.
  3. Tombol rilis/selesai klaim tersedia secara jelas.
* **Test Case:** `TC-P4-02`
* **Metode Verifikasi:** Coba klaim TASK-002 saat TASK-001 masih IN_PROGRESS; verifikasi muncul peringatan penolakan.

---

### TASK-021: Pencatatan Persetujuan Gerbang Kualitas Bersama Provenance Penyetuju
* **Fase:** FASE 4
* **Deskripsi:** Mengimplementasikan hak persetujuan Gerbang Kualitas bagi seluruh 8 anggota (ADR-07) dengan kewajiban mencatatkan nama anggota penyetuju pada kolom `Disetujui` di matriks task (`Disetujui: ya (oleh: [Nama])`) dan di log audit.
* **Dependensi:** `TASK-020`
* **File:** `src/utils/gateApprovalManager.ts`, `src/components/mobile/GateApprovalModal.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/12_ARCHITECTURE_DECISIONS.md`, `14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/utils/zlceValidator.ts`
* **Acceptance Criteria:**
  1. Modal persetujuan gerbang meminta konfirmasi anggota aktif yang sedang memegang tablet.
  2. Kolom `Disetujui` di `SESSION_STATE.md` diperbarui dengan format `ya (oleh: Budi)`.
  3. Log audit Bagian 7 otomatis bertambah satu baris pencatatan persetujuan.
  4. Validator `zlceValidator.ts` memvalidasi keabsahan format nama penyetuju.
* **Test Case:** `TC-P4-03`
* **Metode Verifikasi:** Berikan persetujuan task di PWA, verifikasi teks `SESSION_STATE.md` dan validasi linter.

---

### TASK-022: Device Handover Checklist Wizard & Prosedur Serah Terima Tablet
* **Fase:** FASE 4
* **Deskripsi:** Membangun wizard interaktif 4-langkah serah terima tablet sebelum tablet dioper ke anggota berikutnya: (1) Verifikasi task commit/push, (2) Update catatan handover, (3) Salin perintah `zlce clean-auth` untuk menghapus token di RAM, (4) Pengalihan profil anggota aktif.
* **Dependensi:** `TASK-021`
* **File:** `src/components/mobile/DeviceHandoverModal.tsx`, `src/utils/handoverChecklist.ts`
* **Docs Terkait:** `docs/mobile/blueprint/07_WORKFLOW_DESIGN.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** `src/components/Header.tsx`
* **Acceptance Criteria:**
  1. Wizard serah terima menampilkan 4 checklist yang wajib dicentang.
  2. Menyediakan tombol 1-ketukan untuk menyalin perintah pembersihan kredensial Termux (`git credential-cache exit`).
  3. Mengalihkan profil aktif ke anggota berikutnya setelah wizard selesai.
* **Test Case:** `TC-P4-04`
* **Metode Verifikasi:** Jalankan alur wizard serah terima di UI dan pastikan semua langkah checklist tereksekusi.

---

### TASK-023: Session History Timeline & Audit Log Terpadu
* **Fase:** FASE 4
* **Deskripsi:** Membangun penampil visual riwayat snapshot sesi (hingga 35 snapshot) dan log audit kronologis yang mencatat setiap peristiwa task, commit, dan pergantian anggota tim di tablet.
* **Dependensi:** `TASK-022`
* **File:** `src/components/mobile/SessionTimelineTab.tsx`, `src/hooks/useSessionHistory.ts`
* **Docs Terkait:** `docs/mobile/blueprint/14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Timeline menampilkan daftar riwayat snapshot dengan cap waktu dan nama anggota.
  2. Pengguna dapat melihat diff atau memulihkan draft dari snapshot sebelumnya.
  3. Ukuran data riwayat di LocalStorage dibatasi secara aman agar tidak melampaui kuota browser.
* **Test Case:** `TC-P4-05`
* **Metode Verifikasi:** Lakukan beberapa modifikasi state, buka tab riwayat, dan verifikasi entri snapshot tercatat.

---

### TASK-024: Test Suite Uji Cold-Start Lintas Anggota (Anggota A -> Anggota B)
* **Fase:** FASE 4
* **Deskripsi:** Membangun skenario uji otomatis untuk memverifikasi bahwa Anggota B dapat melanjutkan pengerjaan task yang ditinggalkan oleh Anggota A secara mulus hanya dengan membaca berkas repositori dan catatan serah terima (Invarian I2 & I3).
* **Dependensi:** `TASK-023`
* **File:** `src/tests/coldStartMember.test.ts`, `src/components/TestHarnessTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/10_TEST_STRATEGY.md`, `14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** `src/components/TestHarnessTab.tsx`
* **Acceptance Criteria:**
  1. Uji mensimulasikan pergantian giliran dari Budi ke Siti.
  2. Memverifikasi status task, WAL, dan identitas commit otomatis teralihkan ke Siti.
  3. Seluruh invarian I1–I5 terkonfirmasi terpenuhi tanpa anomali data.
* **Test Case:** `TC-P4-06`
* **Metode Verifikasi:** Jalankan test runner untuk skenario cold-start anggota tim.

---

### ============================================================================
### FASE 5: COMMAND HUB & TERMUX DISPATCHER
### ============================================================================

### TASK-025: Katalog Template Perintah Berversi (Git & CLI ZLCE)
* **Fase:** FASE 5
* **Deskripsi:** Menyusun katalog perintah berversi di repositori yang memuat template perintah operasional: pemeriksaan validator (`zlce-check`), snapshot (`zlce-snapshot`), git status, commit atomik, push, pull aman, dan clean-auth, lengkap dengan label risiko.
* **Dependensi:** `TASK-024`
* **File:** `src/data/commandTemplates.ts`, `src/components/mobile/CommandHubTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/13_COMMAND_TEMPLATES.md`, `04_TERMUX_INTEGRATION.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Seluruh 8 template kanonik dari Blueprint 13 terdaftar dengan skema berversi.
  2. Setiap perintah memiliki badge label risiko yang jelas (🟢 Safe, 🟡 Mutating, 🔴 High-Risk).
  3. Tidak ada perintah destruktif (`reset --hard`, `push --force`) di katalog bawaan.
* **Test Case:** `TC-P5-01`
* **Metode Verifikasi:** Periksa daftar template perintah di tab Command Hub PWA.

---

### TASK-026: Command Parameter Binder & Strict Shell Sanitizer (Anti-Injection)
* **Fase:** FASE 5
* **Deskripsi:** Mengimplementasikan mesin pengikat parameter otomatis (Task ID, Nama Cabang, Nama Anggota, Pesan Commit) yang dilengkapi fungsi sanitasi dan escaping shell bash ketat guna mencegah celah *command injection*.
* **Dependensi:** `TASK-025`
* **File:** `src/utils/commandSanitizer.ts`, `src/utils/commandBinder.ts`
* **Docs Terkait:** `docs/mobile/blueprint/04_TERMUX_INTEGRATION.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Seluruh parameter dinamis otomatis terisi dari context proyek dan anggota aktif.
  2. Karakter berbahaya (`"`, `'`, `;`, `&`, `|`, `$`, `` ` ``, `\n`) di-escape secara aman dengan penandaan kutip POSIX standar.
  3. Uji injeksi shell gagal mengeksekusi perintah susupan.
* **Test Case:** `TC-P5-02`
* **Metode Verifikasi:** Uji masukan pesan commit dengan karakter injeksi `; rm -rf /` dan verifikasi string hasil escaping aman.

---

### TASK-027: One-Tap Copy Button dengan Status Feedback & Fallback Seleksi
* **Fase:** FASE 5
* **Deskripsi:** Membangun tombol salin satu ketukan (*One-Tap Copy*) menggunakan Clipboard API peramban, dilengkapi animasi feedback visual "Tersalin!", dan fallback seleksi teks manual jika izin clipboard ditolak.
* **Dependensi:** `TASK-026`
* **File:** `src/components/mobile/OneTapCopyButton.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/04_TERMUX_INTEGRATION.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Tombol salin memiliki target sentuh minimal 44x44px ramah jari tablet.
  2. Menekan tombol langsung menyalin teks perintah ke clipboard Android.
  3. Menampilkan status konfirmasi visual selama 2 detik setelah berhasil menyalin.
* **Test Case:** `TC-P5-03`
* **Metode Verifikasi:** Ketuk tombol di UI, tempel ke aplikasi catatan atau terminal, verifikasi isi teks identik.

---

### TASK-028: CLI Dispatcher `zlce` di Termux (`scripts/zlce/zlce`)
* **Fase:** FASE 5
* **Deskripsi:** Membuat skrip shell POSIX ringan `scripts/zlce/zlce` (dan panduan symlink ke `~/bin/zlce`) yang bertindak sebagai dispatcher lokal di Termux dengan allowlist subperintah (`check`, `snapshot`, `collect`, `pull`, `push`, `clean-auth`).
* **Dependensi:** `TASK-027`
* **File:** `scripts/zlce/zlce`, `scripts/zlce/README.md`
* **Docs Terkait:** `docs/mobile/blueprint/04_TERMUX_INTEGRATION.md`, `13_COMMAND_TEMPLATES.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Skrip `zlce` mengeksekusi subperintah yang terdaftar di allowlist dengan benar.
  2. Menolak subperintah yang tidak dikenal dengan pesan error edukatif.
  3. Memiliki bit eksekusi `chmod +x` dan akhir baris Unix LF murni.
* **Test Case:** `TC-P5-04`
* **Metode Verifikasi:** Jalankan `./scripts/zlce/zlce check --help` dan `./scripts/zlce/zlce unknown` di lingkungan shell.

---

### TASK-029: Paste-Back Parser untuk Keluaran Terminal & Update Status Visual
* **Fase:** FASE 5
* **Deskripsi:** Membangun komponen modal `PasteBackModal.tsx` yang menerima teks hasil eksekusi terminal (keluaran `zlce-check.py` atau `git status`), memparsing hasil status, dan otomatis memperbarui badge status visual di PWA.
* **Dependensi:** `TASK-028`
* **File:** `src/components/mobile/PasteBackModal.tsx`, `src/utils/terminalParser.ts`
* **Docs Terkait:** `docs/mobile/blueprint/04_TERMUX_INTEGRATION.md`
* **Docs Impact:** `src/components/mobile/CommandHubTab.tsx`
* **Acceptance Criteria:**
  1. Parser mengenali output `RESULT: OK` (0 error) dan menandai verifikasi sukses.
  2. Parser mendeteksi pesan error linter dan menampilkan rincian baris penyebab kegagalan.
  3. Badge verifikasi pada task aktif otomatis terbarui setelah tempel hasil.
* **Test Case:** `TC-P5-05`
* **Metode Verifikasi:** Tempel output log terminal uji ke dalam kotak paste-back, verifikasi perubahan status badge.

---

### TASK-030: Integrasi Protokol Recovery Kasus A–D ke Template Command Hub
* **Fase:** FASE 5
* **Deskripsi:** Mengintegrasikan prosedur pemulihan darurat kanonik ZLCE (Kasus A: Sesi Terputus, Kasus B: Inkonsistensi Dokumen, Kasus C: File Rusak/Hilang, Kasus D: Konflik Git) ke dalam tombol pintas template pemulihan di Command Hub PWA.
* **Dependensi:** `TASK-029`
* **File:** `src/components/mobile/RecoveryCommandSection.tsx`, `src/components/RecoveryTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/09_FAILURE_AND_RECOVERY.md`
* **Docs Impact:** `src/components/RecoveryTab.tsx`
* **Acceptance Criteria:**
  1. Tersedia 4 panel pemulihan sesuai Kasus A–D dengan instruksi langkah-demi-langkah.
  2. Perintah pemulihan snapshot lokal dan pemeriksaan integritas dapat disalin dengan 1 ketukan.
  3. Tidak menyertakan perintah berbahaya yang menghapus data tanpa konfirmasi.
* **Test Case:** `TC-P5-06`
* **Metode Verifikasi:** Buka tab Recovery, verifikasi ketersediaan template pemulihan Kasus A–D.

---

### ============================================================================
### FASE 6: GIT SYNC & KOLABORASI CABANG TIM
### ============================================================================

### TASK-031: Template Git Branch per Task (`task/TASK-xxx`) & Proteksi `main`
* **Fase:** FASE 6
* **Deskripsi:** Membangun generator perintah Git branch per task yang otomatis membuat cabang kerja terisolasi `task/TASK-xxx` saat task dimulai, mencegah commit langsung ke cabang `main` yang diproteksi.
* **Dependensi:** `TASK-030`
* **File:** `src/utils/gitBranchManager.ts`, `src/components/mobile/GitSyncTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/07_WORKFLOW_DESIGN.md`, `12_ARCHITECTURE_DECISIONS.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Template checkout cabang otomatis menghasilkan: `git checkout -b task/TASK-xxx`.
  2. PWA memperingatkan pengguna bila bekerja langsung pada branch `main`.
  3. Menampilkan status nama cabang aktif yang sinkron dengan Task ID.
* **Test Case:** `TC-P6-01`
* **Metode Verifikasi:** Periksa kesesuaian perintah checkout yang dihasilkan saat memilih task aktif.

---

### TASK-032: Injeksi Flag Identitas Commit Otomatis (`-c user.name=...`)
* **Fase:** FASE 6
* **Deskripsi:** Mengimplementasikan injeksi flag identitas dinamis pada seluruh template perintah commit Git (`git -c user.name="Budi" -c user.email="..." commit -m "..."`) sesuai anggota aktif yang dipilih, tanpa merusak konfigurasi Git global (ADR-05).
* **Dependensi:** `TASK-031`
* **File:** `src/utils/gitCommitFormatter.ts`, `src/components/mobile/GitSyncTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/12_ARCHITECTURE_DECISIONS.md`, `08_SECURITY_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Template commit memuat flag `-c user.name` dan `-c user.email` anggota aktif.
  2. Pesan commit diawali dengan Task ID atomik (misal: `TASK-001: feat(pwa) ...`).
  3. Ganti anggota aktif di PWA seketika mengubah atribusi identitas pada template commit.
* **Test Case:** `TC-P6-02`
* **Metode Verifikasi:** Ganti anggota dari Budi ke Siti, pastikan flag identitas commit berubah seketika.

---

### TASK-033: Safe Pull Template (`--ff-only`) & Sinkronisasi Bertahap
* **Fase:** FASE 6
* **Deskripsi:** Membangun template penarikan pembaruan aman dari remote GitHub menggunakan flag `--ff-only` untuk mencegah merge commit tak disengaja di tablet, serta panduan rebase bila cabang bercabang.
* **Dependensi:** `TASK-032`
* **File:** `src/components/mobile/GitPullSection.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/05_STORAGE_AND_SYNC.md`, `07_WORKFLOW_DESIGN.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Template pull default menggunakan: `git pull --ff-only origin <branch>`.
  2. Menampilkan petunjuk langkah yang harus dilakukan bila fast-forward gagal.
  3. Memberikan panduan fetch status sebelum memulai task baru.
* **Test Case:** `TC-P6-03`
* **Metode Verifikasi:** Verifikasi sintaks template safe pull yang dihasilkan di tab Git Sync.

---

### TASK-034: Git Credential Cache Manager (`cache --timeout=900`) & Script `clean-auth`
* **Fase:** FASE 6
* **Deskripsi:** Membangun modul pengaturan cache kredensial Git di memori RAM Termux (timeout 15 menit / 900 detik) dan skrip `zlce clean-auth` untuk menghapus token seketika saat pergantian pemegang tablet (ADR-04).
* **Dependensi:** `TASK-033`
* **File:** `scripts/zlce/clean-auth.sh`, `src/components/mobile/SecurityAuthTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/08_SECURITY_MODEL.md`, `12_ARCHITECTURE_DECISIONS.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Template konfigurasi cache menghasilkan: `git config --global credential.helper "cache --timeout=900"`.
  2. Skrip `clean-auth.sh` mematikan daemon credential cache: `git credential-cache exit`.
  3. Nol token atau password tersimpan di disk atau repositori.
* **Test Case:** `TC-P6-04`
* **Metode Verifikasi:** Jalankan skrip `clean-auth.sh` di Termux dan periksa pembersihan socket cache git.

---

### TASK-035: Deteksi & Panduan Resolusi Konflik Cabang Antar-Anggota
* **Fase:** FASE 6
* **Deskripsi:** Membangun antarmuka panduan resolusi konflik cabang Git: memberikan langkah terstruktur bila terjadi konflik saat merge/rebase antar-anggota tanpa menggunakan opsi destruktif (`--force`).
* **Dependensi:** `TASK-034`
* **File:** `src/components/mobile/ConflictResolutionWizard.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/09_FAILURE_AND_RECOVERY.md`, `07_WORKFLOW_DESIGN.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Wizard mendeteksi laporan konflik Git dari keluaran terminal paste-back.
  2. Menampilkan panduan membuka berkas berkonflik di editor terminal `micro`.
  3. Memandu verifikasi ulang via `zlce-check` sebelum menandai konflik terselesaikan.
* **Test Case:** `TC-P6-05`
* **Metode Verifikasi:** Tempelkan contoh output git conflict dan pastikan wizard panduan aktif.

---

### ============================================================================
### FASE 7: UJI INTEGRASI PENUH & VERIFIKASI TABLET FISIK SM-T225
### ============================================================================

### TASK-036: End-to-End Test Suite 14 Skenario ZLCE di Tablet
* **Fase:** FASE 7
* **Deskripsi:** Mengeksekusi dan memvalidasi seluruh 14 skenario operasional ZLCE (alur lengkap mulai dari pembuatan proyek, task breakdown, eksekusi AI, validasi WAL, hingga commit/push) di lingkungan tablet.
* **Dependensi:** `TASK-035`
* **File:** `src/tests/e2eScenarios.test.ts`, `src/components/TestHarnessTab.tsx`
* **Docs Terkait:** `docs/mobile/blueprint/10_TEST_STRATEGY.md`
* **Docs Impact:** `src/components/TestHarnessTab.tsx`
* **Acceptance Criteria:**
  1. Seluruh 14 skenario uji tereksekusi dengan status PASS 100%.
  2. Tidak ada kebocoran state antar skenario uji.
  3. Hasil uji terekam pada log pengujian terverifikasi.
* **Test Case:** `TC-P7-01`
* **Metode Verifikasi:** Jalankan test harness di browser dan periksa rekapitulasi kelulusan 14/14.

---

### TASK-037: Uji Ketahanan Android Low Memory Killer (LMK) & Recovery State
* **Fase:** FASE 7
* **Deskripsi:** Menguji dan memverifikasi ketahanan state PWA saat aplikasi diminimalkan atau dibunuh oleh Android LMK di latar belakang ketika pengguna berpindah ke Termux atau Browser AI pada perangkat RAM 3GB.
* **Dependensi:** `TASK-036`
* **File:** `src/tests/lmkRecovery.test.ts`
* **Docs Terkait:** `docs/mobile/blueprint/09_FAILURE_AND_RECOVERY.md`, `01_SYSTEM_OVERVIEW.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Draft editor dan state aktif pulih 100% setelah simulasi pemutusan memori / reload paksa.
  2. Zero loss context: tidak ada ketikan pengguna yang hilang melebihi batas debounce 400ms.
  3. Indikator pemulihan sesi tampil mengonfirmasi keberhasilan restorasi data.
* **Test Case:** `TC-P7-02`
* **Metode Verifikasi:** Simulasikan force kill tab di browser devtools, buka kembali dan verifikasi keutuhan state.

---

### TASK-038: Uji Operasi Offline 100% (Mode Pesawat) & Service Worker Cache
* **Fase:** FASE 7
* **Deskripsi:** Memverifikasi bahwa seluruh antarmuka PWA, perakit Context Pack, template Command Hub, dan pembaca dokumen beroperasi 100% secara lokal tanpa koneksi internet sama sekali.
* **Dependensi:** `TASK-037`
* **File:** `src/tests/offlineOperation.test.ts`
* **Docs Terkait:** `docs/mobile/blueprint/03_PWA_ARCHITECTURE.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Seluruh tab PWA dapat diakses saat koneksi offline / Mode Pesawat aktif.
  2. Service Worker menyajikan bundel aset dari cache tanpa error network.
  3. Penyimpanan draft dan generator template bekerja normal secara offline.
* **Test Case:** `TC-P7-03`
* **Metode Verifikasi:** Putuskan koneksi internet sepenuhnya, operasikan PWA, dan amati kelancaran fungsi.

---

### TASK-039: Verifikasi Fisik Ergonomi Layar Sentuh & Target 44px+ di SM-T225
* **Fase:** FASE 7
* **Deskripsi:** Melakukan audit ergonomi fisik antarmuka pada layar 8.7 inci Samsung Galaxy Tab A7 Lite: memastikan kenyamanan sentuhan jari tanpa stylus/keyboard eksternal dan tidak ada elemen UI yang terpotong.
* **Dependensi:** `TASK-038`
* **File:** `src/components/mobile/MobileLayout.tsx`, `docs/mobile/DEVICE_AUDIT.md`
* **Docs Terkait:** `docs/mobile/blueprint/02_COMPONENT_ARCHITECTURE.md`, `10_TEST_STRATEGY.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Semua tombol aksi memiliki target sentuh terukur >= 44x44px.
  2. Kontrol utama dapat dijangkau nyaman oleh jempol tangan pada posisi pegang tablet lanskap/potret.
  3. Teks terbaca jelas dengan kontras memadai pada layar WXGA+ (1340x800).
* **Test Case:** `TC-P7-04`
* **Metode Verifikasi:** Audit ukuran elemen via inspektur DOM dan checklist uji fisik perangkat.

---

### TASK-040: Audit Keamanan Zero-Secret & Verifikasi Pembersihan Token
* **Fase:** FASE 7
* **Deskripsi:** Melakukan pemindaian keamanan menyeluruh pada seluruh berkas repositori, draft LocalStorage, dan riwayat clipboard untuk memastikan nol rahasia (token, password, key) yang bocor atau tersimpan permanen.
* **Dependensi:** `TASK-039`
* **File:** `scripts/security-audit.sh`, `docs/mobile/SECURITY_AUDIT.md`
* **Docs Terkait:** `docs/mobile/blueprint/08_SECURITY_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Pemindaian regex mendeteksi 0 Personal Access Token GitHub (`ghp_*`) dan 0 API key di repo.
  2. LocalStorage hanya memuat metadata publik dan draft Markdown.
  3. Perintah `clean-auth` terbukti membersihkan memori cache kredensial secara tuntas.
* **Test Case:** `TC-P7-05`
* **Metode Verifikasi:** Jalankan skrip pemindai pola rahasia terhadap seluruh direktori kerja.

---

### ============================================================================
### FASE 8: DOKUMENTASI & PANDUAN OPERASIONAL TERPADU
### ============================================================================

### TASK-041: Panduan Instalasi Tablet & Penyiapan Termux (`INSTALLATION.md`)
* **Fase:** FASE 8
* **Deskripsi:** Menyusun panduan instalasi langkah-demi-langkah yang presisi untuk Samsung Galaxy Tab A7 Lite: instalasi Termux dari F-Droid, penyiapan paket Linux (Python, Git, Micro), cloning repositori ke Termux Home, dan instalasi PWA ke layar utama.
* **Dependensi:** `TASK-040`
* **File:** `docs/mobile/INSTALLATION.md`, `docs/mobile/TERMUX_SETUP.md`
* **Docs Terkait:** `docs/mobile/blueprint/04_TERMUX_INTEGRATION.md`, `05_STORAGE_AND_SYNC.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Panduan memuat perintah copy-paste lengkap penyiapan Termux dari nol.
  2. Memuat instruksi instalasi PWA dari browser Chrome Android.
  3. Bahasa instruktif, jelas, dan bebas ambiguitas teknis.
* **Test Case:** `TC-P8-01`
* **Metode Verifikasi:** Review dokumen instalasi dan uji pembacaan alur instruksi.

---

### TASK-042: Panduan Pengguna & Alur Kerja Estafet 8 Anggota (`USER_GUIDE.md`)
* **Fase:** FASE 8
* **Deskripsi:** Menyusun panduan operasional harian bagi 8 anggota tim estafet: alur kerja 8 langkah, penggunaan selektor profil, pembagian tugas cabang, pengisian Context Pack, hingga checklist serah terima perangkat fisik.
* **Dependensi:** `TASK-041`
* **File:** `docs/mobile/USER_GUIDE.md`
* **Docs Terkait:** `docs/mobile/blueprint/07_WORKFLOW_DESIGN.md`, `14_MULTI_AI_TEAM_MODEL.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Panduan mengilustrasikan alur kerja harian secara visual dan sistematis.
  2. Memuat protokol pergantian giliran tablet antar anggota tim.
  3. Tersedia panduan ringkas tips efisiensi RAM pada perangkat 3GB.
* **Test Case:** `TC-P8-02`
* **Metode Verifikasi:** Review dokumen panduan pengguna dan kelengkapan materi alur kerja.

---

### TASK-043: Panduan Penanganan Masalah & Recovery Mandiri (`TROUBLESHOOTING.md`)
* **Fase:** FASE 8
* **Deskripsi:** Menyusun panduan pemecahan masalah operasional umum di tablet: penanganan aplikasi terbunuh LMK, pemulihan draft sesi yang belum ter-commit, resolusi error izin penyimpanan, dan recovery Kasus A–D.
* **Dependensi:** `TASK-042`
* **File:** `docs/mobile/TROUBLESHOOTING.md`
* **Docs Terkait:** `docs/mobile/blueprint/09_FAILURE_AND_RECOVERY.md`
* **Docs Impact:** -
* **Acceptance Criteria:**
  1. Memuat daftar gejala error umum dan solusinya dalam bentuk matriks tanya-jawab.
  2. Menyediakan perintah recovery mandiri yang siap disalin ke Termux.
  3. Menegaskan larangan penggunaan perintah destruktif tanpa backup.
* **Test Case:** `TC-P8-03`
* **Metode Verifikasi:** Review matriks troubleshoot dan verifikasi keabsahan perintah recovery.

---

## 3. ATURAN EKSEKUSI TASK (P2-CP6 PREPARATION)

1. **Aturan 1 Task IN_PROGRESS:** Tidak boleh ada lebih dari 1 task berstatus `IN_PROGRESS` pada waktu yang sama di tablet bersama.
2. **Definisi Selesai (Definition of Done):** Suatu task hanya boleh diubah statusnya menjadi `DONE` apabila:
   - Seluruh Acceptance Criteria terpenuhi.
   - Perubahan telah diuji secara nyata dengan bukti terlampir pada kolom `Bukti Verifikasi`.
   - Lulus linter dan validator ZLCE dengan 0 error.
   - Disetujui oleh anggota aktif yang dicatat namanya pada kolom `Disetujui`.
3. **Pencatatan WAL Mandatori:** Sebelum menyentuh berkas kode multi-file, rincian langkah wajib ditulis di Bagian 3 (WAL) `SESSION_STATE.md`.
4. **Zero Unapproved Tasks:** Tidak ada pekerjaan di luar nomor task yang terdaftar dalam backlog ini.
