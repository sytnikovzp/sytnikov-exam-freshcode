import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';
import browserslistToEsbuild from 'browserslist-to-esbuild';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(dirname, '../'));

  console.log('Loaded from .env variables:', env);

  return {
    envPrefix: 'SH_',
    plugins: [react(), envCompatible({ path: '../' })],
    server: {
      port: parseInt(env.VITE_PORT) || 5000,
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
  };
});
