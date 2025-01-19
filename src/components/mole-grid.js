import { LitElement, html, css } from "lit";

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
      -webkit-tap-highlight-color: transparent;
    }

    .container-mole {
      position: absolute;
      width: 100%;
      height: 200px;
      bottom: 0;
    }

    .container-mole.has-mole {
      overflow: hidden;
    }

    .mole {
      width: 100px;
      height: 100px;
      background-image: url("/mole-icon.png");
      background-size: cover;
      position: absolute;
      background-position: center;
      animation: jump 1s ease-in-out infinite;
      border-radius: 0% 0% 20% 20%;
      z-index: 1;
      cursor: pointer;
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
      width: 100px;
      height: 50px;
      background: black;
      border-radius: 50% 50% 50% 50%;
      position: absolute;
      bottom: -17px;
    }

    .fake-half-hole {
      width: 101px;
      height: 50px;
      background: transparent;
      border-top: 17.5px solid black;
      border-radius: 40% 40% 0 0;
      position: absolute;
      bottom: -16.5px;
      z-index: 2;
      transform: rotate(180deg);
    }

    @keyframes jump {
      0% {
        transform: translateY(200px);
      }
      50% {
        transform: translateY(100px);
      }
      100% {
        transform: translateY(200px);
      }

      @media (hover: none) {
        .mole {
          -webkit-tap-highlight-color: transparent;
        }
      }

      @supports (-webkit-touch-callout: none) {
        .mole {
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      }
    }
  `;

  static properties = {
    grid: { type: Array },
    difficulty: { type: String },
  };

  handleClick(index, hasMole) {
    if (!hasMole) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("mole-clicked", {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  render() {
    return html`
      <div class="grid">
        ${this.grid.map(
          (hasMole, index) => html`
            <div class="cell" @click="${() => this.handleClick(index, hasMole)}">
              <div class="container-mole ${hasMole ? "has-mole" : ""}">
                <div class="${hasMole ? "mole" : ""} ${this.difficulty}"></div>
                <div class="half-hole"></div>
              </div>
              <div class="${hasMole ? "fake-half-hole" : ""}"></div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define("mole-grid", MoleGrid);
