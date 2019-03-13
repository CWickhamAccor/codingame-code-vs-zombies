class DrawableElement {
    constructor(x, y, color, action) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shapeAction = () => {};
    }
    draw(ctx) {
        this.shapeAction(ctx);
    }
    rect(ctx) {
        ctx.beginPath();
        ctx.rect(this.x / SCALE, this.y / SCALE, this.w / SCALE, this.h / SCALE);
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
    }
    circle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x / SCALE, this.y / SCALE, this.r / SCALE, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        // ctx.stroke();
        ctx.fill();
    }
    move(x, y, speed) {
        const distance = getDistance(this.x, this.y, x, y);
        const ratio = speed < distance ? speed/distance : 1;
        this.x = this.x + ((x - this.x) * ratio);
        this.y = this.y + ((y - this.y) * ratio);
    }
}
