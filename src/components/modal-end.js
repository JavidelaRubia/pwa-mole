import { LitElement, html, css } from "lit";

class EndModal extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      border: none;
      background: #93b2f4;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }
  `;

  static properties = {
    score: { type: Number },
  };

  handleRestartGame() {
    this.dispatchEvent(
      new CustomEvent("restart-game", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          <p>Total de puntos: ${this.score}</p>
          <button @click="${() => this.handleRestartGame()}">Jugar de nuevo</button>
        </div>
      </div>
    `;
  }
}

customElements.define("end-modal", EndModal);
