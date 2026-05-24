// The original bundle/jsx/initializer.jsx evalFile'd ~130 sibling .jsx files
// in dependency order, then set up $.__bodymovin and the Function.prototype.bm_bind
// polyfill. In the rollup-bundled world, all of that is handled by ts/index.ts
// (namespace setup, polyfill, and the wiring assignments). This file remains
// only because index.ts imports it as a side-effect module — keeping the import
// stable while removing the obsolete logic.
