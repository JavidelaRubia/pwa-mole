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
            
            border-radius: 50%;
        }

        .mole {
            width: 100%;
            height: 100%;
            background-image: url('/mole-icon.png');
            background-size: cover;
            background-position: center;
            animation: jump 1s ease-in-out infinite;
            border-radius:  0 0 40% 40%;
            position: absolute;
            z-index: 1;
            cursor: pointer;
        }

        .half-hole {
            width: 100%;
            height: 50%;
            background: black;
            border-radius:  50% 50% 50% 50%;
            position: absolute;
            bottom: 0;
        }

        @keyframes jump {
            0% {
                transform: translateY(0); /* Empieza en la posición original */
            }
            50% {
                transform: translateY(-20px); /* Sube 20px */
            }
            100% {
                transform: translateY(0); /* Vuelve a la posición original */
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
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('mole-grid', MoleGrid);
