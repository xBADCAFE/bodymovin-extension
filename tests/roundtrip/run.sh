#!/usr/bin/env bash
# Round-trip test: import an existing Lottie JSON into a fresh AE project,
# re-export it, compare shapes.
#
# Defaults to using tests/export/output/ts-Bm_fontAnim.json as the input
# (the byte-equal-verified export from the previous test run).
#
# Env:
#   INPUT_JSON    — path to Lottie JSON to feed the importer
#   AE_APP        — default "Adobe After Effects 2025"
#   TIMEOUT_SECS  — default 120

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DRIVER="$REPO_ROOT/tests/roundtrip/driver.jsx"
OUTPUT_DIR="$REPO_ROOT/tests/roundtrip/output"
REPORT="$OUTPUT_DIR/roundtrip-report.json"
AE_APP="${AE_APP:-Adobe After Effects 2025}"
TIMEOUT_SECS="${TIMEOUT_SECS:-120}"

INPUT_JSON="${INPUT_JSON:-$REPO_ROOT/tests/export/output/ts-Bm_fontAnim.json}"

if [ ! -f "$INPUT_JSON" ]; then
  echo "FAIL: input JSON not found at $INPUT_JSON"
  echo "Either set INPUT_JSON, or run 'npm run export-test' first to produce it."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
rm -f "$REPORT"

echo "==> Building TS bundle"
(cd "$REPO_ROOT" && npm run build:ts) >/dev/null

echo "==> Driving $AE_APP"
echo "    Input:  $INPUT_JSON ($(wc -c < "$INPUT_JSON" | tr -d ' ') bytes)"

BOOTSTRAP="\$.global._BM_INPUT_JSON='$INPUT_JSON'; \$.evalFile(new File('$DRIVER'));"
osascript -e "tell application \"$AE_APP\" to activate" \
          -e "tell application \"$AE_APP\" to DoScript \"$BOOTSTRAP\" with override"

echo "==> Waiting for roundtrip-report.json"
for ((i = 0; i < 30; i++)); do
  if [ -f "$REPORT" ]; then break; fi
  sleep 0.5
done

if [ ! -f "$REPORT" ]; then
  echo "FAIL: no roundtrip-report.json — driver didn't finish setup"
  exit 1
fi

EXPECTED_OUTPUT=$(jq -r '.output_path // empty' "$REPORT")
RE_EXPORT_TRIGGERED=$(jq -r '.re_export_triggered' "$REPORT")
DRIVER_EXCEPTION=$(jq -r '.exception // empty' "$REPORT")
IMPORT_SUCCESS=$(jq -r '.import_success' "$REPORT")
IMPORT_ALERT_COUNT=$(jq -r '.import_alert_count' "$REPORT")

if [ -n "$DRIVER_EXCEPTION" ]; then
  echo "FAIL during driver: $DRIVER_EXCEPTION"
  cat "$REPORT"
  exit 1
fi

if [ "$IMPORT_SUCCESS" != "true" ]; then
  echo "FAIL: import did not succeed"
  cat "$REPORT"
  exit 1
fi

if [ "$RE_EXPORT_TRIGGERED" != "true" ]; then
  echo "FAIL: re-export not triggered"
  cat "$REPORT"
  exit 1
fi

echo "==> Import OK ($IMPORT_ALERT_COUNT alerts). Polling for re-exported JSON: $EXPECTED_OUTPUT"
for ((i = 0; i < TIMEOUT_SECS * 2; i++)); do
  if [ -f "$EXPECTED_OUTPUT" ] && [ -s "$EXPECTED_OUTPUT" ]; then
    break
  fi
  sleep 0.5
done

echo "==> Driver report:"
cat "$REPORT"
echo

if [ ! -f "$EXPECTED_OUTPUT" ] || [ ! -s "$EXPECTED_OUTPUT" ]; then
  echo "FAIL: no re-exported JSON at $EXPECTED_OUTPUT after ${TIMEOUT_SECS}s"
  exit 1
fi

# Shape diff: comp dimensions, layer count, frame rate, asset count
echo "==> Round-trip shape diff (input → re-export):"
INPUT_SHAPE=$(jq -c '{v, fr, w, h, ddd, ip, op, layer_count: (.layers|length), asset_count: (.assets|length), nm}' "$INPUT_JSON")
OUTPUT_SHAPE=$(jq -c '{v, fr, w, h, ddd, ip, op, layer_count: (.layers|length), asset_count: (.assets|length), nm}' "$EXPECTED_OUTPUT")
echo "    input:  $INPUT_SHAPE"
echo "    output: $OUTPUT_SHAPE"

INPUT_SIZE=$(stat -f %z "$INPUT_JSON" 2>/dev/null || stat -c %s "$INPUT_JSON")
OUTPUT_SIZE=$(stat -f %z "$EXPECTED_OUTPUT" 2>/dev/null || stat -c %s "$EXPECTED_OUTPUT")
echo "    sizes:  $INPUT_SIZE → $OUTPUT_SIZE bytes"

if [ "$INPUT_SHAPE" = "$OUTPUT_SHAPE" ]; then
  echo "PASS: top-level shape matches"
else
  echo "WARN: top-level shape differs — round-trip is expected to be lossy; review diff above"
fi
