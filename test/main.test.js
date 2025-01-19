import { expect } from "@open-wc/testing";
import { navigateTo, setUserName } from "../main.js";

describe("Main App", () => {
  let originalLocalStorage;
  let originalHistory;
  let originalLocation;
  let mockStorage;

  beforeEach(() => {
    originalLocalStorage = { ...window.localStorage };
    originalHistory = { ...window.history };
    originalLocation = { ...window.location };
    mockStorage = {};
    window.localStorage = {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, value) => {
        mockStorage[key] = value;
      },
      clear: () => {
        mockStorage = {};
      },
    };
    window.location = {
      ...window.location,
      pathname: "/",
    };
    window.history.pushState = (data, title, path) => {
      window.location.pathname = path;
    };
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage = originalLocalStorage;
    window.history = originalHistory;
    window.location = originalLocation;
  });

  describe("Manejo de usuario", () => {
    it("Establecer nombre de usuario", () => {
      setUserName("TestUser");
      expect(localStorage.getItem("userName")).to.equal("TestUser");
    });

    it("Mantener nombre del usuario entre recargas", () => {
      setUserName("TestUser");
      const userName = localStorage.getItem("userName");
      expect(userName).to.equal("TestUser");
    });
    it("No guarda nombres vacios", () => {
      setUserName(null);
      expect(localStorage.getItem("userName")).to.be.null;
      setUserName("");
      expect(localStorage.getItem("userName")).to.be.null;
    });
  });

  describe("Navegación", () => {
    it("Controla la navegación con paths inválidos o vacíos", () => {
      navigateTo("");
      expect(window.location.pathname).to.equal("/");
      navigateTo(undefined);
      expect(window.location.pathname).to.equal("/");
    });
    it("Redirige a home cuando no hay usuario y se intenta acceder a /game", () => {
      localStorage.clear();
      navigateTo("/game");
      expect(window.location.pathname).to.equal("/");
    });

    it("Permite acceso a /game cuando hay usuario", () => {
      setUserName("TestUser");
      navigateTo("/game");
      expect(window.location.pathname).to.equal("/game");
    });

    it("Redirige a home en rutas no existentes", () => {
      navigateTo("/ruta-no-existente");
      expect(window.location.pathname).to.equal("/");
    });

    it("No crea bucles de redirección", () => {
      window.location.pathname = "/";
      navigateTo("/");
      expect(window.location.pathname).to.equal("/");
    });
  });

  describe("Renderizado de componentes", () => {
    it("Renderiza home-page en /", async () => {
      navigateTo("/");
      const homePage = document.querySelector("home-page");
      expect(homePage).to.not.be.null;
    });

    it("Renderiza mole-game en /game cuando hay usuario", async () => {
      setUserName("TestUser");
      navigateTo("/game");
      const moleGame = document.querySelector("mole-game");
      expect(moleGame).to.not.be.null;
    });
  });

  describe("Manejo del historial", () => {
    it("Maneja el evento popstate y redirigir correctamente", () => {
      setUserName("TestUser");
      navigateTo("/game");
      expect(window.location.pathname).to.equal("/game");
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      expect(window.location.pathname).to.equal("/");
    });
  });
});
