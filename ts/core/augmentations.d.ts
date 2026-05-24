// Module augmentations for surfaces missing from types-for-adobe.
//
// These declarations extend ambient interfaces defined in
// node_modules/types-for-adobe so the rest of the codebase can avoid
// scattered `as any` casts. Keep additions here narrow and well-justified:
// each augmentation should map to a real ExtendScript runtime surface that
// the upstream types omit.

// ---------------------------------------------------------------------------
// RenderQueueItem.onStatusChanged
// ---------------------------------------------------------------------------
// ExtendScript exposes a settable `onStatusChanged` callback on every render
// queue item (separate from the documented `onStatus` string field). It fires
// whenever the item's render status transitions. types-for-adobe ships the
// `onStatus` field but not this callback.
//
// Used in: ts/utils/sourceHelper.ts, ts/utils/audioSourceHelper.ts
interface RenderQueueItem {
  onStatusChanged?: () => void;
}

// ---------------------------------------------------------------------------
// ExternalObject.AdobeXMPScript
// ---------------------------------------------------------------------------
// The shared XMPScript.d.ts in types-for-adobe already augments
// ExternalObjectConstructor with `AdobeXMPScript`, but ts/types.d.ts does not
// reference that file. Re-declaring it here keeps the augmentation localised
// to our project and avoids editing types.d.ts to pull in additional XMP
// declarations we don't otherwise rely on.
//
// Used in: ts/utils/XMPParser.ts
interface ExternalObjectConstructor {
  AdobeXMPScript: ExternalObject | undefined;
}
