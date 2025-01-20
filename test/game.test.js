import { html, fixture, expect } from "@open-wc/testing";
import "../src/game.js";

describe("MoleGame", () => {
  it("Muestra el botón al principio", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    const button = el.shadowRoot.querySelector(".play-button");
    expect(button).to.not.be.null;
  });

  it("Hago click en el botón para iniciar el juego", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    const button = el.shadowRoot.querySelector(".play-button");
    button.click();
    await el.updateComplete;
    const moleGrid = el.shadowRoot.querySelector("mole-grid");
    const playButton = el.shadowRoot.querySelector(".play-button");
    expect(playButton.classList.contains("hidden")).to.be.true;
    expect(moleGrid.classList.contains("show")).to.be.true;
  });

  it("Cambio dificultad antes de empezar el juego", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    const difficultySelector = el.shadowRoot.querySelector("difficulty-selector");
    difficultySelector.dispatchEvent(
      new CustomEvent("difficulty-changed", {
        detail: "medio",
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.difficulty).to.equal("medio");
    expect(el.intervalTime).to.equal(750);
  });

  it("No permite cambiar dificultad despues de iniciar el juego", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    const selectorAntes = el.shadowRoot.querySelector("difficulty-selector");
    expect(selectorAntes.isDisabled).to.be.false;
    el.startGame();
    await el.updateComplete;
    const selectorDespues = el.shadowRoot.querySelector("difficulty-selector");
    expect(selectorDespues.isDisabled).to.be.true;
    const dificultadAntes = el.difficulty;
    selectorDespues.dispatchEvent(
      new CustomEvent("difficulty-changed", {
        detail: "medio",
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.difficulty).to.equal(dificultadAntes);
  });

  it("Aumenta la puntuación al hacer click en un topo", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    el.startGame();
    await el.updateComplete;
    const grid = el.grid;
    const moleIndex = grid.indexOf(true);
    if (moleIndex !== -1) {
      el.handleClick(moleIndex);
      await el.updateComplete;
      const expectedScore = el.difficulty === "facil" ? 10 : el.difficulty === "medio" ? 20 : 30;
      expect(el.score).to.equal(expectedScore);
    }
  });

  it("El juego termina cuando se termina el tiempo", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    el.startGame();
    el.timeLeft = 0;
    el.endGame();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("end-modal");
    expect(modal).to.not.be.null;
  });

  it("Botón de reinciar el juego funciona al acabar el juego", async () => {
    const el = await fixture(html`<mole-game></mole-game>`);
    el.startGame();
    el.timeLeft = 0;
    el.endGame();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("end-modal");
    expect(modal).to.not.be.null;
    el.restarGame();
    await el.updateComplete;
    expect(el.showModal).to.equal(false);
    expect(el.gameStarted).to.equal(false);
    expect(el.score).to.equal(0);
  });
});
