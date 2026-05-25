#!/usr/bin/env bash
# End-to-end export test for the TS bundle.
#
# Opens a corpus .aep, finds a target comp, exports it as Lottie JSON via
# bm_compsManager.renderComposition (same entry point the panel uses).
# Writes the output to tests/export/output/<bundle>-<comp>.json.
#
# Env:
#   CORPUS_AEP    — required; full path to .aep file
#   TARGET_COMP   — comp name (default "Bm_fontAnim")
#   USE_JS_BUNDLE — "1" to test the original JS bundle (baseline);
#                   omit to test the TS bundle (compared)
#   AE_APP        — default "Adobe After Effects 2025"
#   TIMEOUT_SECS  — default 120 (covers slow font-heavy renders)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DRIVER="$REPO_ROOT/tests/export/driver.jsx"
OUTPUT_DIR="$REPO_ROOT/tests/export/output"
REPORT="$OUTPUT_DIR/export-report.json"
AE_APP="${AE_APP:-Adobe After Effects 2025}"
TIMEOUT_SECS="${TIMEOUT_SECS:-120}"
TARGET_COMP="${TARGET_COMP:-Bm_fontAnim}"
USE_JS_BUNDLE="${USE_JS_BUNDLE:-0}"

# Default to the known fixture if CORPUS_AEP isn't set
CORPUS_AEP="${CORPUS_AEP:-$HOME/Downloads/BODYMOVIN_Github_2025.aep}"

if [ ! -f "$CORPUS_AEP" ]; then
  echo "FAIL: corpus .aep not found at $CORPUS_AEP"
  echo "Set CORPUS_AEP=/path/to/file or drop the .aep at the default location."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
rm -f "$REPORT"

if [ "$USE_JS_BUNDLE" != "1" ]; then
  echo "==> Building TS bundle"
  (cd "$REPO_ROOT" && npm run build:ts) >/dev/null
fi

echo "==> Driving $AE_APP"
echo "    Corpus: $CORPUS_AEP"
echo "    Comp:   $TARGET_COMP"
echo "    Bundle: $([ "$USE_JS_BUNDLE" = "1" ] && echo "JS (original)" || echo "TS (ported)")"

# osascript-spawned AE doesn't inherit our shell env, so $.getenv() returns
# nothing inside the driver. Plant the values on $.global before evalFile-ing
# the driver; driver reads them off $.global instead of $.getenv.
BOOTSTRAP="\$.global._BM_USE_JS_BUNDLE='$USE_JS_BUNDLE'; \$.global._BM_CORPUS_AEP='$CORPUS_AEP'; \$.global._BM_TARGET_COMP='$TARGET_COMP'; \$.evalFile(new File('$DRIVER'));"
osascript -e "tell application \"$AE_APP\" to activate" \
          -e "tell application \"$AE_APP\" to DoScript \"$BOOTSTRAP\" with override"

# The driver writes the report immediately after triggering render, then
# returns control to AE so app.scheduleTask callbacks can drive the actual
# export. Two polls: first for the report (driver done), then for the
# output JSON (render done).
echo "==> Waiting for export-report.json (driver finishes quickly)"
for ((i = 0; i < 30; i++)); do
  if [ -f "$REPORT" ]; then break; fi
  sleep 0.5
done

if [ ! -f "$REPORT" ]; then
  echo "FAIL: no export-report.json — driver didn't finish setup"
  exit 1
fi

# Pull output path from the report to know what to wait for
EXPECTED_OUTPUT=$(jq -r '.output_path // empty' "$REPORT")
RENDER_TRIGGERED=$(jq -r '.render_triggered' "$REPORT")
DRIVER_EXCEPTION=$(jq -r '.exception // empty' "$REPORT")

if [ -n "$DRIVER_EXCEPTION" ]; then
  echo "FAIL during driver setup: $DRIVER_EXCEPTION"
  cat "$REPORT"
  exit 1
fi

if [ "$RENDER_TRIGGERED" != "true" ]; then
  echo "FAIL: render not triggered. Driver report:"
  cat "$REPORT"
  exit 1
fi

if [ -z "$EXPECTED_OUTPUT" ]; then
  echo "FAIL: driver didn't record output path"
  exit 1
fi

echo "==> Render triggered. Polling for output JSON: $EXPECTED_OUTPUT"
echo "    (timeout ${TIMEOUT_SECS}s, AE's scheduleTask drives the async render)"
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
  echo "FAIL: no output JSON at $EXPECTED_OUTPUT after ${TIMEOUT_SECS}s"
  echo "(render-triggered=true but pipeline never produced output)"
  exit 1
fi

OUTPUT_SIZE=$(stat -f %z "$EXPECTED_OUTPUT" 2>/dev/null || stat -c %s "$EXPECTED_OUTPUT")
echo "PASS: $EXPECTED_OUTPUT ($OUTPUT_SIZE bytes)"
