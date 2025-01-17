import { LitElement, html, css } from 'lit';
import './components/scoreboard.js';
import './components/selector-difficulty.js';
import './components/mole-grid.js';
import './components/modal-end.js';

class MoleGame extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100dvh;
            width: 100%;
            font-family: Arial, sans-serif;
            background-color: #f4c493;
            flex-direction: column;
        }
        .header {
            box-sizing: border-box;
            width: 100%;
            padding: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            min-width: 300px;
        }
        .play-button {
            padding: 15px 30px;
            font-size: 20px;
            background: #93b2f4;
            border: none;
            border-radius: 10px;
            color: white;
            cursor: pointer;
            transition: background 0.3s ease;
            margin-top: 50px;
        }

        .play-button:hover {
            background: #0056b3;
        }

        mole-grid {
            display: none;
        }
    `;

    static properties = {
        showModal: { type: Boolean },
    };

    constructor() {
        super();
        this.grid = Array(9).fill(false);
        this.score = 0;
        this.playerName = localStorage.getItem('userName') || 'Jugador';
        this.intervalTime = 1000;
        this.difficulty = 'facil';
        this.timer = null;
        this.timeLeft = 60;
        this.gameStarted = false;
        this.showModal = false;
    }

    changeDifficulty(event) {
        this.difficulty = event.detail;
        switch (this.difficulty) {
            case 'facil':
                this.intervalTime = 1000;
                break;
            case 'medio':
                this.intervalTime = 750;
                break;
            case 'dificil':
                this.intervalTime = 500;
                break;
        }
    }

    startGame() {
        this.score = 0;
        this.timeLeft = 5;
        this.shadowRoot.querySelector('.play-button').style.display = 'none';
        this.shadowRoot.querySelector('mole-grid').style.display = 'block';
        this.gameStarted = true;
        this.previousIndex = -1;

        this.timer = setInterval(() => {
            if (this.timeLeft > 0) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * 9);
                } while (randomIndex === this.previousIndex);

                this.previousIndex = randomIndex;
                this.grid = Array(9).fill(false);
                this.grid[randomIndex] = true;
                this.timeLeft--;
                this.requestUpdate();
            } else {
                clearInterval(this.timer);
                this.showModal = true;
                this.requestUpdate();
            }
        }, this.intervalTime);
    }

    restarGame() {
        this.showModal = false;
        this.gameStarted = false;
        this.score = 0;
        this.timeLeft = 60;
        this.shadowRoot.querySelector('.play-button').style.display = 'block';
        this.shadowRoot.querySelector('mole-grid').style.display = 'none';
        clearInterval(this.timer);
    }

    handleClick(index) {
        if (this.grid[index] && this.gameStarted) {
            this.score += 50;
            this.grid[index] = false;
            this.requestUpdate();
        }
    }

    render() {
        return html`
            <div class="header">
                <scoreboard-component
                    .playerName="${this.playerName}"
                    .score="${this.score}"
                    .timeLeft="${this.timeLeft}"
                ></scoreboard-component>

                <difficulty-selector .isDisabled="${this.gameStarted}"
                    @difficulty-changed="${this.changeDifficulty}" >
                </difficulty-selector>
            </div>

            <div class="game-container">
                <button class="play-button" @click="${this.startGame}">Jugar</button>
                <mole-grid .grid="${this.grid}" @mole-clicked="${(e) => this.handleClick(e.detail.index)}"></mole-grid>
            </div>

            ${this.showModal ? html`
                <end-modal
                    .score="${this.score}"
                    @restart-game="${this.restarGame}">
                </end-modal>
            ` : ''}
        `;
    }
}

customElements.define('mole-game', MoleGame);


