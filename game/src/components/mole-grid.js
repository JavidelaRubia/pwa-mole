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
            animation: jump 1.5s ease-in-out infinite;
            position: absolute;
            z-index: 1;
            cursor: pointer;
            border-radius:  0% 0% 20% 20%;
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
            height: 35px;
            background: transparent;
            border-top: 15px solid black;
            border-radius: 50% 50% 0 0;
            position: absolute;
            bottom: 0;
            z-index: 2;
            transform: rotate(180deg);
        }
        
        @keyframes jump {
            0% {
                transform: translateY(90px); 
                clip-path: inset(0 0 100% 0); 
            }
            50% {
                transform: translateY(-10px); 
                clip-path: inset(0 0 8% 0); 
            }
            100% {
                transform: translateY(90px); 
                clip-path: inset(0 0 100% 0); 
        }
}
    `;

    static properties = {
        grid: { type: Array }
        
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
                        <div class="${hasMole ? 'mole' : ''}"></div>
                        <div class="half-hole"></div>
                        <div class="${hasMole ? 'fake-half-hole' : ''} fake-half-hole"></div>
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('mole-grid', MoleGrid);
