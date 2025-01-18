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
             background: linear-gradient(135deg, #f4c493, #f8d3b3, #e8a673);
            flex-direction: column;
        }
        .header {
            box-sizing: border-box;
            width: 100%;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 320px;
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

        .container-tips{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            padding: 0 20px;
            box-sizing: border-box;
            font-size: 16px;
            max-width: 400px;
        }

    `;

    static properties = {
        showModal: { type: Boolean },
        difficulty : { type: String }
    };

    constructor() {
        super();
        this.grid = Array(9).fill(false);
        this.score = 0;
        this.playerName = localStorage.getItem('userName') || 'Jugador';
        this.intervalTime = 1000;
        this.difficulty = 'facil';
        this.timer = null;
        this.totalTime = 30;
        this.timeLeft = this.totalTime;
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
        this.timeLeft = this.totalTime;
        this.shadowRoot.querySelector('.play-button').style.display = 'none';
        this.shadowRoot.querySelector('.container-tips').style.display = 'none';
        this.shadowRoot.querySelector('mole-grid').style.display = 'block';
        this.gameStarted = true;
        
        this.gameTimer = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.requestUpdate();
            } else {
                this.endGame();
            }
        }, 1000);
        this.startMoleTimer();
    }

    startMoleTimer() {
        this.previousIndex = -1;
        this.moleTimer = setInterval(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 9);
            } while (randomIndex === this.previousIndex);

            this.previousIndex = randomIndex;
            this.grid = Array(9).fill(false);
            this.grid[randomIndex] = true;
            this.requestUpdate();
        }, this.intervalTime);
    }

    endGame() {
        clearInterval(this.gameTimer);
        clearInterval(this.moleTimer);
        this.shadowRoot.querySelector('.play-button').style.display = 'block';
        this.shadowRoot.querySelector('.container-tips').style.display = 'block';
        this.shadowRoot.querySelector('mole-grid').style.display = 'none';
        this.showModal = true;
        this.requestUpdate();
    }

    restarGame() {
        this.showModal = false;
        this.gameStarted = false;
        this.score = 0;
        this.timeLeft = this.totalTime;
        clearInterval(this.timer);
    }

    handleClick(index) {
        if (this.grid[index] && this.gameStarted) {
            switch (this.difficulty) {
                case 'facil':
                    this.score += 10;
                    break;
                case 'medio':
                    this.score += 20;
                    break;
                case 'dificil':
                    this.score += 30;
                    break;
            }
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
            
            <div class="container-tips">
                <p>¡Tienes <strong>30 segundos</strong> para golpear tantos topos como puedas!</p>
                <p>Si cambias la dificultad, obtendrás más puntos, pero los topos aparecerán más rápido.</p>
            </div>

            <div class="game-container">
                <button class="play-button" @click="${this.startGame}">Jugar</button>
                <mole-grid .difficulty="${this.difficulty}" .grid="${this.grid}" @mole-clicked="${(e) => this.handleClick(e.detail.index)}"></mole-grid>
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


