import '/style.css';
import { navigateTo } from '/src/router.js';


document.addEventListener('DOMContentLoaded', () => {
    navigateTo(window.location.pathname);
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service Worker registrado con éxito');
        }).catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
        });
    });
}
