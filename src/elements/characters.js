class Zombie extends Circle {
    constructor(x, y, dirx, diry, id) {
        super(x, y, 200, 'rgb(75, 0, 0)');
        this.dir = { x: dirx, y: diry};
        this.id = id;
    }
    graphicUpdate() {
        this.update(4);
    }
    update(speed = 400) {
        this.move(this.dir.x, this.dir.y, speed);
    }
}

class Human extends Circle {
    constructor(x, y, id) {
        super(x, y, 200, 'rgb(75, 75, 255)');
        this.id = id;
    }
}

class Ash extends Circle {
    constructor(x, y, dirx, diry) {
        super(x, y, 200, 'rgb(0, 150, 0)');
        this.directions = [];
        this.dir = { x: dirx, y: diry };
    }
    updateDirection() {
        if (this.directions.length === 0) {
            throw new Error('no direction set to update');
        }
        this.dir = this.directions.pop();
    }
    graphicUpdate() {
        this.update(10);
        this.range.move(this.x, this.y, 10);
    }
    update(speed = 1000) {
        const { x, y } = this.dir;
        this.move(x, y, speed);
    }
}

class AshRange extends Circle {
    constructor(ash) {
        super(ash.x, ash.y, 1000, 'rgba(200, 150, 0, 0.5)');
        ash.range = this;
    }
}
