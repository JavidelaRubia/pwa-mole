import { html, fixture, expect } from "@open-wc/testing";
import "../../src/components/mole-grid.js";

describe("MoleGrid", () => {
  it("Renderizado cuadricula 9 celdas", async () => {
    const el = await fixture(html` <mole-grid .grid="${Array(9).fill(false)}" difficulty="facil"></mole-grid> `);
    const cells = el.shadowRoot.querySelectorAll(".cell");
    expect(cells.length).to.equal(9);
  });

  it("Muesta el topo en la casilla correcta", async () => {
    const grid = Array(9).fill(false);
    grid[4] = true; // Topo centro
    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="facil"></mole-grid> `);
    const cells = el.shadowRoot.querySelectorAll(".cell");
    const moles = el.shadowRoot.querySelectorAll(".mole");
    expect(moles.length).to.equal(1);
    const centralCell = cells[4];
    expect(centralCell.querySelector(".mole")).to.not.be.null;
  });

  it("La dificultad se aplica al topo", async () => {
    const grid = Array(9).fill(false);
    grid[0] = true;
    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="medio"></mole-grid> `);
    const mole = el.shadowRoot.querySelector(".mole");
    expect(mole.classList.contains("medio")).to.be.true;
  });

  it("Dispara el evento mole-clicked cuando se hace clic en un topo", async () => {
    const grid = Array(9).fill(false);
    grid[0] = true;

    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="facil"></mole-grid> `);
    let clickedIndex = null;
    el.addEventListener("mole-clicked", (e) => {
      clickedIndex = e.detail.index;
    });
    const cell = el.shadowRoot.querySelector(".cell");
    cell.click();
    expect(clickedIndex).to.equal(0);
  });

  it("No dispara el evento mole-clicked cuando se hace clic en una celda vacía", async () => {
    const grid = Array(9).fill(false);

    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="facil"></mole-grid> `);
    let eventFired = false;
    el.addEventListener("mole-clicked", () => {
      eventFired = true;
    });
    const cell = el.shadowRoot.querySelector(".cell");
    cell.click();
    expect(eventFired).to.be.false;
  });

  it("Elementos visuales correctos en una celda con topo", async () => {
    const grid = Array(9).fill(false);
    grid[0] = true;

    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="facil"></mole-grid> `);
    const cell = el.shadowRoot.querySelector(".cell");
    expect(cell.querySelector(".container-mole")).to.not.be.null;
    expect(cell.querySelector(".container-mole").classList.contains("has-mole")).to.be.true;
    expect(cell.querySelector(".mole")).to.not.be.null;
    expect(cell.querySelector(".half-hole")).to.not.be.null;
    expect(cell.querySelector(".fake-half-hole")).to.not.be.null;
  });

  it("Elementos visuales correctos en una celda sin topo", async () => {
    const grid = Array(9).fill(false);

    const el = await fixture(html` <mole-grid .grid="${grid}" difficulty="facil"></mole-grid> `);
    const cell = el.shadowRoot.querySelector(".cell");
    expect(cell.querySelector(".container-mole")).to.not.be.null;
    expect(cell.querySelector(".container-mole").classList.contains("has-mole")).to.be.false;
    expect(cell.querySelector(".mole")).to.be.null;
    expect(cell.querySelector(".half-hole")).to.not.be.null;
    expect(cell.querySelector(".fake-half-hole")).to.be.null;
  });
});
