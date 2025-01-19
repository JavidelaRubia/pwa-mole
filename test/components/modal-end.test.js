import { fixture, expect, html } from "@open-wc/testing";
import "../../src/components/modal-end.js";

describe("EndModal Component", () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<end-modal score="100"></end-modal>`);
  });

  describe("Estructura y Renderizado", () => {
    it("debería renderizar correctamente", () => {
      expect(element).to.exist;
    });

    it("debería mostrar el puntaje correctamente", () => {
      const scoreText = element.shadowRoot.querySelector(".modal-content p").textContent;
      expect(scoreText).to.include("Total de puntos: 100");
    });

    it('debería contener un botón de "Jugar de nuevo"', () => {
      const button = element.shadowRoot.querySelector("button");
      expect(button).to.exist;
      expect(button.textContent).to.equal("Jugar de nuevo");
    });
  });

  describe("Propiedades y Reactividad", () => {
    it('debería actualizar el puntaje cuando cambia la propiedad "score"', async () => {
      element.score = 200;
      await element.updateComplete;

      const scoreText = element.shadowRoot.querySelector(".modal-content p").textContent;
      expect(scoreText).to.include("Total de puntos: 200");
    });
  });
});
