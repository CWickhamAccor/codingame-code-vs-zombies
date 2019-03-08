const SCALE = 20;
const inputs = [
    '0 0',
    '1',
    '0 8250 4500',
    '1',
    '0 8250 8999 8250 8599',


    '500 500',
    '1',
    '0 8250 4500',
    '1',
    '0 8250 8999 8250 8599',


    '1000 1000',
    '1',
    '0 8250 4500',
    '1',
    '0 8250 8999 8250 8599',
];

/** global var **/
let score = null;
let canvas = null;
let background = null;

function readline() {
    if (inputs.length === 0) { throw new Error('no inputs provided for the turn'); }
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

function draw(turns) {
    let timerId = setInterval(() => {
        const turn = turns.shift();
        console.log(turn);
        const { ash, zombies, humans, score: newScore } = turn.factory();
        const ashRange = new AshRange(ash);
        console.log(ashRange);
        score.value = newScore;

        canvas.add(background);
        canvas.add(ashRange);
        canvas.add(ash);
        humans.forEach(h => canvas.add(h));
        zombies.forEach(z => {
            canvas.add(z);
            // z.graphicUpdate();
        });
        // ash.graphicUpdate();
        canvas.draw();
        canvas.clear();
    }, 500);
    // setTimeout(() => clearTimeout(timerId), 10000);
}
