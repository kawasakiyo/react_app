import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRAの homepage: "./" に対応
  server: {
    port: 3000, // CRAのデフォルトポート
    open: true
  },
  build: {
    outDir: 'build', // CRAのデフォルト出力ディレクトリ名
  }
})
