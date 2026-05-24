#!/usr/bin/env bash
# Smoke test for the TS bundle.
#
# Builds the bundle, launches Adobe After Effects via osascript, has AE
# eval tests/smoke/driver.jsx, then verifies the resulting smoke-report.json
# shows the expected $.__bodymovin.* namespace shape.
#
# Requirements: macOS, Adobe After Effects installed, jq, npm.
# Override AE version with: AE_APP="Adobe After Effects 2024" tests/smoke/run.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DRIVER="$REPO_ROOT/tests/smoke/driver.jsx"
OUTPUT_DIR="$REPO_ROOT/tests/smoke/output"
OUTPUT="$OUTPUT_DIR/smoke-report.json"
FAIL_MARKER="$OUTPUT_DIR/smoke-report.fail"
AE_APP="${AE_APP:-Adobe After Effects 2025}"
TIMEOUT_SECS="${TIMEOUT_SECS:-60}"

# --- Setup
mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT" "$FAIL_MARKER"

echo "==> Building TS bundle"
(cd "$REPO_ROOT" && npm run build:ts) >/dev/null 2>&1 || {
  echo "FAIL: build:ts errored"
  (cd "$REPO_ROOT" && npm run build:ts)
  exit 1
}

if [ ! -f "$REPO_ROOT/bundle/jsx-ts/bodymovin.bundle.jsx" ]; then
  echo "FAIL: bundle not at expected path"
  exit 1
fi

# --- Run driver in AE
echo "==> Running driver.jsx in $AE_APP"
osascript - <<EOF
tell application "$AE_APP"
  activate
  DoScript file (POSIX file "$DRIVER")
end tell
EOF

# --- Wait for report (DoScript is fire-and-forget; driver writes the file)
echo "==> Waiting for smoke-report.json (timeout ${TIMEOUT_SECS}s)"
for ((i = 0; i < TIMEOUT_SECS * 2; i++)); do
  if [ -f "$OUTPUT" ] || [ -f "$FAIL_MARKER" ]; then
    break
  fi
  sleep 0.5
done

if [ -f "$FAIL_MARKER" ]; then
  echo "FAIL: driver wrote .fail marker:"
  cat "$FAIL_MARKER"
  exit 1
fi

if [ ! -f "$OUTPUT" ]; then
  echo "FAIL: no smoke-report.json after ${TIMEOUT_SECS}s — driver may have crashed or AE never ran the script"
  exit 1
fi

# --- Parse + report
echo "==> Report:"
cat "$OUTPUT"
echo

EXCEPTION=$(jq -r '.exception // empty' "$OUTPUT")
BUNDLE_LOADED=$(jq -r '.bundle_loaded' "$OUTPUT")
MISSING_COUNT=$(jq '.expected_keys_missing | length' "$OUTPUT")
PRESENT=$(jq -r '.expected_keys_present' "$OUTPUT")
TOTAL=$(jq -r '.expected_keys_present + (.expected_keys_missing | length)' "$OUTPUT")
KEY_COUNT=$(jq -r '.namespace_key_count' "$OUTPUT")
ELAPSED=$(jq -r '.elapsed_ms' "$OUTPUT")

FAIL=0

if [ -n "$EXCEPTION" ]; then
  echo "FAIL: exception during bundle load: $EXCEPTION"
  FAIL=1
fi

if [ "$BUNDLE_LOADED" != "true" ]; then
  echo "FAIL: bundle did not load"
  FAIL=1
fi

if [ "$MISSING_COUNT" -gt 0 ]; then
  echo "FAIL: $MISSING_COUNT expected keys missing:"
  jq -r '.expected_keys_missing[]' "$OUTPUT" | sed 's/^/   /'
  FAIL=1
fi

if [ "$FAIL" -eq 1 ]; then
  exit 1
fi

echo "PASS: $PRESENT/$TOTAL expected keys present, $KEY_COUNT total in namespace, ${ELAPSED}ms"
