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
            flex-direction: column;
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
            min-width: 350px;
        }
        .scoreboard {
            font-size: 18px;
            text-align: left;
            width: 200px;
        }
        .grid {
            display: none;
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
        .difficulty-selector {
            position: relative;
            display: inline-block;
            width: 150px;
        }

        select {
            width: 100%;
            padding: 10px 15px;
            background-color: #fff;
            font-size: 16px;
            cursor: pointer;
            background:#FFFFFF;
            border-radius: 8px;
            border: none;
        }
            
        .play-button {
            padding: 15px 30px;
            font-size: 20px;
            background: #007bff;
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

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
        }

        .modal button {
            padding: 10px 20px;
            border: none;
            background: #28a745;
            color: white;
            border-radius: 8px;
            cursor: pointer;
        }

        .points-final{
            font-size: 30px;
            font-weight: bold;
            color: #28a745;
        }

    `;

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
        this.difficulty = event.target.value;
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
        this.gameStarted = true;
        this.score = 0;
        this.timeLeft = 60;
        this.showModal = false;
        this.shadowRoot.querySelector('.play-button').style.display = 'none';
        this.shadowRoot.querySelector('.grid').style.display = 'grid';
        this.timer = setInterval(() => {
            if (this.timeLeft > 0) {
                const randomIndex = Math.floor(Math.random() * 9);
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
                    <div class="scoreboard">
                        <p><strong>Jugador:</strong> ${this.playerName}</p>
                        <p><strong>Puntuación:</strong> ${this.score}</p>
                        <p><strong>Tiempo restante:</strong> ${this.timeLeft}</p>
                    </div>
                    <div class="difficulty-selector">
                        <select @change="${this.changeDifficulty}">
                            <option value="facil">Fácil</option>
                            <option value="medio">Medio</option>
                            <option value="dificil">Difícil</option>
                        </select>
                    </div>
                </div>
            <div class="game-container">
                
                <button class="play-button" @click="${this.startGame}">Jugar</button>
                <div class="grid">
                    ${this.grid.map((hasMole, index) => html`<div class="cell ${hasMole ? 'mole' : ''}" @click="${() => this.handleClick(index)}">${hasMole ? '🐾' : ''}</div>`)}
                </div>
            </div>
            ${this.showModal ? html`
                <div class="modal">
                    <div class="modal-content">
                        <p>Total de puntos </p>
                        <p class="points-final">${this.score}</p>
                        <button @click="${this.startGame}">Jugar de nuevo</button>
                    </div>
                </div>
            ` : ''}
        `;
    }
}

customElements.define('mole-game', MoleGame);
