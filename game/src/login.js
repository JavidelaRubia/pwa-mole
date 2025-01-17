import { LitElement, html, css } from 'lit';
import { navigateTo, setUserName } from '../main.js';

class LoginPage extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: 'Poppins', sans-serif;
            background-color: #f4c493;
            
        }

        .login-container {
            max-width: 400px;
            width: 100%;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            margin-bottom: 20px;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
           
            outline: none;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
            background:#f0f0f0;
             border: none;
            box-sizing: border-box;
        }

        input[type="text"]:focus {
            border: none;
        }

        button {
            width: 100%;
            padding: 10px;
            background:#93b2f4;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    `;

    static properties = {
        username: { type: String }
    };

    constructor() {
        super();
        this.username = '';
    }

    handleInput(event) {
        this.username = event.target.value;
    }

    handleLogin() {
        if (this.username.trim()) {
            setUserName(this.username);
            navigateTo('/game');
        }
    }

    render() {
        return html`
            <div class="login-container">
                <h1>Mole Game</h1>
                <input
                    type="text"
                    @input="${this.handleInput}"
                    .value="${this.username}"
                    placeholder="Nombre del jugador"
                />
                <button
                    @click="${this.handleLogin}"
                    ?disabled="${!this.username.trim()}"
                >
                    Entrar al Juego
                </button>
            </div>
        `;
    }
}

customElements.define('login-page', LoginPage);
