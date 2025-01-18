import { LitElement, html, css } from 'lit';

class MoleGrid extends LitElement {
    static styles = css`
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
        }
        .cell {
            position: relative;
            width: 100px;
            height: 100px;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .mole {
            width: 100%;
            height: 100%;
            background-image: url('/mole-icon.png');
            background-size: cover;
            background-position: center;
            animation: jump 1s ease-in-out infinite;
            position: absolute;
            border-radius:  0% 0% 20% 20%;
            z-index: 1;
            cursor: pointer;
            bottom: 25px;
        }

        .mole.facil {
            animation-duration: 1s;
        }

        .mole.medio {
            animation-duration: 0.8s;
        }

        .mole.dificil {
            animation-duration: 0.6s;
        }

        .half-hole {
            width: 100%;
            height: 50%;
            background: black;
            border-radius:  50% 50% 50% 50%;
            position: absolute;
            bottom: 0;
        }

        .fake-half-hole {
            width: 100%;
            height: 40px;
            background: transparent;
            border-top: 20px solid black;
            border-radius: 40% 40% 0 0;
            position: absolute;
            bottom: 5px;
            z-index: 2;
            transform: rotate(180deg);
        }
        
        @keyframes jump {
            0% {
                transform: translateY(100px); 
                clip-path: inset(0 0 100% 0); 
            }
            50% {
                transform: translateY(3px); 
                clip-path: inset(0 0 0 0); 
            }
            100% {
                transform: translateY(90px); 
                clip-path: inset(0 0 100% 0); 
        }
}
    `;

    static properties = {
        grid: { type: Array },
        difficulty : { type: String }
        
    };

    handleClick(index, hasMole) {
        if(!hasMole){
            return;
        }
        this.dispatchEvent(new CustomEvent('mole-clicked', {
            detail: { index },
            bubbles: true,
            composed: true
        }));

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]); 
        }
    }

    render() {
        return html`
            <div class="grid">
                ${this.grid.map((hasMole, index) => html`
                    <div class="cell" @click="${() => this.handleClick(index, hasMole)}">
                        <div class="${hasMole ? 'mole' : ''} ${this.difficulty}"></div>
                        <div class="half-hole"></div>
                        <div class="${hasMole ? 'fake-half-hole' : ''} "></div>
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('mole-grid', MoleGrid);
