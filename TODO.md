# TODO

Tracking remaining work on the TS port (`ts-port` branch).

## Now — blocks everything else

- [ ] **Phase 1.5: test harness** (Task #9)
  - Build `.aep` corpus (covers shapes, text, expressions, masks, track mattes, image layers, precomps, audio)
  - `aerender` runner that drives the current JS bundle on the corpus and snapshots Lottie JSON output (baseline)
  - Same runner against the TS bundle (`bundle/jsx-ts/bodymovin.bundle.jsx`) → diff vs baseline
  - Lottie-aware semantic diff: sorted keys, float tolerance (~1e-6, configurable per field), generated-ID normalization, "acceptable diff" allowlist
  - Without this, none of the port is verified

## Soon — enables Phase 2

- [ ] **CEP loader update**
  - Current `bundle/jsx/initializer.jsx` evalFiles ~130 individual .jsx files
  - New loader needs to evalFile vendored polyfills only (`JSON.jsx`, `esprima.jsx`, `escodegen.jsx`) then evalFile `bundle/jsx-ts/bodymovin.bundle.jsx`
  - Flip CEP to use the new loader once test harness confirms parity

- [ ] **Phase 2 feature: dotLottie exporter** (Task #15)
  - New `ts/exporters/dotLottieExporter.ts` per [dotlottie-spec v1](https://github.com/dotlottie/dotlottie-spec)
  - Zip container: `manifest.json` + `animations/<id>.json` + `images/` + `audio/` + `themes/`
  - `jszip@3` already in package.json
  - Redirect asset bundling from disk-folder to zip entries
  - Add `bm_settingsHelper.shouldExportAsDotLottie` + panel UI toggle (or expose only via Phase 2 standalone API)

- [ ] **Phase 2: standalone API + CEP rip-out**
  - Design `render(comp, settings) → exportData` shape (collapse the 45+ `evalScript`-called globals into one entry)
  - Decide bundling story for `bundle/server/` (Express on :24801 — image compression, CanvasKit, file proxy)
  - Ship `bodymovin-standalone.jsx` consumable like `render-script`

## Pre-existing bugs (preserved verbatim, fix after harness)

- [ ] **`ts/utils/effectsHelper.ts:558-561`** — duplicate `dropDownControl` branch. Second condition was likely meant to be `angleControl` or `checkboxControl`. TODO marker in source.
- [ ] **`ts/utils/effectsHelper.ts:172`** — `exportMaskIndexControl` emits `ty: effectTypes.layerIndex` (10) instead of `maskIndex` (11). TODO marker in source.

## Type-quality cleanups (defer until needed)

Audit baseline: 121 `as any` → 93 after Wave 1-3 cleanup. Remaining ~93 are mostly Category A (necessary). Worth more work eventually:

- [ ] **`extendPrototype` pseudo-class migration** — `(X as any)` constructor casts across `reports/` factories (~10-15 sites). Fixing properly means migrating to ES6 `class`. Affects most of `reports/layers/*`, `reports/layers/shapes/*`, `reports/layerStyles/*`, `PropertyFactory.ts`.
- [ ] **`bannerExporter.ts`** — 8.0 `:any` per 100 LOC, worst small file ratio
- [ ] **`layerStylesHelper.ts`** — 11.5 `:any` per 100 LOC, worst overall ratio
- [ ] **`presetHelper.ts:13`** — `let myComp: any = app.project.activeItem` left as-is; rewriting to use `getActiveComp()` requires restructuring the if/else that creates a new comp if none active
- [ ] Replace inlined `effectsMessageTypes.ts` literals back to enum refs done; verify no regressions

## Distribution / packaging decisions (when settling phase 1)

- [ ] **Should `bundle/jsx-ts/bodymovin.bundle.jsx` be committed?** Currently committed for easy distribution. Could `.gitignore` it and build on demand (cleaner diffs but breaks fork-and-use workflow).
- [ ] **package-lock.json policy** — not present in repo; npm install creates one. Decide: commit (reproducibility) or ignore (matches original convention).
- [ ] **README update** — new `npm run build:ts` + `npm run typecheck` scripts undocumented

## Polish (low priority)

- [ ] **Circular dep warning** — `shapeGroupReport ↔ shapeCollectionReport ↔ shapeReportHelper`. Audited as safe (all cross-refs are call-time). Rollup warns on every build. Could break the cycle by extracting shared types to a fourth module, or document and silence.
- [ ] **Replace vendored `JSON.jsx` Crockford polyfill** — native `JSON` exists in AE 13.0+. Swap requires golden-diff verification because number formatting will shift. Possibly use `JSON3` as a middle option.
- [ ] **`removeComments: true` in tsconfig** — currently strips TODOs from bundle (intentional). Reconsider if you want TODOs to survive into compiled output for runtime debug.
- [ ] **`renderManager.ts:217` — `var` shadow** in `getRenderingComp`. Benign, scope-deviation only.

## Done

- ✅ Phase 1: port 130+ .jsx files to TS (`bcb557c`)
- ✅ Load-order bug: convert module-top captures to ES imports (52 files)
- ✅ Wave A: aggregate exports added to 21 producer files
- ✅ Cleanups: `effectsMessageTypes` enum refs restored, `compareShapeWithBox` restored, `LIGHT_LAYER` added to builderTypes (`64ae7eb`)
- ✅ Spot-checks: PropertyFactory + keyframeHelper + renderManager confirmed byte-identical to source
- ✅ Type cleanup Wave 1-3: module augmentation .d.ts + `AEError` interface + `getActiveComp` helper
- ✅ TODO markers for 2 effectsHelper bugs (`7ee5672`)
- ✅ presetHelper double-cast cleanup
