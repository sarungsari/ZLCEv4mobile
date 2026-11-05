# PANDUAN EKSEKUSI HANDOVER UNTUK CLAUDE / CHATGPT
## ZLCE Mobile Workbench v4.0.0 — Zero-Loss Context Engineering

Panduan ini disiapkan khusus untuk melanjutkan task berikutnya (**TASK-014: Context Budget Manager & Adapter Kuota Token per Model AI**) secara presisi di **Anthropic Claude (Claude 3.5 Sonnet)** atau **ChatGPT (GPT-4o)** tanpa kehilangan satu bit konteks pun (*Zero-Loss*).

---

## 1. IKHTISAR TASK BERIKUTNYA (TASK-014)

* **ID Task:** `TASK-014`
* **Nama Task:** `Context Budget Manager & Adapter Kuota Token per Model AI`
* **Fase:** FASE 3 (Multi-AI Team Model & Context Engineering)
* **Dependensi:** `TASK-013` (Portable Context Pack Generator — status: `DONE`)
* **Status Task Saat Ini:** `READY` (Siap dieksekusi menjadi `IN_PROGRESS`)
* **Target Berkas yang Dibangun/Dimodifikasi:**
  1. `src/utils/tokenBudgetAdapter.ts` (Modul logika kalkulasi, pemotongan lampiran historis, dan adapter kuota)
  2. `src/components/mobile/TokenBudgetSelector.tsx` (Komponen antarmuka ergonomis pemilih model & budget)
  3. `src/components/TokenUsageGauge.tsx` & `src/components/mobile/ContextPackTab.tsx` (Integrasi visual pengukur kuota token)
* **Acceptance Criteria (Kriteria Lulus Sesuai TASKS.md):**
  1. Tersedia pilihan profil AI terstruktur:
     - **Gemini**: Large Context (Kapasitas hingga 1.000.000 token, mode komprehensif, seluruh riwayat & berkas acuan).
     - **Claude**: Mid Context (Batas aman 30.000–200.000 token, mode terfokus pada skema, task aktif, dan WAL).
     - **ChatGPT**: Compact Context (Batas aman 8.000–32.000 token, mode ringkas terkonsolidasi, otomatis memotong lampiran historis berlebih).
  2. Estimasi token ditampilkan secara visual dan real-time sebelum menyalin Context Pack.
  3. Context Pack secara cerdas memotong lampiran historis audit log berlebih saat memilih profil kompak agar tidak melampaui kuota token request.
* **Test Case:** `TC-P3-02` (Beralih antar profil AI dan verifikasi variasi panjang teks Markdown Context Pack).
* **Perintah Verifikasi Akhir:**
  ```bash
  npm run build && python3 scripts/zlce-check.py .
  ```

---

## 2. PROMPT SIAP SALIN UNTUK CLAUDE / CHATGPT

Salin seluruh teks di bawah ini ke jendela chat Claude atau ChatGPT baru Anda:

```markdown
Kamu adalah Senior Frontend & TypeScript Engineer yang bertindak sebagai AI Coding Engine untuk proyek ZLCE Mobile Workbench v4.0.0 (Zero-Loss Context Engineering Studio).

### KONTEKS PROYEK & ATURAN METODOLOGI:
1. Stack: React 19 + TypeScript + Vite + Tailwind CSS (v4).
2. Metodologi: Zero-Loss Context Engineering (ZLCE).
   - Invarian I1 (All in Files): Sumber kebenaran tunggal adalah file Markdown dan kode repositori.
   - Invarian I2 (Cold-Start Resume): Eksekusi mandiri tanpa asumsi ingatan chat sebelumnya.
   - Schema-before-Data: Tipe TypeScript murni dan antarmuka harus didefinisikan sebelum implementasi logika.
3. ATURAN KODE MUTLAK:
   - Tulis kode LENGKAP tanpa placeholder, tanpa tanda elipsis ("// ... rest of code"), tanpa fungsi mockup kosong.
   - Gunakan TypeScript murni yang kompatibel dengan React 19 dan Lucide-React.
   - Sesuai dengan batasan layar tablet Android 8.7" (Samsung Tab A7 Lite): target sentuh minimal 44px (`min-h-[44px]`).

### MANDAT TUGAS: IMPLEMENTASI TASK-014
Nama: Context Budget Manager & Adapter Kuota Token per Model AI
Target File:
1. `src/utils/tokenBudgetAdapter.ts`
2. `src/components/mobile/TokenBudgetSelector.tsx`
3. Update integrasi pada `src/components/mobile/ContextPackTab.tsx` dan `src/components/TokenUsageGauge.tsx`.

### SPESIFIKASI DETAIL:
1. `src/utils/tokenBudgetAdapter.ts`:
   - Definisikan tipe profil model:
     * `gemini-1m` (Limit: 1,000,000 token, Safe Window: 750,000)
     * `claude-30k` (Limit: 30,000 token, Safe Window: 24,000)
     * `gpt-128k` (Limit: 128,000 token, Safe Window: 96,000)
     * `compact-8k` (Limit: 8,000 token, Safe Window: 6,500)
   - Fungsi `pruneContextForBudget(markdown: string, budgetPreset: string)`:
     * Menghitung estimasi token (~4 karakter per token untuk teks teknis campuran Indonesia/Inggris).
     * Jika teks melebihi Safe Window, lakukan pemangkasan cerdas: pangkas Bagian 7 (Log Audit Historis lama) menjadi ringkasan 3 entri terakhir, pertahankan utuh Bagian 1 (Mandat Task Aktif), Bagian 2 (Jangkar Kebenaran Tier 0), dan Bagian 3 (WAL).
   - Fungsi `calculateTokenSafety(tokenCount: number, budgetPreset: string)` mengembalikan status: 'safe' (hijau) | 'warning' (kuning) | 'danger' (merah).

2. `src/components/mobile/TokenBudgetSelector.tsx`:
   - Menyediakan pemilih profil model interaktif berbentuk kartu responsif atau segmented control (Gemini 1M, Claude 30K/Sonnet, GPT Compact 8K/128K).
   - Menampilkan batas kuota, persentase utilisasi terhadap safe window, dan badge status visual.
   - Target sentuh ergonomis ramah jempol (min 44px).

3. Outputkan kode lengkap untuk berkas-berkas tersebut sekarang.
```

---

## 3. PROSEDUR 5 LANGKAH SETELAH MENDAPATKAN KODE DARI CLAUDE / CHATGPT

Setelah Claude atau ChatGPT memberikan kode:

1. **Buka Berkas di Proyek:**
   - Masukkan kode ke `src/utils/tokenBudgetAdapter.ts` dan `src/components/mobile/TokenBudgetSelector.tsx`.
   - Pastikan import dan tipe tersambung dengan benar.
2. **Jalankan Verifikasi Build:**
   ```bash
   npm run build
   ```
3. **Jalankan Linter Kepatuhan ZLCE:**
   ```bash
   python3 scripts/zlce-check.py .
   ```
4. **Perbarui SESSION_STATE.md (Pencatatan WAL & Task Matrix):**
   - Di baris matriks task `TASK-014`: ubah status dari `READY` menjadi `DONE`, isi bukti verifikasi `npm run build && zlce-check pass`.
   - Di bagian `3. WORK IN PROGRESS (WAL)`: catat langkah selesai, set Task Aktif berikutnya (`TASK-015: READY`).
5. **Simpan Commit Git Atomik:**
   ```bash
   git add .
   git commit -m "feat(context): complete TASK-014 context budget manager and token quota adapter"
   ```
