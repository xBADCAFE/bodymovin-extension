import typescript from '@rollup/plugin-typescript';

export default {
  input: 'ts/index.ts',
  output: {
    file: 'bundle/jsx-ts/bodymovin.bundle.jsx',
    format: 'iife',
    name: 'BodymovinBundle',
    sourcemap: false,
    banner: '// Generated from ts/ — do not edit by hand.',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: false,
    }),
  ],
};
