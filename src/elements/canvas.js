class Canvas {
    constructor(id, width, height) {
        this.canvas = document.querySelector(id);
        this.canvas.width = width / SCALE;
        this.canvas.height = height / SCALE;
        this.ctx = this.canvas.getContext("2d");
        this.elements = [];
    }
    add(elem) {
        this.elements.push(elem);
    }
    clear() {
        this.elements = [];
    }
    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.elements.forEach(elem => elem.draw(this.ctx));
    }
    update(turns, maxScore) {
        if (turns.length === 0) {
            return maxScore;
        }
        const turn = turns.shift();
        const { ash, zombies, humans, score: newScore } = turn.factory();
        const ashRange = new AshRange(ash);
        if (newScore > maxScore) {
            maxScore = newScore
        }
        this.add(ashRange);
        this.add(ash);
        humans.forEach(h => this.add(h));
        zombies.forEach(z => {
            this.add(z);
        });
        return maxScore;
    }
}

class Score {
    constructor() {
        this.scoreBoard = document.getElementById("score");
    }
    set value(value) {
        this.scoreBoard.innerText = value;
    }
}
