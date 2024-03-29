import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: './index.html'
        }
      },
      // definisci la mappatura delle immagini
      assetsInlineLimit: 0,
      assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif'],
      // copia le immagini nella cartella dist/assets
      assetsOutputPath: 'assets',
    },
    resolve: {
      alias: {
        Interface: path.resolve(__dirname, './src/interface'),
        Context: path.resolve(__dirname, './src/context'),
        Components: path.resolve(__dirname, './src/components'),
        Hooks: path.resolve(__dirname, './src/hooks')
      },
    },
    plugins: [react(), tsconfigPaths()],
    // https://vitejs.dev/config/server-options.html
    server: {
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/generate': {
          target: `${env.VITE_API}/generate`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/generate/, ''),
        }
      },
    },
  }
})