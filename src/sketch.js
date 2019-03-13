const SCALE = 20;
const SPEED = 200;
const inputsRef = [
    '0 0',
    '2',
    '0 8250 4500',
    '1 14250 8500',
    '2',
    '0 2250 4899 8250 8599',
    '1 6250 6999 6250 4599',
];
let inputs = [];

/** global var **/
let score = null;
let canvas = null;
let background = null;

function readline() {
    if (inputs.length === 0) {
        // throw new Error('no inputs provided for the turn');
        inputs = [...inputsRef];
    }
    return inputs.shift(); //inputs contient les données générées par ton générateur
}

window.print = action => {
    // simulate
};



/****************/

function init() {
    score = new Score();
    canvas = new Canvas("canvas", 16000, 9000);
    background = new Rectangle(0, 0, 16000, 9000, 'rgb(150, 150, 150)');
}

function draw(games, genCount) {
    return new Promise((resolve, reject) => {
        const maxTurns = Math.max(...games.map(g => g.length));
        let maxScore = 0;
        console.log('turns : ', maxTurns);
        let timerId = setInterval(() => {
            canvas.add(background);
            games.forEach(g => {
                maxScore = canvas.update(g, maxScore);
                score.value = `Generation: ${genCount}, score: ${maxScore}`;
            });
            canvas.draw();
            canvas.clear();
        }, SPEED);
        setTimeout(() => {
            clearTimeout(timerId);
            return resolve();
        }, SPEED * maxTurns);
    })
}
