# ZLCE MOBILE WORKBENCH — MASTER BLUEPRINT INDEX
## Cetak Biru Arsitektur Lengkap untuk Tablet Android Bersama (8 Anggota)

Tanggal: 2026-11-04  
Versi Target: **v4.0.0 (Track 2)**  
Status: **BLUEPRINT APPROVED (P2-CP4 LULUS & DISETUJUI PENGGUNA)**

---

## 1. INDEKS LENGKAP DOKUMEN CETAK BIRU (BLUEPRINT SUITE)

Seluruh aspek perancangan arsitektur, integrasi mobile, keamanan, kolaborasi tim, dan pengujian telah dirumuskan secara komprehensif ke dalam 14 dokumen cetak biru di bawah direktori `docs/mobile/blueprint/`:

| No | Dokumen Cetak Biru | Fokus & Ringkasan Tanggung Jawab | Status |
| :---: | :--- | :--- | :---: |
| **01** | [`01_SYSTEM_OVERVIEW.md`](blueprint/01_SYSTEM_OVERVIEW.md) | Visi sistem, prinsip utama *Zero Daemon*, single-app flow, dan metrik sukses. | ✅ Selesai |
| **02** | [`02_COMPONENT_ARCHITECTURE.md`](blueprint/02_COMPONENT_ARCHITECTURE.md) | Pemisahan 5 peran komponen, arsitektur 4-lapisan PWA, ergonomi tablet 8.7". | ✅ Selesai |
| **03** | [`03_PWA_ARCHITECTURE.md`](blueprint/03_PWA_ARCHITECTURE.md) | Manifest PWA, Service Worker, strategi caching multi-layer, dan visual viewport. | ✅ Selesai |
| **04** | [`04_TERMUX_INTEGRATION.md`](blueprint/04_TERMUX_INTEGRATION.md) | Penyiapan Termux, CLI Dispatcher `zlce`, anti-command injection, dan paste-back. | ✅ Selesai |
| **05** | [`05_STORAGE_AND_SYNC.md`](blueprint/05_STORAGE_AND_SYNC.md) | Topologi berkas (Termux Home vs Sandbox), registry multi-proyek, safe git sync. | ✅ Selesai |
| **06** | [`06_REPOSITORY_CHANGES.md`](blueprint/06_REPOSITORY_CHANGES.md) | Perubahan struktur minimal, isolasi `src/components/mobile/`, berkas kontrol ZLCE. | ✅ Selesai |
| **07** | [`07_WORKFLOW_DESIGN.md`](blueprint/07_WORKFLOW_DESIGN.md) | Siklus kerja 8 langkah estafet tablet tunggal, handover checklist, mitigasi LMK. | ✅ Selesai |
| **08** | [`08_SECURITY_MODEL.md`](blueprint/08_SECURITY_MODEL.md) | Model ancaman tablet bersama, zero-secret policy, isolasi kredensial Git di RAM. | ✅ Selesai |
| **09** | [`09_FAILURE_AND_RECOVERY.md`](blueprint/09_FAILURE_AND_RECOVERY.md) | Penyelarasan Kasus A–D ZLCE Core, mitigasi proses terbunuh LMK, resolusi konflik. | ✅ Selesai |
| **10** | [`10_TEST_STRATEGY.md`](blueprint/10_TEST_STRATEGY.md) | Piramida uji, verifikasi 5 invarian (I1–I5), skenario uji tablet fisik SM-T225. | ✅ Selesai |
| **11** | [`11_IMPLEMENTATION_ROADMAP.md`](blueprint/11_IMPLEMENTATION_ROADMAP.md) | Peta jalan bertahap Fase 0 hingga Fase 9, memprioritaskan Multi-AI & Tim. | ✅ Selesai |
| **12** | [`12_ARCHITECTURE_DECISIONS.md`](blueprint/12_ARCHITECTURE_DECISIONS.md) | 8 Catatan Keputusan Arsitektur (ADR-01 s.d. ADR-08) yang disetujui. | ✅ Selesai |
| **13** | [`13_COMMAND_TEMPLATES.md`](blueprint/13_COMMAND_TEMPLATES.md) | Katalog perintah berversi, label risiko (Safe/Mutating), parameter binding. | ✅ Selesai |
| **14** | [`14_MULTI_AI_TEAM_MODEL.md`](blueprint/14_MULTI_AI_TEAM_MODEL.md) | Taksonomi aktor, Context Pack portabel, branch per task, cold-start resume. | ✅ Selesai |

---

## 2. RINGKASAN EKSEKUTIF ARSITEKTUR

1. **Perangkat Target:** Samsung Galaxy Tab A7 Lite (SM-T225), 8.7", 3GB RAM, 100% input layar sentuh.
2. **Pola Kerja:** Satu aplikasi bergantian (*Single-App Flow*) tanpa ketergantungan multi-window, menjamin ketahanan terhadap pemutusan memori oleh Android LMK.
3. **PWA sebagai Hub:** PWA merakit Context Pack dan template perintah Git yang aman; eksekusi dilakukan sadar oleh pengguna di Termux via tombol salin 1-ketukan (*One-Tap Copy*).
4. **Kolaborasi Tim Estafet:** 8 anggota berbagi 1 tablet dengan atribusi identitas commit otomatis via `-c user.name=...`, branch per task (`task/TASK-xxx`), dan proteksi kredensial Git di RAM (timeout 15 menit).
5. **Kepatuhan ZLCE Core 100%:** Format dokumen kontrol, 4 Gerbang Kualitas, WAL, dan protokol Kasus A–D tidak diubah dan identik antara desktop dan tablet.
6. **Zero External Note App Dependency (ADR-09):** Obsidian/Joplin dikeluarkan dari core v4.0.0; sistem 100% mandiri, bebas beban RAM tambahan.

---

## 3. STATUS CHECKPOINT & LANGKAH BERIKUTNYA

- **P2-CP4:** Telah **DISETUJUI RESMI** oleh Pengguna pada 2026-11-04 (*"setuju Keluarkan Obsidian dari Blueprint Inti v4.0.0. Setujui Blueprint"*).
- **Gerbang Aktif:** **P2-CP5: Pemecahan Task Atomik ke dalam `TASKS.md`**.
