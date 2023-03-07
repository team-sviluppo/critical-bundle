/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
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
      proxy: {
        '/foo': 'http://localhost:4567',
        '/generate': {
          target: `${env.VITE_API}/generate`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/generate/, ''),
        }
      },
    },
  }
})