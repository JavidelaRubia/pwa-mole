
let score = 0;
let activeMole = -1;
let gameInterval;

export const startGame = () => {
    score = 0;
    updateScore();
    gameInterval = setInterval(() => {
        generateMole();
    }, 1000);
    registerGameEvents();
};

const generateMole = () => {
    // Limpiar el topo anterior
    if (activeMole >= 0) {
        document.getElementById(`cell-${activeMole}`).classList.remove('mole');
    }
    // Nuevo topo aleatorio
    activeMole = Math.floor(Math.random() * 9);
    document.getElementById(`cell-${activeMole}`).classList.add('mole');
};

const registerGameEvents = () => {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).addEventListener('click', () => {
            if (i === activeMole) {
                score++;
                updateScore();
                document.getElementById(`cell-${activeMole}`).classList.remove('mole');
            }
        });
    }
};

const updateScore = () => {
    document.getElementById('score').textContent = `Puntaje: ${score}`;
};
