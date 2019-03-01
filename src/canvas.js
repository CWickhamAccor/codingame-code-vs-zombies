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
    draw() {
        this.elements.forEach(elem => elem.draw(this.ctx));
    }
}
