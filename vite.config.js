import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Vite is a browser app (not a React Server Components bundler); this harmless
        // upstream directive warning is not applicable to the client-only analytics entry.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.id?.includes('@vercel/analytics')) return;
        warn(warning);
      },
    },
  },
});
