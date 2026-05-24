/**
 * Polyfills index file
 * Imports all polyfills to ensure ExtendScript compatibility
 * These polyfills provide modern JavaScript methods in the ES3/ES5 environment
 */

// Import all polyfills (they modify prototypes directly)
import "./polyfills.string";
import "./polyfills.object";
import "./polyfills.array";
import "./polyfills.math";

// No exports needed - polyfills modify global prototypes
