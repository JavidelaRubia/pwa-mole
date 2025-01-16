import { LitElement, html, css } from 'lit';

class MoleGame extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 10px;
    }
    .cell {
      width: 100px;
      height: 100px;
      background-color: lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
    }
    .mole {
      background-color: brown;
      border-radius: 50%;
    }
  `;

  constructor() {
    super();
    this.grid = Array(9).fill(false);
  }

  // Manejar el click en una casilla
  handleClick(index) {
    if (this.grid[index]) {
      this.grid[index] = false;
      this.requestUpdate();
      console.log('¡Golpeaste al topo!');
    }
  }

  // Generar una nueva posición con topo
  startGame() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      this.grid = Array(9).fill(false);
      this.grid[randomIndex] = true;
      this.requestUpdate();
    }, 1000);
  }

  connectedCallback() {
    super.connectedCallback();
    this.startGame();
  }

  render() {
    return html`
      <h1>Juego de los Topos</h1>
      <div class="grid">
        ${this.grid.map(
          (hasMole, index) =>
            html`
              <div
                class="cell ${hasMole ? 'mole' : ''}"
                @click="${() => this.handleClick(index)}"
              >
                ${hasMole ? '🐾' : ''}
              </div>
            `
        )}
      </div>
    `;
  }
}

customElements.define('mole-game', MoleGame);
