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

    print("=" * 60)
    if failures == 0:
        print("RESULT: ALL TESTS PASSED (5/5 checks OK)")
        print("=" * 60)
        return 0
    else:
        print(f"RESULT: {failures} TEST(S) FAILED")
        print("=" * 60)
        return 1


if __name__ == "__main__":
    sys.exit(main())
