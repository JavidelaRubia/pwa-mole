import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';


export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
    },
    test: {
        environment: 'jsdom', 
        globals: true,        
        setupFiles: './test/setup.js', 
      },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Mole Game',
                short_name: 'Mole Game',
                description: 'A simple mole game',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: '/mole-icon.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/mole-icon.png',
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
