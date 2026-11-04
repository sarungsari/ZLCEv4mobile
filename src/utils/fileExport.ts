/**
 * Utilitas Ekspor Berkas Markdown ZLCE untuk Tablet Android
 * Memastikan penamaan berkas yang benar, pembersihan CRLF -> LF murni,
 * dan mekanisme unduh Blob yang kompatibel dengan browser sandbox Android.
 */

export interface ExportMarkdownOptions {
  filename?: string;
  mimeType?: string;
  ensureUnixLineEndings?: boolean;
}

/**
 * Normalisasi akhir baris memastikan hanya format Unix (LF - \n)
 * Menghilangkan carriage return (\r) yang umum disisipkan oleh Windows atau parser non-POSIX
 */
export function normalizeToUnixLineEndings(content: string): string {
  if (!content) return '';
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * Unduh string Markdown sebagai berkas fisik Blob (.md)
 * Bekerja langsung di browser sandbox tablet Android, memicu unduh ke folder Download/
 */
export function downloadMarkdownBlob(
  content: string,
  options: ExportMarkdownOptions = {}
): { success: boolean; filename: string; size: number; error?: string } {
  try {
    const rawFilename = options.filename?.trim() || 'SESSION_STATE.md';
    // Pastikan ekstensi .md
    const filename = rawFilename.endsWith('.md') ? rawFilename : `${rawFilename}.md`;
    
    // Normalisasi LF
    const normalizedContent = options.ensureUnixLineEndings !== false
      ? normalizeToUnixLineEndings(content)
      : content;

    // Buat Blob dengan tipe text/markdown dan charset utf-8 eksplisit
    const blob = new Blob([normalizedContent], {
      type: options.mimeType || 'text/markdown;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    // Bersihkan DOM dan ObjectURL setelah jeda singkat
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);

    return {
      success: true,
      filename,
      size: blob.size
    };
  } catch (err: any) {
    console.error('Gagal mengunduh berkas Markdown blob:', err);
    return {
      success: false,
      filename: options.filename || 'unknown.md',
      size: 0,
      error: err?.message || 'Terjadi galat saat memproses unduh berkas'
    };
  }
}

/**
 * Pembuat nama berkas pintar berdasarkan tipe dokumen ZLCE dan cap waktu
 */
export function generateSmartFilename(docType: string, projectName?: string): string {
  const safeProject = projectName ? projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : 'zlce';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);

  switch (docType) {
    case 'SESSION_STATE':
      return 'SESSION_STATE.md';
    case 'TASKS':
      return 'TASKS.md';
    case 'BLUEPRINT':
      return 'BLUEPRINT.md';
    default:
      return `${safeProject}-snapshot-${timestamp}.md`;
  }
}
