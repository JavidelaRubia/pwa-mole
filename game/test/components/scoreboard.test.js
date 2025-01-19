import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/scoreboard.js';

describe('ScoreboardComponent', () => {
    let element;

    beforeEach(async () => {
        element = await fixture(html`<scoreboard-component 
          playerName="Player1" 
          score="100" 
          timeLeft="20"></scoreboard-component>`);
    });

    describe('Estructura y Renderizado', () => {
        it('Renderiza correctamente', () => {
            expect(element).to.exist;
        });

        it('Muestra el nombre del jugador', () => {
            const playerName = element.shadowRoot.querySelector('p:nth-of-type(1)').textContent;
            expect(playerName).to.include('Jugador: Player1');
        });

        it('Muestra la puntuación', () => {
            const score = element.shadowRoot.querySelector('p:nth-of-type(2)').textContent;
            expect(score).to.include('Puntuación: 100');
        });

        it('Muestra el tiempo restante', () => {
            const timeLeft = element.shadowRoot.querySelector('.time span').textContent;
            expect(timeLeft).to.equal('20');
        });
    });

    describe('Reactividad de propiedades', () => {
        it('Actualiza el nombre del jugador cuando cambia la propiedad', async () => {
            element.playerName = 'Player2';
            await element.updateComplete;
            const playerName = element.shadowRoot.querySelector('p:nth-of-type(1)').textContent;
            expect(playerName).to.include('Jugador: Player2');
        });

        it('Actualiza la puntuación cuando cambia la propiedad', async () => {
            element.score = 200;
            await element.updateComplete;
            const score = element.shadowRoot.querySelector('p:nth-of-type(2)').textContent;
            expect(score).to.include('Puntuación: 200');
        });

        it('Actualiza el tiempo restante cuando cambia la propiedad', async () => {
            element.timeLeft = 10;
            await element.updateComplete;
            const timeLeft = element.shadowRoot.querySelector('.time span').textContent;
            expect(timeLeft).to.equal('10');
        });
    });

    describe('Estilos dinámicos', () => {
        it('Fondo del tiempo a rojo si timeLeft es menor a 10', async () => {
            element.timeLeft = 5;
            await element.updateComplete;

            const timeDiv = element.shadowRoot.querySelector('.time');
            const backgroundColor = getComputedStyle(timeDiv).backgroundColor;
            expect(backgroundColor).to.equal('rgb(255, 0, 0)'); // Rojo en formato RGB
        });

        it('Fondo del tiempo azul si timeLeft es mayor o igual a 10', async () => {
            element.timeLeft = 15;
            await element.updateComplete;

            const timeDiv = element.shadowRoot.querySelector('.time');
            const backgroundColor = getComputedStyle(timeDiv).backgroundColor;
            expect(backgroundColor).to.equal('rgb(147, 178, 244)'); // Azul en formato RGB
        });
    });

    describe('Comportamiento y seguridad', () => {
        it('No falla si no se pasa el tiempo inicial', async () => {
            const newElement = await fixture(html`<scoreboard-component></scoreboard-component>`);
            const timeLeft = newElement.shadowRoot.querySelector('.time span').textContent;
            expect(timeLeft).to.equal('0');
        });
    });
});
