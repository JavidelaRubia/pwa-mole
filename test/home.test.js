import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/home.js';

describe('HomePage', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<home-page></home-page>`);
  });

  it('Renderizado página', () => {
    expect(el).to.exist;
  });

  it('Actualiza input player name', async () => {
    const input = el.shadowRoot.querySelector('input');
    input.value = 'Player1';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.username).to.equal('Player1');
  });

  it('Habilita botón despues de escribir en input player name', async () => {
    const input = el.shadowRoot.querySelector('input');
    const button = el.shadowRoot.querySelector('button');
    input.value = 'Player1';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(button.disabled).to.be.false;
  });

  it('Deshabilita el botón al estar el input player name vacio', async () => {
    const input = el.shadowRoot.querySelector('input');
    const button = el.shadowRoot.querySelector('button');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(button.disabled).to.be.true;
  });

  it('Llama a handleLogin cuando tenemos nombre escrito', async () => {
    const handleLoginSpy = sinon.spy(el, 'handleLogin');
    const input = el.shadowRoot.querySelector('input');
    input.value = 'TestUser';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    expect(handleLoginSpy).to.have.been.calledOnce;
  });
});
