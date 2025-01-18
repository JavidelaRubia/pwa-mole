import { LitElement, html, css } from 'lit';

class DifficultySelector extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .select-wrapper {
            position: relative;
            width: 100px;
        }

        select {
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            padding: 12px 45px 12px 15px;
            font-size: 12px;
            font-weight: 600;
            border: 2px solid #93b2f4;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(147, 178, 244, 0.2);
            color: #4a4a4a;
        }

        .select-wrapper::after {
            content: '';
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #93b2f4;
            pointer-events: none;
            transition: transform 0.3s ease;
        }


        select:disabled {
            background: #e0e0e0;
            pointer-events: none;
        
        }

        select option {
            padding: 12px;
            font-weight: 500;
            background-color: white;
            color: #4a4a4a;
        }

        select:focus {
            outline: none;
            border: none;
        }
        
    `;

    static properties = {
        difficulty: { type: String },
        isDisabled: { type: Boolean }
    };

    constructor() {
        super();
        this.difficulty = 'facil';
        this.isDisabled = false;
    }

    handleChange(event) {
        this.difficulty = event.target.value;
        this.dispatchEvent(new CustomEvent('difficulty-changed', {
            detail: this.difficulty,
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
        <div class="select-wrapper">
            <select id="difficulty" @change="${this.handleChange}" ?disabled="${this.isDisabled}">
                <option value="facil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="dificil">Difícil</option>
            </select>
        </div>
        `;
    }
}

customElements.define('difficulty-selector', DifficultySelector);
