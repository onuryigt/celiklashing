import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Not: daha önce hem `vite.config.js` hem `vite.config.ts` vardı ve farklı
// ayarlar içeriyorlardı (biri alias, diğeri `external`). `.js` olan silindi;
// geçerli yapılandırma yalnızca bu dosya.
export default defineConfig({
  plugins: [react()],
  build: {
    // Firebase SDK'sı tek başına paketin yarısından fazlasıydı. Ayrı parçalara
    // bölününce ana sayfa Firebase'i beklemeden açılıyor.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
