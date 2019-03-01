class DrawableElement {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = new Path2D();
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    }
    moveTo(x, y) {
        this.shape.moveTo(x, y);
    }
    rect() {
        this.shape.rect(this.x, this.y, this.w, this.h);
    }
    circle() {
        this.shape.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    }
}
