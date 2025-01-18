// main.js
import { html, render } from 'lit';
import '/style.css';
import './src/game.js';
import './src/home.js';

// Obtener el nombre del usuario desde localStorage
let userName = localStorage.getItem('userName') || '';

// Función para navegar entre páginas con validación
export const navigateTo = (path) => {
    // Evitar bucles infinitos
    if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
        handleRoute(path);
    }
};


// Gestión centralizada de rutas con validación
const handleRoute = (path) => {
    const isAuthenticated = !!userName; // Solo es true si hay un nombre guardado

    if (path === '/game' && !isAuthenticated) {
        // Evitar llamada recursiva: solo cambiar si es necesario
        if (window.location.pathname !== '/') {
            navigateTo('/');
        }
        return;
    }

    switch (path) {
        case '/':
            render(html`<home-page></home-page>`, document.body);
            break;
        case '/game':
            render(html`<mole-game></mole-game>`, document.body);
            break;
        default:
            // Redirigir a home si la ruta no existe o no está autorizado
            if (window.location.pathname !== '/') {
                navigateTo('/');
            }
            break;
    }
};

// Manejar el botón "atrás" del navegador
window.onpopstate = () => handleRoute(window.location.pathname);

// Inicializar la app y validar en el primer acceso
document.addEventListener('DOMContentLoaded', () => {
    handleRoute(window.location.pathname);
});

// Función para guardar el nombre del usuario
export const setUserName = (name) => {
    userName = name;
    localStorage.setItem('userName', name);
};
