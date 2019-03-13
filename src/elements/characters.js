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
    constructor(x, y, dirx, diry, color) {
        super(x, y, 200, color);
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
        super(ash.x, ash.y, 2000, 'rgba(200, 50, 10, 0.25)');
        ash.range = this;
    }
}
