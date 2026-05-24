/**
 * Shared TypeScript types and helpers for the ExtendScript host code.
 */

/**
 * ExtendScript Error objects expose `line` and `fileName` properties
 * in addition to the standard `message`. Use this when logging caught
 * errors so we don't need `as any` casts at each call site.
 */
export interface AEError extends Error {
  line?: number;
  fileName?: string;
}

/**
 * Returns the currently active item as a `CompItem`, or `undefined`
 * if there is no active item or it is not a composition.
 *
 * Centralizes the `instanceof CompItem` narrowing so callers can use
 * comp-only properties (`selectedLayers`, `workAreaStart`, etc.) without
 * casting `app.project.activeItem` to `any`.
 */
export function getActiveComp(): CompItem | undefined {
  if (!app.project) {
    return undefined;
  }
  const item = app.project.activeItem;
  if (item instanceof CompItem) {
    return item;
  }
  return undefined;
}
