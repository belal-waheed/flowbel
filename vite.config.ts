import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'logo.svg',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'icon-maskable.png',
        'og-image.png',
        'robots.txt',
        'sitemap.xml',
        'llms.txt',
        'llms-full.txt'
      ],
      manifest: {
        name: 'Flowbel - إدارة مالية واعية وقرارات يومية متزنة',
        short_name: 'Flowbel',
        description: 'Mindful budgeting and practical decision clarity. Local-first envelope budgeting and practical decision playbooks.',
        theme_color: '#F8F5EE',
        background_color: '#F8F5EE',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,txt,xml}']
      }
    })
  ]
});
