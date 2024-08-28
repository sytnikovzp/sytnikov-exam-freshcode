import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    strictPort: true,
    host: true,
  },
  build: {
    target: browserslistToEsbuild([
      '>0.2%',
      'not dead',
      'not ie <= 11',
      'not op_mini all',
    ]),
  },
});
