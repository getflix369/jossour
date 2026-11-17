import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'منصة جسور — المجلس الأعلى للسلطة القضائية',
        short_name: 'جسور',
        description: 'منصة اللقاءات التواصلية عن بعد لطلبة الماستر والدكتوراه',
        theme_color: '#041014',
        background_color: '#041014',
        display: 'standalone',
        dir: 'rtl',
        lang: 'ar'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
