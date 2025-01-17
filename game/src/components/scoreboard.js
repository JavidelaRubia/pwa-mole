import { LitElement, html, css } from 'lit';

class ScoreboardComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
        }
    `;

    static properties = {
        playerName: { type: String },
        score: { type: Number },
        timeLeft: { type: Number }
    };

    constructor() {
        super();
        this.playerName = '';
        this.score = 0;
        this.timeLeft = 0;
    }

    render() {
        return html`
            <div>
                <p><strong>Jugador:</strong> ${this.playerName}</p>
                <p><strong>Puntuación:</strong> ${this.score}</p>
                <p><strong>Tiempo restante:</strong> ${this.timeLeft}</p>
            </div>
        `;
    }
}

customElements.define('scoreboard-component', ScoreboardComponent);
