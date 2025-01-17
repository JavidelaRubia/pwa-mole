import { LitElement, html, css } from 'lit';

class DifficultySelector extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        select {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
            cursor: pointer;
        }

        select:disabled {
            background: #e0e0e0;
            cursor: not-allowed;
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
            <select id="difficulty" @change="${this.handleChange}" ?disabled="${this.isDisabled}">
                <option value="facil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="dificil">Difícil</option>
            </select>
        `;
    }
}

customElements.define('difficulty-selector', DifficultySelector);
