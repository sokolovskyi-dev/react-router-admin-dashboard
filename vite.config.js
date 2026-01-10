import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const base = env.VITE_BASE || '/';

  return {
    base,
    plugins: [
      react(),
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{js,jsx}"',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
