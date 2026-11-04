import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FolderGit2, 
  FileCode2, 
  CheckCircle2, 
  Copy, 
  Check, 
  GitBranch, 
  ArrowRight, 
  AlertTriangle, 
  Terminal, 
  Layers, 
  RefreshCw, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  GitCommit,
  Workflow,
  Search,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Cpu,
  Code2,
  Download,
  Flame,
  Shield,
  HelpCircle,
  Clock
} from 'lucide-react';
import { copyText } from '../utils/clipboard';
import { CANONICAL_USAGE_GUIDE_MD } from '../data/templates';

type ViewMode = 'canonical-usage' | 'interactive-scenarios' | 'prompt-catalog';
type ScenarioType = 'new-project' | 'existing-project' | 'in-progress';

export const TutorialTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('canonical-usage');
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('new-project');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    const success = await copyText(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleDownloadUsageMd = () => {
    const element = document.createElement('a');
    const file = new Blob([CANONICAL_USAGE_GUIDE_MD], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'USAGE.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dokumentasi &amp; Panduan Pemakaian Lengkap ZLCE
              </h2>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Panduan kanonik metodologi <strong>Zero-Loss Context Engineering (ZLCE v3.2.2)</strong>: matriks situasi, 3 jalur alur kerja, protokol pemulihan darurat Kasus A–D, triase revisi R1–R7, dan aturan commit atomik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(CANONICAL_USAGE_GUIDE_MD, 'full-usage-md')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 transition"
              title="Salin berkas USAGE.md kanonik ke clipboard"
            >
              {copiedId === 'full-usage-md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'full-usage-md' ? 'Tersalin' : 'Salin USAGE.md'}</span>
            </button>

            <button
              onClick={handleDownloadUsageMd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
              title="Unduh berkas USAGE.md"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Unduh .md</span>
            </button>
          </div>
        </div>

        {/* Top-Level Mode Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-700/60">
          <button
            onClick={() => setViewMode('canonical-usage')}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              viewMode === 'canonical-usage'
                ? 'bg-emerald-950/50 border-emerald-500/80 text-white shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-500/30'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`p-2 rounded-lg ${viewMode === 'canonical-usage' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Panduan Lengkap</div>
              <div className="text-sm font-bold text-slate-100">USAGE.md Kanonik</div>
              <div className="text-xs text-slate-400">6 Bagian Utama &amp; Aturan ZLCE</div>
            </div>
          </button>

          <button
            onClick={() => setViewMode('interactive-scenarios')}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              viewMode === 'interactive-scenarios'
                ? 'bg-cyan-950/50 border-cyan-500/80 text-white shadow-lg shadow-cyan-900/20 ring-1 ring-cyan-500/30'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`p-2 rounded-lg ${viewMode === 'interactive-scenarios' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Tutorial Interaktif</div>
              <div className="text-sm font-bold text-slate-100">3 Skenario Siklus Proyek</div>
              <div className="text-xs text-slate-400">Mulai Baru, Audit, &amp; Takeover</div>
            </div>
          </button>

          <button
            onClick={() => setViewMode('prompt-catalog')}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              viewMode === 'prompt-catalog'
                ? 'bg-indigo-950/50 border-indigo-500/80 text-white shadow-lg shadow-indigo-900/20 ring-1 ring-indigo-500/30'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`p-2 rounded-lg ${viewMode === 'prompt-catalog' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Katalog Prompt</div>
              <div className="text-sm font-bold text-slate-100">Prompt Siap Salin</div>
              <div className="text-xs text-slate-400">Landing, Handover, Audit, CLI</div>
            </div>
          </button>
        </div>
      </div>

      {/* VIEW 1: CANONICAL USAGE GUIDE (USAGE.MD) */}
      {viewMode === 'canonical-usage' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick Table of Contents Strip */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Daftar Isi Dokumen Panduan USAGE.md:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-medium">
              <a href="#sec-matriks" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>1. Matriks Situasi Kerja</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#sec-jalur" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>2. Tiga Jalur Alur Kerja</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#sec-recovery" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>3. Protokol Pemulihan Kasus A–D</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#sec-triase" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>4. Aturan Triase Revisi (R1–R7)</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#sec-checkpoint" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>5. Format Checkpoint &amp; Aturan X1</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#sec-keamanan" className="p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800/60 transition">
                <span>6. Host Dev 0.0.0.0 vs 127.0.0.1</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Section 1: Matriks Situasi Kerja */}
          <div id="sec-matriks" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <h3 className="text-base font-bold text-white">Matriks Situasi Kerja &amp; Tindakan ZLCE</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Tindakan Cepat
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tentukan situasi proyek Anda saat ini untuk mengetahui tindakan dan berkas yang harus dilampirkan:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                    <th className="py-2.5 px-3 font-semibold">Situasi Kerja</th>
                    <th className="py-2.5 px-3 font-semibold">Tindakan &amp; Berkas yang Digunakan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-cyan-300">
                      Memulai Proyek Baru (Greenfield)
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      Gunakan <code className="text-cyan-400 font-mono">LANDING_PROMPT.md</code> (Aksi: <code className="text-amber-400 font-mono">BARU</code>). Lampirkan template kontrol atau <code className="text-cyan-400 font-mono">ZLCE_KIT_SINGLE.md</code>.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(NEW_PROJECT_LANDING_PROMPT, 'mat-1')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                      >
                        {copiedId === 'mat-1' ? 'Tersalin' : 'Salin Prompt'}
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-emerald-300">
                      Melanjutkan Sesi / Pindah AI / Selesai Normal
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      Gunakan <code className="text-cyan-400 font-mono">HANDOVER_PROMPT.md</code> + lampirkan trio wajib: <code className="text-slate-200 font-mono">SESSION_STATE.md</code>, <code className="text-slate-200 font-mono">TASKS.md</code>, <code className="text-slate-200 font-mono">AI_WORKFLOW.md</code>.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(TAKEOVER_PROMPT, 'mat-2')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                      >
                        {copiedId === 'mat-2' ? 'Tersalin' : 'Salin Prompt'}
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-amber-300">
                      Merapikan Proyek Lama (Existing Codebase)
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      Gunakan <code className="text-cyan-400 font-mono">LANDING_PROMPT.md</code> (Aksi: <code className="text-amber-400 font-mono">RESTRUKTURISASI</code>). AI <strong>dilarang mengubah kode</strong> sebelum audit selesai dan matriks task disetujui.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(EXISTING_PROJECT_AUDIT_PROMPT, 'mat-3')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                      >
                        {copiedId === 'mat-3' ? 'Tersalin' : 'Salin Prompt'}
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-purple-300">
                      Validasi Integritas Format State
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      Jalankan <code className="text-cyan-400 font-mono">python3 scripts/zlce/zlce-check.py .</code> di terminal Termux, atau gunakan tab <strong>SESSION_STATE</strong> di ZLCE Studio.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard('python3 scripts/zlce/zlce-check.py .', 'mat-4')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                      >
                        {copiedId === 'mat-4' ? 'Tersalin' : 'Salin CLI'}
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-rose-300">
                      Sesi Terputus Tiba-Tiba (Crash / Token Limit)
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      Jalankan <code className="text-cyan-400 font-mono">bash scripts/zlce/zlce-snapshot.sh --diff</code> atau buka tab <strong>Pemulihan Sesi (Kasus A-D)</strong> di ZLCE Studio.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard('bash scripts/zlce/zlce-snapshot.sh --diff', 'mat-5')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                      >
                        {copiedId === 'mat-5' ? 'Tersalin' : 'Salin CLI'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Tiga Jalur Alur Kerja */}
          <div id="sec-jalur" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <h3 className="text-base font-bold text-white">Tiga Jalur Alur Kerja Operasional ZLCE</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                Core Workflows
              </span>
            </div>

            {/* Jalur 1: Proyek Baru */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Jalur 1: Proyek Baru (Mulai dari Nol / Greenfield)</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <div>
                  <strong className="text-white">1. Inisiasi via Landing Prompt:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
                    <li>Tentukan mode: <code className="text-slate-200">LITE</code> (4 berkas kontrol: BLUEPRINT, TASKS, SESSION_STATE, HANDOVER) atau <code className="text-slate-200">FULL</code> (10 dokumen lengkap).</li>
                    <li>Isi parameter di <code className="text-slate-200">LANDING_PROMPT.md</code> (Nama Proyek, Aksi BARU, Tech Stack, Kebutuhan Inti).</li>
                    <li>Lampirkan <code className="text-slate-200">templates/</code> (atau <code className="text-slate-200">ZLCE_KIT_SINGLE.md</code>), lalu kirim prompt.</li>
                  </ul>
                </div>

                <div>
                  <strong className="text-white">2. Gerbang Kualitas Bertahap (Quality Gates):</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-1 font-mono text-[11px]">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <span className="text-cyan-400 font-bold block">Gerbang 1:</span>
                      <span className="text-slate-300">BLUEPRINT.md disusun, AI BERHENTI meminta persetujuan.</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <span className="text-cyan-400 font-bold block">Gerbang 2 (Mode FULL):</span>
                      <span className="text-slate-300">ARCHITECTURE.md &amp; DATA_MODEL.md disusun, AI BERHENTI.</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <span className="text-cyan-400 font-bold block">Gerbang 3:</span>
                      <span className="text-slate-300">TASKS.md (tugas atomik) &amp; TESTING.md disusun.</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <span className="text-emerald-400 font-bold block">Gerbang 4:</span>
                      <span className="text-slate-300">SESSION_STATE.md diinisiasi; eksekusi task 1 per 1 dimulai.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <strong className="text-white">3. Eksekusi Atomik &amp; Transaksional:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Tepat <strong>1 task</strong> berstatus <code className="text-cyan-300">IN_PROGRESS</code> pada satu waktu. Status dicatat di tabel matriks task dan blok WAL sebelum modifikasi kode dilakukan. Status <code className="text-emerald-300">DONE</code> hanya sah bila disertai bukti verifikasi riil.
                  </p>
                </div>
              </div>
            </div>

            {/* Jalur 2: Lanjut Sesi */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <Play className="w-4 h-4" />
                <span>Jalur 2: Lanjut Sesi / Pindah AI / Sesi Terputus</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <div>
                  <strong className="text-white">1. Siapkan Dokumen Serah Terima:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Siapkan trio berkas kontrol wajib: <code className="text-slate-200">SESSION_STATE.md</code>, <code className="text-slate-200">TASKS.md</code>, dan <code className="text-slate-200">AI_WORKFLOW.md</code>. Jika sesi terputus di tengah jalan, jalankan <code className="text-cyan-300 font-mono">bash scripts/zlce/zlce-snapshot.sh --diff</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Panggil AI Baru dengan Handover:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Tempelkan isi <code className="text-slate-200 font-mono">HANDOVER_PROMPT.md</code> dan lampirkan dokumen state. AI akan otomatis mengenali kondisi recovery (Kasus A, B, C, atau D) dan melanjutkan pekerjaan tanpa kehilangan konteks.
                  </p>
                </div>
              </div>
            </div>

            {/* Jalur 3: Proyek Existing */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <RefreshCw className="w-4 h-4" />
                <span>Jalur 3: Proyek Existing yang Direstrukturisasi (Read-Only Audit)</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <div>
                  <strong className="text-white">1. Gunakan Mode Restrukturisasi:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Set parameter di <code className="text-slate-200">LANDING_PROMPT.md</code>: <code className="text-amber-400">Aksi: RESTRUKTURISASI</code>. Lampirkan direktori kunci (<code className="text-slate-200">package.json</code>, routes, skema).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Audit Baca-Saja (Read-Only Audit):</strong>
                  <p className="text-slate-400 mt-0.5">
                    AI <strong>dilarang keras memodifikasi kode</strong> sebelum peta audit selesai disusun dalam <code className="text-slate-200">BLUEPRINT.md</code> dan <code className="text-slate-200">TASKS.md</code>. Setelah tugas disetujui, refactoring dilakukan per task terisolasi dengan verifikasi berbukti.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Recovery Kasus A-D */}
          <div id="sec-recovery" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <h3 className="text-base font-bold text-white">Protokol Pemulihan Darurat (Recovery Kasus A–D)</h3>
              </div>
              <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                Crash Resilient
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ketika sesi AI terputus tiba-tiba atau token habis di tengah pekerjaan, bandingkan isi <code className="text-cyan-300 font-mono">git status / git diff</code> dengan blok WAL di <code className="text-cyan-300 font-mono">SESSION_STATE.md</code>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/40 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">A</span>
                  Kasus A: Working Tree Bersih
                </div>
                <p className="text-slate-300">
                  <strong className="text-slate-200">Kondisi:</strong> Tidak ada diff uncommitted di terminal. Commit terakhir sudah tercatat di state.
                </p>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-cyan-300">
                  <strong>Prosedur:</strong> Lanjutkan langkah pertama task aktif yang tercatat di WAL atau task berikutnya. <em>Dilarang keras melakukan git reset.</em>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">B</span>
                  Kasus B: In-Flight Diff Cocok dengan WAL
                </div>
                <p className="text-slate-300">
                  <strong className="text-slate-200">Kondisi:</strong> Ada berkas termodifikasi dan semuanya tercantum di field <code className="text-slate-200">plannedFiles</code> WAL.
                </p>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-amber-300">
                  <strong>Prosedur:</strong> Pertahankan diff, verifikasi apakah langkah telah tuntas. Jika tuntas, jalankan verifikasi, commit, dan perbarui state.
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[10px]">C</span>
                  Kasus C: Commit Desync di Git Log
                </div>
                <p className="text-slate-300">
                  <strong className="text-slate-200">Kondisi:</strong> Ada commit di <code className="text-slate-200">git log</code> yang belum tercatat statusnya di <code className="text-slate-200">SESSION_STATE.md</code>.
                </p>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-rose-300">
                  <strong>Prosedur:</strong> Selaraskan <code className="text-slate-200 font-mono">SESSION_STATE.md</code> agar mencatat commit tersebut, update task matriks ke status yang sesuai.
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 space-y-2">
                <div className="font-bold text-purple-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">D</span>
                  Kasus D: Wildcard Diff (Di Luar WAL)
                </div>
                <p className="text-slate-300">
                  <strong className="text-slate-200">Kondisi:</strong> Ada perubahan file yang tidak tercantum dalam blok WAL.
                </p>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-purple-300">
                  <strong>Prosedur:</strong> Tahan perubahan. AI menandai task sebagai <code className="text-slate-200 font-mono">BLOCKED</code> sementara dan meminta konfirmasi manusia sebelum revert/lanjut.
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Aturan Triase Revisi R1-R7 */}
          <div id="sec-triase" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <h3 className="text-base font-bold text-white">Aturan Triase Revisi (R1–R7)</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Zero-Regression
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Jika di tengah eksekusi pengguna meminta perubahan atau revisi, terapkan klasifikasi ukuran perubahan:
            </p>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold font-mono shrink-0">Level S</span>
                <div>
                  <div className="font-semibold text-white">Revisi Minor / Typo / &lt;= 1 berkas, &lt;= 20 baris, tanpa ubah skema/kontrak/AC</div>
                  <p className="text-slate-400 mt-1">
                    Dikerjakan langsung di dalam task aktif yang sedang berjalan tanpa membuat task baru. Dicatat di slot revisi atau baris log WAL.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold font-mono shrink-0">Level M Dependen</span>
                <div>
                  <div className="font-semibold text-white">Revisi Menengah Terkait Task Berjalan</div>
                  <p className="text-slate-400 mt-1">
                    Perbarui kriteria verifikasi dan daftar berkas terdampak pada task aktif. Tidak merusak urutan matriks task lain.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold font-mono shrink-0">Level M Independen / L</span>
                <div>
                  <div className="font-semibold text-white">Fitur Baru atau Perubahan Skema Besar</div>
                  <p className="text-slate-400 mt-1">
                    <strong>Dilarang menyisipkan perubahan secara liar pada task aktif.</strong> Dijadwalkan sebagai task baru (<code className="text-cyan-300 font-mono">TASK-REV-NN</code> berstatus <code className="text-slate-300 font-mono">PENDING</code>) di antrean berikutnya setelah task aktif selesai.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Format Checkpoint & Aturan Jam X1 */}
          <div id="sec-checkpoint" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                  5
                </span>
                <h3 className="text-base font-bold text-white">Format Blok Checkpoint &amp; Aturan Jam X1</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                Rule X1 Active
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Setiap interaksi kritis atau pembaruan status wajib mencantumkan blok checkpoint terstruktur berikut:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Format Checkpoint Kanonik:</span>
                <button
                  onClick={() => copyToClipboard(CHECKPOINT_TEMPLATE, 'chk-tmpl')}
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1"
                >
                  {copiedId === 'chk-tmpl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'chk-tmpl' ? 'Tersalin' : 'Salin Format'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto leading-relaxed">
{CHECKPOINT_TEMPLATE}
              </pre>
            </div>

            <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-800/40 text-xs text-amber-200/90 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Aturan Jam (Rule X1):</strong> Jika lingkungan AI tidak memiliki akses jam sistem tepercaya, AI wajib menulis <code className="text-amber-300 font-mono">"jam: ?"</code> dan <strong>dilarang keras mengarang atau mengekstrapolasi waktu secara halusinasi</strong>.
              </div>
            </div>
          </div>

          {/* Section 6: Panduan Keamanan & Jaringan */}
          <div id="sec-keamanan" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold text-xs flex items-center justify-center font-mono">
                  6
                </span>
                <h3 className="text-base font-bold text-white">Panduan Keamanan &amp; Konfigurasi Server Pengembangan</h3>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                Security &amp; Dev Server
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Bind Host Jaringan (0.0.0.0 vs 127.0.0.1)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Secara default pada lingkungan cloud AI Studio, dev server berjalan pada <code className="text-cyan-300 font-mono">0.0.0.0:3000</code> agar reverse proxy berfungsi.
                </p>
                <div className="text-slate-400 text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-semibold block">Penggunaan di Tablet Android / Wi-Fi Privat:</span>
                  <p>Bila menjalankan server di tablet dan ingin membatasi akses hanya ke loopback lokal:</p>
                  <code className="text-cyan-300 font-mono block mt-1">npm run dev -- --host 127.0.0.1</code>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Kerahasiaan Kredensial (Zero-Secret Policy)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  ZLCE Studio berjalan murni di sisi klien (<em className="text-slate-200">client-side</em>). Jangan pernah menempelkan API key, Personal Access Token GitHub, atau kredensial produksi ke dalam <code className="text-slate-200 font-mono">SESSION_STATE.md</code>.
                </p>
                <div className="text-slate-400 text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-semibold block">Credential Cache Termux (ADR-04):</span>
                  <p>Gunakan cache RAM berbatas waktu 15 menit: <code className="text-slate-200 font-mono">cache --timeout=900</code>, dan hapus seketika saat pergantian pemegang tablet via <code className="text-cyan-300 font-mono">git credential-cache exit</code>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 3 INTERACTIVE SCENARIOS */}
      {viewMode === 'interactive-scenarios' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveScenario('new-project')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                activeScenario === 'new-project'
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/80 shadow'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Skenario 1: Proyek Baru (Greenfield)</span>
            </button>

            <button
              onClick={() => setActiveScenario('existing-project')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                activeScenario === 'existing-project'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/80 shadow'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Skenario 2: Proyek Selesai (Audit / Update)</span>
            </button>

            <button
              onClick={() => setActiveScenario('in-progress')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                activeScenario === 'in-progress'
                  ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/80 shadow'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Skenario 3: Takeover di Tengah Jalan</span>
            </button>
          </div>

          {/* Scenario 1: New Project */}
          {activeScenario === 'new-project' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  Skenario 1: Membangun Proyek Baru dari Nol (Greenfield Project)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pada proyek baru, AI Agent dilarang keras menulis kode sebelum menyepakati 4 Gerbang ZLCE: Blueprint, Arsitektur &amp; Data Model, Tasks &amp; Testing, serta Session State.
                </p>
              </div>

              {/* Recommended File Tree */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-white"><FolderGit2 className="w-4 h-4 text-cyan-400" /> Struktur Berkas Kontrol GitHub:</span>
                  <button
                    onClick={() => copyToClipboard(FILE_TREE_NEW_PROJECT, 'tree-new-sc')}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    {copiedId === 'tree-new-sc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'tree-new-sc' ? 'Tersalin' : 'Salin Tree'}</span>
                  </button>
                </div>
                <pre className="text-emerald-400 font-mono text-xs overflow-x-auto bg-slate-950 p-4 rounded-lg border border-slate-800 leading-relaxed">
{FILE_TREE_NEW_PROJECT}
                </pre>
              </div>

              {/* Prompt Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Prompt Landing Proyek Baru (Siap Pakai):
                  </span>
                  <button
                    onClick={() => copyToClipboard(NEW_PROJECT_LANDING_PROMPT, 'prompt-new-sc')}
                    className="flex items-center gap-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedId === 'prompt-new-sc' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'prompt-new-sc' ? 'Tersalin!' : 'Salin Prompt'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 font-mono text-xs overflow-x-auto bg-slate-950 p-3.5 rounded-lg border border-slate-800 max-h-72 leading-relaxed">
{NEW_PROJECT_LANDING_PROMPT}
                </pre>
              </div>
            </div>
          )}

          {/* Scenario 2: Existing Project */}
          {activeScenario === 'existing-project' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-amber-400 flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5" />
                  Skenario 2: Proyek Selesai (Review, Update, atau Penambahan Fitur)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pada codebase yang sudah berjalan, terapkan fase <strong>Read-Only Audit</strong> terlebih dahulu. AI dilarang menyentuh file kode sebelum menyusun BLUEPRINT dan matriks task eksisting.
                </p>
              </div>

              {/* Prompt Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-amber-400" />
                    Prompt Audit Codebase Existing:
                  </span>
                  <button
                    onClick={() => copyToClipboard(EXISTING_PROJECT_AUDIT_PROMPT, 'prompt-audit-sc')}
                    className="flex items-center gap-1 text-xs bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedId === 'prompt-audit-sc' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'prompt-audit-sc' ? 'Tersalin!' : 'Salin Prompt Audit'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 font-mono text-xs overflow-x-auto bg-slate-950 p-3.5 rounded-lg border border-slate-800 max-h-72 leading-relaxed">
{EXISTING_PROJECT_AUDIT_PROMPT}
                </pre>
              </div>
            </div>
          )}

          {/* Scenario 3: In Progress / Takeover */}
          {activeScenario === 'in-progress' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5" />
                  Skenario 3: Melanjutkan Proyek di Tengah Jalan (Takeover / Sesi Terputus)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Jika AI terputus atau token limit habis, lakukan forensik terminal git lalu serahkan dokumen kontrol wajib dengan prompt handover.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono flex items-center gap-1.5 text-white font-bold"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> Perintah Forensik Terminal:</span>
                  <button
                    onClick={() => copyToClipboard(FORENSIC_COMMANDS, 'forensic-sc')}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    {copiedId === 'forensic-sc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'forensic-sc' ? 'Tersalin' : 'Salin Perintah'}</span>
                  </button>
                </div>
                <pre className="text-cyan-300 font-mono text-xs overflow-x-auto bg-slate-950 p-3 rounded-lg border border-slate-800">
{FORENSIC_COMMANDS}
                </pre>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-indigo-400" />
                    Prompt Handover / Takeover AI Baru:
                  </span>
                  <button
                    onClick={() => copyToClipboard(TAKEOVER_PROMPT, 'prompt-takeover-sc')}
                    className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedId === 'prompt-takeover-sc' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'prompt-takeover-sc' ? 'Tersalin!' : 'Salin Prompt Takeover'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 font-mono text-xs overflow-x-auto bg-slate-950 p-3.5 rounded-lg border border-slate-800 max-h-72 leading-relaxed">
{TAKEOVER_PROMPT}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: PROMPT CATALOG */}
      {viewMode === 'prompt-catalog' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 gap-4">
            {/* Landing Prompt */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-cyan-400 font-mono">1. Landing Prompt</div>
                  <h4 className="text-sm font-bold text-white">Inisiasi Proyek Baru (Mulai dari Nol)</h4>
                </div>
                <button
                  onClick={() => copyToClipboard(NEW_PROJECT_LANDING_PROMPT, 'cat-1')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition flex items-center gap-1"
                >
                  {copiedId === 'cat-1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cat-1' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-56">
{NEW_PROJECT_LANDING_PROMPT}
              </pre>
            </div>

            {/* Handover Prompt */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-400 font-mono">2. Handover Prompt</div>
                  <h4 className="text-sm font-bold text-white">Serah Terima Antar AI / Pemulihan Sesi</h4>
                </div>
                <button
                  onClick={() => copyToClipboard(TAKEOVER_PROMPT, 'cat-2')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1"
                >
                  {copiedId === 'cat-2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cat-2' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-56">
{TAKEOVER_PROMPT}
              </pre>
            </div>

            {/* Feature Request Prompt */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-amber-400 font-mono">3. Feature Request Prompt</div>
                  <h4 className="text-sm font-bold text-white">Permintaan Fitur Baru dengan Triase R7</h4>
                </div>
                <button
                  onClick={() => copyToClipboard(FEATURE_REQUEST_PROMPT, 'cat-3')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition flex items-center gap-1"
                >
                  {copiedId === 'cat-3' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cat-3' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-56">
{FEATURE_REQUEST_PROMPT}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* AI Tool Recommendation Matrix (Always visible at bottom) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Saran Bijak Memilih AI: Setiap Alat Dipakai Sesuai Kebutuhan Kerja
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
            ZLCE Compatibility Anchor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Coding Cepat
            </span>
            <div className="text-xs font-semibold text-white">GitHub Copilot / Cursor</div>
            <p className="text-[11px] text-slate-400">Autocompletion instan di editor saat mengetik baris kode.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Penalaran Arsitektur
            </span>
            <div className="text-xs font-semibold text-white">Claude 3.7 Sonnet / Opus</div>
            <p className="text-[11px] text-slate-400">Audit kepatuhan, refactoring aman, dan validasi kontrak tanpa asumsi liar.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Large Context &amp; Search
            </span>
            <div className="text-xs font-semibold text-white">Gemini 2.5 Flash / Pro</div>
            <p className="text-[11px] text-slate-400">Analisis repo besar 1M token &amp; pencarian dokumentasi terbaru.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Canonical Templates & Constants
const CHECKPOINT_TEMPLATE = `<!-- ZLCE:CHECKPOINT:START -->
Task: TASK-001
Status: IN_PROGRESS
Langkah Terakhir: Memverifikasi test baseline dan eksekusi linter
Langkah Berikutnya: Mengonfirmasi 0 error pada build produksi
Berkas Terdampak: package.json, tsconfig.json
Bukti Verifikasi: npm test && npm run lint && npm run build
Timestamp: 2026-11-04T12:00:00Z (atau "jam: ?")
<!-- ZLCE:CHECKPOINT:END -->`;

const FILE_TREE_NEW_PROJECT = `.
├── .gitignore
├── README.md                   <-- Panduan utama & 3 langkah mulai cepat
├── package.json
│
├── LANDING_PROMPT.md           <-- Prompt spesifikasi proyek awal
├── HANDOVER_PROMPT.md          <-- Protokol serah terima & recovery
├── BLUEPRINT.md                <-- Hasil Gerbang 1 (Lingkup, User Story, Batasan)
├── ARCHITECTURE.md             <-- Hasil Gerbang 2 (Arsitektur modul & tech stack)
├── DATA_MODEL.md               <-- Hasil Gerbang 2 (Skema DB & relasi entitas)
├── TASKS.md                    <-- Hasil Gerbang 3 (Daftar antrean tugas atomik)
├── TESTING.md                  <-- Hasil Gerbang 3 (Rencana pengujian & acceptance)
├── SESSION_STATE.md            <-- Hasil Gerbang 4 (Single source of truth, WAL & evidence)
├── AI_WORKFLOW.md              <-- Hasil Gerbang 4 (Aturan eksekusi & checkpoint)
│
├── templates/
│   └── profiles/
│       └── DOMAIN_BOOKING.profile.md  <-- Profil domain (misal: Rental Motor)
│
└── src/                        <-- Kode aplikasi (Dibuat HANYA saat eksekusi task Gerbang 4)`;

const NEW_PROJECT_LANDING_PROMPT = `Halo! Kita akan memulai proyek baru menggunakan metodologi **Zero-Loss Context Engineering (ZLCE v3.2.2)**.

Aturan Utama Eksekusi:
1. Anda HARUS mengikuti protokol 4 Gerbang:
   - Gerbang 1: Buat HANYA \`BLUEPRINT.md\`. Lalu BERHENTI dan tunggu persetujuan saya.
   - Gerbang 2: Buat HANYA \`ARCHITECTURE.md\` dan \`DATA_MODEL.md\`. Lalu BERHENTI dan tunggu persetujuan saya.
   - Gerbang 3: Buat HANYA \`TASKS.md\` dan \`TESTING.md\`. Lalu BERHENTI.
   - Gerbang 4: Buat dokumen kontrol pendukung (\`SESSION_STATE.md\`, \`AI_WORKFLOW.md\`, \`CHECKLISTS.md\`), lalu eksekusi task satu per satu (Rule R4: hanya 1 task berstatus IN_PROGRESS pada satu waktu).
2. DILARANG keras menulis kode produksi di src/ sebelum Gerbang 1 s/d 3 selesai disetujui.
3. Selalu perbarui Write-Ahead Log (WAL) sebelum dan sesudah menyentuh file.

Spesifikasi Proyek:
- Nama Proyek: Web Rental Motor
- Domain: Rental Kendaraan / Sewa Motor (Gunakan profil domain 'booking')
- Stack: React 19, Vite, Tailwind CSS, TypeScript, SQLite / Cloud SQL
- Modus: LITE (Rekomendasi Default)
- Kemampuan: Tulis File & Jalankan Perintah Terminal

Mulai sekarang dengan menghasilkan HANYA file \`BLUEPRINT.md\` (Gerbang 1). Jangan menulis file lain sebelum saya setujui.`;

const EXISTING_PROJECT_AUDIT_PROMPT = `Halo! Kita akan melakukan review, audit, dan penambahan fitur pada proyek yang sudah ada ini menggunakan metodologi **Zero-Loss Context Engineering (ZLCE)**.

ATURAN KETAT:
1. JANGAN mengubah atau menghapus satu baris kode produksi pun saat ini! Ini adalah fase READ-ONLY AUDIT.
2. Tugas Anda saat ini adalah menginspeksi codebase dan menghasilkan berkas kontrol ZLCE:
   - \`BLUEPRINT.md\`: Visi produk, batasan teknis (non-goals), skema modul, dan batasan domain (Gerbang 1).
   - \`TASKS.md\`: Matriks tugas atomik terstruktur (dengan task stabil ditandai DONE dan bukti verifikasinya).
   - \`SESSION_STATE.md\`: Dokumen state ZLCE awal dengan matriks task, timestamp audit, dan WAL kosong.
3. Setelah dokumen tersebut Anda susun, BERHENTI dan berikan ringkasan temuan audit kepada saya untuk ditinjau.

Mulai inspeksi codebase sekarang dan laporkan struktur awal.`;

const FEATURE_REQUEST_PROMPT = `Kita akan menambahkan fitur baru ke dalam proyek existing ini:
Permintaan Fitur: [Tuliskan fitur yang diminta, misal: "Integrasi Payment Gateway Midtrans & Sistem Kupon Diskon Sewa Motor"]

Instruksi Eksekusi ZLCE (Aturan Triase R7):
1. Lakukan Triase Perubahan:
   - Klasifikasikan ukuran perubahan: [Level S] <= 1 berkas, <= 20 baris, tanpa ubah skema/AC / [Level M/L] Perubahan lebih besar (wajib cek ketergantungan).
   - Bila dependen pada task berjalan: ubah Acceptance Criteria task aktif. Bila independen: jadwalkan task baru.
2. Daftarkan tugas baru ke \`TASKS.md\` dan \`SESSION_STATE.md\` sebagai TASK baru dengan status PENDING.
3. Perbarui Write-Ahead Log (WAL) untuk task pertama yang akan dikerjakan.
4. Tunjukkan rencana perubahan kepada saya dan tunggu konfirmasi sebelum mengubah berkas kode.`;

const FORENSIC_COMMANDS = `# 1. Periksa file apa saja yang belum di-commit atau termodifikasi
git status

# 2. Periksa riwayat 5 commit terakhir untuk melacak task terakhir yang selesai
git log -n 5 --oneline

# 3. Jalankan linter atau test untuk memastikan kondisi build saat ini
npm run build || npm test`;

const TAKEOVER_PROMPT = `Halo! Saya melanjutkan pengerjaan proyek ini dengan Anda sebagai AI Agent baru menggunakan metodologi **Zero-Loss Context Engineering (ZLCE v3.2.2)**.

Lampiran Kontrol Wajib (Trio Serah Terima):
1. \`SESSION_STATE.md\` (Sumber kebenaran status sesi aktif)
2. \`TASKS.md\` (Matriks tugas atomik & kriteria verifikasi)
3. \`AI_WORKFLOW.md\` (Aturan kerja otoritatif ZLCE)
(Serta output snapshot git / diff bila pemulihan sesi terputus)

Langkah Transisi yang Wajib Anda Lakukan:
1. Baca Tier 0: \`SESSION_STATE.md\` penuh dan task aktif di \`TASKS.md\`. Bila tidak terlampir: MINTA dan berhenti. Jangan menebak status!
2. Deteksi Mode: Mode RECOVERY bila bagian 3 (WAL) berisi task atau ada snapshot git; selain itu Mode NORMAL.
3. Bila Mode RECOVERY: Klasifikasikan kasus (A: working tree bersih, B: in-flight diff sesuai WAL, C: commit desync di git log, D: wildcard diff). Dilarang keras melakukan git reset!
4. Konfirmasi ringkas status proyek (maksimal 6 baris) sebelum menyentuh atau menulis kode apa pun!`;
