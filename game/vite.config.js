import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi PWA con Vite',
        short_name: 'MiPWA',
        description: 'Una aplicación web progresiva creada con Vite y JavaScript',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'test.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'test.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
            },
          },
        ],
      },
    }),
  ],
});
