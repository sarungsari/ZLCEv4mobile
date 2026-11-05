#!/usr/bin/env python3
"""ZLCE Automated Test Suite
Runs validation checks across TypeScript types, canonical templates, examples, and script synchronization.
"""
import hashlib
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def file_sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()


def run_step(name, cmd, cwd=ROOT):
    print(f"==> [TEST] {name} ...", end=" ", flush=True)
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=60)
        if r.returncode == 0:
            print("PASS")
            return True, r.stdout
        else:
            print(f"FAIL (exit {r.returncode})")
            if r.stdout:
                print(r.stdout)
            if r.stderr:
                print(r.stderr)
            return False, r.stderr or r.stdout
    except Exception as e:
        print(f"ERROR: {e}")
        return False, str(e)


def main():
    print("=" * 60)
    print("ZLCE Studio v3.2.2 Automated Test Runner")
    print("=" * 60)

    failures = 0

    # 1. TypeScript Static Check
    ok, _ = run_step("TypeScript Type Check (tsc --noEmit)", ["npx", "tsc", "--noEmit"])
    if not ok:
        failures += 1

    # 2. Python zlce-check on examples/
    ok, _ = run_step(
        "ZLCE Check on examples/SESSION_STATE.example.md",
        ["python3", "scripts/zlce-check.py", "examples/", "--state", "examples/SESSION_STATE.example.md", "--no-git"]
    )
    if not ok:
        failures += 1

    # 3. Snapshot Script Help Flag
    ok, _ = run_step(
        "ZLCE Snapshot Help Flag (zlce-snapshot.sh --help)",
        ["bash", "scripts/zlce-snapshot.sh", "--help"]
    )
    if not ok:
        failures += 1

    # 4. Canonical Script Synchronization Check
    print("==> [TEST] Canonical Script Integrity Check ...", end=" ", flush=True)
    sync_errors = []
    pairs = [
        ("scripts/zlce-check.py", "scripts/zlce/zlce-check.py"),
        ("scripts/zlce-check.py", "zlce-starter-kit/scripts/zlce-check.py"),
        ("scripts/zlce-collect.py", "scripts/zlce/zlce-collect.py"),
        ("scripts/zlce-collect.py", "zlce-starter-kit/scripts/zlce-collect.py"),
        ("scripts/zlce-snapshot.sh", "scripts/zlce/zlce-snapshot.sh"),
        ("scripts/zlce-snapshot.sh", "zlce-starter-kit/scripts/zlce-snapshot.sh"),
        ("LANDING_PROMPT.md", "zlce-starter-kit/LANDING_PROMPT.md"),
        ("HANDOVER_PROMPT.md", "zlce-starter-kit/HANDOVER_PROMPT.md"),
    ]
    for src, dest in pairs:
        src_path = os.path.join(ROOT, src)
        dest_path = os.path.join(ROOT, dest)
        if not os.path.exists(dest_path):
            sync_errors.append(f"Missing copy: {dest}")
        elif file_sha256(src_path) != file_sha256(dest_path):
            sync_errors.append(f"Hash mismatch: {src} != {dest}")

    if sync_errors:
        print(f"FAIL ({len(sync_errors)} mismatches)")
        for err in sync_errors:
            print(f"    - {err}")
        failures += 1
    else:
        print("PASS")

    # 5. .gitattributes check
    print("==> [TEST] .gitattributes Check ...", end=" ", flush=True)
    if os.path.exists(os.path.join(ROOT, ".gitattributes")):
        print("PASS")
    else:
        print("FAIL (missing .gitattributes)")
        failures += 1

    # 6. TC-P3-02: Context Budget Adapter & State Health Integrity Check
    ok, _ = run_step(
        "TC-P3-02 Context Budget Adapter & State Health Integrity Check",
        ["npx", "tsx", "-e", """
import fs from 'fs';
import { validateSessionStateIntegrity } from './src/utils/sessionStateValidator';
import { MODEL_BUDGET_PROFILES, calculateTokenSafety, pruneContextForBudget } from './src/utils/tokenBudgetAdapter';

// 1. Verify 6 profiles (including deepseek and freebuff)
const presets = ['gemini-1m', 'claude-30k', 'gpt-128k', 'deepseek-64k', 'compact-8k', 'freebuff-4k'];
for (const p of presets) {
  if (!MODEL_BUDGET_PROFILES[p]) throw new Error(`Missing profile: ${p}`);
}

// 2. Verify State Health (0 errors)
const sessionContent = fs.readFileSync('SESSION_STATE.md', 'utf8');
const integrity = validateSessionStateIntegrity(sessionContent);
if (!integrity.valid || integrity.errorsCount > 0) {
  throw new Error(`State Health failed with ${integrity.errorsCount} errors: ${integrity.issues.map(i => i.message).join('; ')}`);
}

// 3. Test pruning behavior (Acceptance Criteria 3: Compact & FreeBuff)
const testMd = `# CONTEXT PACK\\n## 1. MANDAT TUGAS AKTIF\\n- TASK-014\\n## 2. JANGKAR KEBENARAN\\nTier 0\\n## 3. STATUS TERKINI & WAL\\nWAL data\\n## 7. LOG AUDIT\\n* **2026-11-04 18:00 WIB:** Log 1\\n* **2026-11-04 17:00 WIB:** Log 2\\n* **2026-11-04 16:00 WIB:** Log 3\\n* **2026-11-04 15:00 WIB:** Log 4\\n* **2026-11-04 14:00 WIB:** Log 5\\n`;
const prunedCompact = pruneContextForBudget(testMd, 'compact-8k');
const prunedFreeBuff = pruneContextForBudget(testMd, 'freebuff-4k');
if (!prunedCompact.wasPruned || !prunedFreeBuff.wasPruned) {
  throw new Error('Pruning failed to activate on compact-8k or freebuff-4k preset');
}
if (!prunedFreeBuff.prunedMarkdown.includes('TASK-014') || !prunedFreeBuff.prunedMarkdown.includes('Tier 0')) {
  throw new Error('FreeBuff pruning damaged active task or Tier 0 anchors');
}
console.log('TC-P3-02 verified successfully with DeepSeek and FreeBuff.');
"""]
    )
    # 7. TC-P3-03: Structured Multi-Model Prompt Generator & Anti-Placeholder Rule Check
    ok, _ = run_step(
        "TC-P3-03 Structured Multi-Model Prompt Generator & Anti-Placeholder Check",
        ["npx", "tsx", "-e", """
import fs from 'fs';
import { parseSessionStateMarkdown } from './src/utils/markdownParser';
import { TEAM_MEMBERS } from './src/data/teamMembers';
import { generateStructuredPrompt, PROMPT_ARCHETYPES, getModelStopToken } from './src/utils/promptGenerator';

const sessionContent = fs.readFileSync('SESSION_STATE.md', 'utf8');
const session = parseSessionStateMarkdown(sessionContent);
const member = TEAM_MEMBERS[0];
const task = {
  id: 'TASK-015',
  name: 'Prompt Generator Multi-Model Terstruktur',
  dependencies: 'TASK-014',
  status: 'READY' as const,
  evidence: '-',
  approved: '-'
};

// 1. Verify all 4 Archetypes generate successfully
const archetypes = ['task-execution', 'landing', 'review', 'handover'] as const;
for (const arch of archetypes) {
  const result = generateStructuredPrompt({
    archetype: arch,
    task,
    sessionState: session,
    activeMember: member,
    targetAi: 'claude',
    tokenBudgetPreset: 'claude-30k'
  });

  if (!result.fullPrompt || result.fullPrompt.length < 200) {
    throw new Error(`Empty or trivial prompt generated for archetype: ${arch}`);
  }

  // Acceptance Criteria 2: Format enforces Schema-before-Data and anti-placeholder
  if (!result.fullPrompt.includes('SCHEMA-BEFORE-DATA') && !result.fullPrompt.includes('OUTPUT SCHEMA')) {
    throw new Error(`Archetype ${arch} failed to enforce Schema-before-Data`);
  }
  if (!result.fullPrompt.includes('PELARANGAN KODE PLACEHOLDER') && !result.fullPrompt.includes('ANTI-PLACEHOLDER')) {
    throw new Error(`Archetype ${arch} failed to enforce anti-placeholder rules`);
  }
  if (!result.fullPrompt.includes('min-h-[44px]') && !result.fullPrompt.includes('44x44px')) {
    throw new Error(`Archetype ${arch} missing touch target >= 44px rule`);
  }
}

// 2. Verify Stop Tokens for specific providers
const providers = ['claude', 'gemini', 'chatgpt', 'deepseek'] as const;
for (const prov of providers) {
  const res = generateStructuredPrompt({
    archetype: 'task-execution',
    task,
    sessionState: session,
    activeMember: member,
    targetAi: prov,
    tokenBudgetPreset: prov === 'gemini' ? 'gemini-1m' : prov === 'deepseek' ? 'deepseek-64k' : 'claude-30k'
  });
  const expectedToken = getModelStopToken(prov);
  if (!res.fullPrompt.includes(expectedToken)) {
    throw new Error(`Provider ${prov} missing required stop token: ${expectedToken}`);
  }
  if (!res.fullPrompt.includes('TASK-015')) {
    throw new Error(`Provider ${prov} prompt missing active task reference`);
  }
}

console.log('TC-P3-03 verified successfully across all 4 archetypes and 4 AI providers.');
"""]
    )
    if not ok:
        failures += 1

    print("=" * 60)
    if failures == 0:
        print("RESULT: ALL TESTS PASSED (7/7 checks OK)")
        print("=" * 60)
        return 0
    else:
        print(f"RESULT: {failures} TEST(S) FAILED")
        print("=" * 60)
        return 1


if __name__ == "__main__":
    sys.exit(main())
