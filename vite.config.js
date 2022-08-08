import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: '/src/assets/js/main.js',
      output: {
        // ビルド時にcssと画像を '[拡張子名]/[ファイル名].[ハッシュ値].[拡張子名]' で生成
        assetFileNames: 'assets/css/[name].[ext]',
        // ビルド時にjsを 'js/[ファイル名].[ハッシュ値].js' で生成
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      }
    },
  },
})

