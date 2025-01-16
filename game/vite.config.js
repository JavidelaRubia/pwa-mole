import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Mi PWA con Vite',
                short_name: 'MiPWA',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/test.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/test.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                // Precarga todos los archivos estáticos
                globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
                runtimeCaching: [
                    {
                        urlPattern: /^.*\.(js|css|html|png|svg|jpg|jpeg|gif|ico)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'offline-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
                            },
                        },
                    },
                ],
                // Activar precarga total de recursos al instalar
                precacheManifestFilename: 'precache-manifest.[manifestHash].js',
            },
        }),
    ],
});
