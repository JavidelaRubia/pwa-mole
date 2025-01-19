import { LitElement, html, css } from 'lit';

class ScoreboardComponent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            font-family: sans-serif;
            flex-direction: column;
            gap: 15px;
        }

        p{
            margin: 0;
        }

        .container-time{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
        }

        .time { 
            min-width: 40px;
            font-weight: bold;  
            color: white;  
            background-color: #93b2f4;  
            border-radius: 10px;  
            padding: 5px;  
            box-sizing: border-box;
            width: fit-content;  
            text-align: center;  
            transition: background-color 0.3s ease;
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
    updated(changedProperties) {
        if (changedProperties.has('timeLeft')) {
            if (this.timeLeft < 10) {
                this.shadowRoot.querySelector('.time').style.backgroundColor = 'red';
            }else{
                this.shadowRoot.querySelector('.time').style.backgroundColor = '#93b2f4';
            }
        }
    }

    render() {
        return html`
                <p><strong>Jugador:</strong> ${this.playerName}</p>
                <p><strong>Puntuación:</strong> ${this.score}</p>
                <div class='container-time'>
                    <p><strong>Tiempo:</strong></p>
                    <div class='time'>
                     <span >${this.timeLeft}</span>
                    </div>
                </div>
                
                
        `;
    }
}

customElements.define('scoreboard-component', ScoreboardComponent);
