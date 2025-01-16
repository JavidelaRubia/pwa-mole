// src/LoginPage.js
import { LitElement, html, css } from 'lit';
import { navigateTo, setUserName } from '../main.js';

class LoginPage extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
        }
    `;

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
            <h1>Login</h1>
            <input type="text" @input="${this.handleInput}" placeholder="Nombre de usuario" />
            <button @click="${this.handleLogin}">Entrar al Juego</button>
        `;
    }
}

customElements.define('login-page', LoginPage);
