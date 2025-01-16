// src/ModalComponent.js
import { LitElement, html, css } from 'lit';

export class ModalComponent extends LitElement {
    static properties = {
        message: { type: String },
        isVisible: { type: Boolean },
    };

    static styles = css`
        :host {
            display: ${this.isVisible ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1000;
        }

        .modal {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            margin: 20% auto;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }

        button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #0056b3;
        }
    `;

    constructor() {
        super();
        this.message = '';
        this.isVisible = false;
    }

    show(message) {
        this.message = message;
        this.isVisible = true;
        this.requestUpdate();
    }

    hide() {
        this.isVisible = false;
        this.requestUpdate();
    }

    render() {
        if (!this.isVisible) return html``;
        return html`
            <div class="modal">
                <p>${this.message}</p>
                <button @click="${this.hide}">Cerrar</button>
            </div>
        `;
    }
}

customElements.define('modal-component', ModalComponent);
