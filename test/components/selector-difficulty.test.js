import { fixture, expect, html } from "@open-wc/testing";
import sinon from "sinon";
import "../../src/components/selector-difficulty.js";

describe("DifficultySelector", () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<difficulty-selector></difficulty-selector>`);
  });

  describe("Estructura y Renderizado", () => {
    it("Renderiza correctamente", () => {
      expect(element).to.exist;
    });

    it('Valor inicial de dificultad "facil"', () => {
      const select = element.shadowRoot.querySelector("select");
      expect(select.value).to.equal("facil");
    });

    it("Contiene las opciones de dificultad", () => {
      const options = Array.from(element.shadowRoot.querySelectorAll("option"));
      const values = options.map((option) => option.value);
      expect(values).to.deep.equal(["facil", "medio", "dificil"]);
    });
  });

  describe("Interacción y eventos", () => {
    it('Emite un evento "difficulty-changed" cuando se selecciona una nueva dificultad', () => {
      const select = element.shadowRoot.querySelector("select");
      const eventSpy = sinon.spy();

      element.addEventListener("difficulty-changed", eventSpy);
      select.value = "medio";
      select.dispatchEvent(new Event("change"));

      expect(eventSpy).to.have.been.calledOnce;
      expect(eventSpy.firstCall.args[0].detail).to.equal("medio");
    });

    it('Actualiza la propiedad "difficulty" al cambiar la selección', () => {
      const select = element.shadowRoot.querySelector("select");
      select.value = "dificil";
      select.dispatchEvent(new Event("change"));

      expect(element.difficulty).to.equal("dificil");
    });
  });

  describe('Propiedad "isDisabled"', () => {
    it('Deshabilita el selector si "isDisabled" es true', async () => {
      element.isDisabled = true;
      await element.updateComplete;

      const select = element.shadowRoot.querySelector("select");
      expect(select.disabled).to.be.true;
    });

    it('Habilita el selector si "isDisabled" es false', async () => {
      element.isDisabled = false;
      await element.updateComplete;

      const select = element.shadowRoot.querySelector("select");
      expect(select.disabled).to.be.false;
    });
  });

  describe("Seguridad y valores predeterminados", () => {
    it('Tiene un valor predeterminado para "difficulty"', () => {
      expect(element.difficulty).to.equal("facil");
    });

    it("No falla si no se pasa ningún atributo inicial", () => {
      const select = element.shadowRoot.querySelector("select");
      expect(select.value).to.equal("facil");
    });
  });
});
