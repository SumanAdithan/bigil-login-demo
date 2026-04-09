import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  clean: true,
  sourcemap: true,
  noExternal: [
    '@atlas-ds/js',
    '@atlas-ds/tokens',
    '@atlas-ds/css'
  ],
  // This ensures CSS is bundled if imported
  loader: {
    '.css': 'css',
  },
  // We want to keep React external
  external: ['react', 'react-dom'],
});
