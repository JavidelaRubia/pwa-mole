import { LitElement, html, css } from 'lit';
import { navigateTo, setUserName } from '../main.js';

class HomePage extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: sans-serif;
            background: linear-gradient(135deg, #f4c493, #f8d3b3, #e8a673);


            
        }

        .home-container {
            max-width: 200px;
            width: 100%;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        @media (min-width: 756px) {
            .home-container {
                max-width: 400px;
            }
        }
        
        .home-container p{
            font-size: 16px;
            margin-bottom: 20px;
        }

        .title-container{
            display: flex;
            justify-content: center;
            align-items: baseline;
            text-transform:uppercase; 
            font-size:18px; 
            font-weight:700; 
            white-space: nowrap;
        }

        @media (min-width: 500px) {
            .title-container{
                font-size:35px; 
            }
        }

        @media (min-width: 756px) {
            .title-container{
                font-size:45px; 
            }
        }

        .title-mole{
            position: relative;
            width:35px;
            height:35px;
        }

        .half-hole {
            position: absolute;
            bottom: -5px;
            width: 100%;
            height: 50%;
            background: black;
            border-radius:  50% 50% 50% 50%;
        }

        .mole {
            width: 100%;
            height: 100%;
            background-image: url('/mole-icon.png');
            background-size: cover;
            background-position: center;
            animation: jump 2s ease-in-out infinite;
            clip-path: ellipse(50% 50% at 50% 46%);
            position: absolute;
            z-index: 1;
        }
        
        @media (min-width: 500px) {
            .title-mole{
                width: 60px;
                height: 60px;
            }
        }

        @media (min-width: 756px) {
            .title-mole{
                width: 80px;
                height: 80px;
            }
        }

        @keyframes jump {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(0);
            }
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
            <div class="title-container">
                    <div>
                        <h1>M</h1>      
                    </div>
                    <div class="title-mole">
                        <div class="half-hole"></div>
                        <div class="mole"></div>
                    </div>
                    
                    <div>
                        <h1>le Game</h1>      
                    </div>
                        
            </div>
            <div class="home-container">
                <p>Ingresa tu nombre para comenzar a jugar.</p>
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

customElements.define('home-page', HomePage);
