import { LitElement, html, css } from 'lit';

class MoleGame extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100dvh;
            width: 100%;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin-top: 20px;
            flex-direction: column;
            max-height: max-content;
        }
        .game-container {
            text-align: center;
        }
        .header {
            box-sizing: border-box;
            width: 100%;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .scoreboard {
            font-size: 18px;
            text-align: left;
            p{
                margin: 10px;
            }
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
            justify-content: center;
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
        /* 🎯 Nuevo estilo para el selector desplegable */
    .difficulty-selector {
      position: relative;
      display: inline-block;
      width: 150px;
    }

    select {
      width: 100%;
      padding: 10px 15px;
      border-radius: 8px;
      background-color: #fff;
      border: 2px solid #ccc;
      font-size: 16px;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      transition: all 0.3s ease;
      color: #333;
    }

    /* Flecha personalizada */
    .difficulty-selector::after {
      content: '▼';
      position: absolute;
      right: 10px;
      top: 12px;
      font-size: 12px;
      color: #333;
      pointer-events: none;
    }

    select:focus {
        border: none;
        outline: none;
    }
    `;

    constructor() {
        super();
        this.grid = Array(9).fill(false);
        this.score = 0;
        this.playerName = localStorage.getItem('userName') || 'Jugador';
        this.intervalTime = 1000; // Tiempo base (fácil)
        this.difficulty = 'facil';
        this.timer = null;
    }

    // Cambiar la dificultad
    changeDifficulty(event) {
        this.difficulty = event.target.value;
        switch (this.difficulty) {
            case 'facil':
                this.intervalTime = 1000;
                break;
            case 'medio':
                this.intervalTime = 700;
                break;
            case 'dificil':
                this.intervalTime = 400;
                break;
        }
        this.startGame(); // Reiniciar el juego con la nueva dificultad
    }

    // Manejar el click en una casilla
    handleClick(index) {
        if (this.grid[index]) {
            this.score += 50;
            this.grid[index] = false;
            this.requestUpdate();
            console.log('¡Golpeaste al topo! +50 puntos');
        }
    }

    // Generar una nueva posición del topo
    startGame() {
        clearInterval(this.timer); // Detener cualquier juego previo
        this.timer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 9);
            this.grid = Array(9).fill(false);
            this.grid[randomIndex] = true;
            this.requestUpdate();
        }, this.intervalTime);
    }

    connectedCallback() {
        super.connectedCallback();
        this.startGame();
    }

    render() {
        return html`
               <div class="header">
          <div class="scoreboard">
            <p><strong>Jugador:</strong> ${this.playerName}</p>
            <p><strong>Puntuación:</strong> ${this.score}</p>
          </div>

          <!-- 🎯 Selector de dificultad estilizado -->
          <div class="difficulty-selector">
            <select @change="${this.changeDifficulty}">
              <option value="facil" ?selected="${this.difficulty === 'facil'}">Fácil</option>
              <option value="medio" ?selected="${this.difficulty === 'medio'}">Medio</option>
              <option value="dificil" ?selected="${this.difficulty === 'dificil'}">Difícil</option>
            </select>
          </div>
        </div>
            <div class="game-container">
                <div class="grid">
                    ${this.grid.map(
            (hasMole, index) => html`
                            <div
                                class="cell ${hasMole ? 'mole' : ''}"
                                @click="${() => this.handleClick(index)}"
                            >
                                ${hasMole ? '🐾' : ''}
                            </div>
                        `
        )}
                </div>
            </div>
        `;
    }
}

customElements.define('mole-game', MoleGame);
