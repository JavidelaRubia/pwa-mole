const routes = {
    "/": "/src/views/login.html",
    "/game": "/src/views/game.html"
};

export const navigateTo = (path) => {
    history.pushState({}, "", path);
    loadRoute(path);
};

const loadRoute = async (path) => {
    const route = routes[path] || routes["/"]; // Redirigir al login si la URL no existe
    const response = await fetch(route);
    const html = await response.text();
    document.getElementById("app").innerHTML = html;
    registerEvents(path);
};

// Eventos y validaciones
const registerEvents = (path) => {
    if (path === "/") {
        document.getElementById("loginButton").addEventListener("click", () => {
            navigateTo("/game");
        });
    }
    if (path === "/game") {
        import('/src/game.js').then(module => module.startGame());
        document.getElementById("backButton").addEventListener("click", () => {
            navigateTo("/");
        });
    }
};

window.addEventListener("popstate", () => loadRoute(window.location.pathname));
loadRoute(window.location.pathname);
