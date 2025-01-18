import { html, fixture, expect } from '@open-wc/testing';
import '../src/game.js'; // importa el componente MoleGame

describe('MoleGame', () => {
    it('debería mostrar el botón de jugar al principio', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        const button = el.shadowRoot.querySelector('.play-button');
        expect(button).to.not.be.null;
    });

    it('debería iniciar el juego cuando se hace clic en el botón de jugar', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        const button = el.shadowRoot.querySelector('.play-button');
        
        // Simula un clic en el botón de jugar
        button.click();
        await el.updateComplete;
        
        // Verifica que el juego haya comenzado
        const moleGrid = el.shadowRoot.querySelector('mole-grid');
        const playButton = el.shadowRoot.querySelector('.play-button');
        
        // El botón debe desaparecer y la grilla de topos debe aparecer
        expect(playButton.style.display).to.equal('none');
        expect(moleGrid.style.display).to.equal('block');
    });

    it('debería permitir cambiar la dificultad antes de iniciar el juego', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        
        // Cambiar la dificultad a 'medio'
        el.dispatchEvent(new CustomEvent('difficulty-changed', { detail: 'medio' }));
        await el.updateComplete; // Asegurarse de que la actualización haya finalizado
    
        // Verificar que la dificultad se haya cambiado
        expect(el.difficulty).to.equal('medio');
        expect(el.intervalTime).to.equal(750);  // Debería ser 750ms para dificultad media
    });
    

    it('no debería permitir cambiar la dificultad después de iniciar el juego', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        const button = el.shadowRoot.querySelector('.play-button');
        
        // Iniciar el juego
        button.click();
        await el.updateComplete;
    
        // Intentar cambiar la dificultad después de que el juego haya comenzado
        const difficultySelector = el.shadowRoot.querySelector('difficulty-selector');
        await el.updateComplete; // Asegurarse de que la actualización haya finalizado
        expect(difficultySelector.hasAttribute('disabled')).to.be.true;
    });
    

    it('debería actualizar el puntaje cuando se hace clic en un topo', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        el.startGame();
        await el.updateComplete;
        
        // Simula un clic en un topo
        const grid = el.grid;
        const moleIndex = grid.indexOf(true); // Encuentra el índice del topo activo
        if (moleIndex !== -1) {
            el.handleClick(moleIndex);
            await el.updateComplete;
            
            // Verifica que el puntaje haya aumentado dependiendo de la dificultad
            const expectedScore = el.difficulty === 'facil' ? 10 :
                                  el.difficulty === 'medio' ? 20 : 30;
            expect(el.score).to.equal(expectedScore);
        }
    });

    it('debería terminar el juego después de 30 segundos', async () => {
        jest.setTimeout(35000);  // Establece un timeout de 35 segundos para este test específico
        
        const el = await fixture(html`<mole-game></mole-game>`);
        el.startGame();
        
        // Esperamos 30 segundos para que el tiempo se agote
        await new Promise(resolve => setTimeout(resolve, 31000));  // Espera 31 segundos
        await el.updateComplete;
        
        // Verifica que el modal se haya mostrado
        const modal = el.shadowRoot.querySelector('end-modal');
        expect(modal).to.not.be.null;
    });
    it('debería mostrar el botón de reiniciar solo después de que termine el tiempo', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        el.startGame();
        
        // Verificamos que al principio el botón de reiniciar no esté visible
        let modal = el.shadowRoot.querySelector('end-modal');
        expect(modal).to.be.null;

        // Esperamos 30 segundos para que el tiempo se agote
        await new Promise(resolve => setTimeout(resolve, 31000));  // Espera 31 segundos
        
        // Ahora verificamos que el modal esté visible y el botón de reiniciar esté presente
        modal = el.shadowRoot.querySelector('end-modal');
        expect(modal).to.not.be.null;
        const restartButton = modal.shadowRoot.querySelector('button');
        expect(restartButton).to.not.be.null;
    });

    it('debería reiniciar el juego al hacer clic en el botón de reiniciar', async () => {
        const el = await fixture(html`<mole-game></mole-game>`);
        el.startGame();
        await new Promise(resolve => setTimeout(resolve, 31000));  // Espera 31 segundos
        
        // Ahora verificamos que el modal esté visible
        let modal = el.shadowRoot.querySelector('end-modal');
        expect(modal).to.not.be.null;

        // Simula el clic para reiniciar el juego
        const restartButton = modal.shadowRoot.querySelector('button');
        restartButton.click();
        await el.updateComplete;
        
        // Verifica que el juego se haya reiniciado
        expect(el.showModal).to.equal(false);
        expect(el.gameStarted).to.equal(false);
        expect(el.score).to.equal(0);
    });
});
