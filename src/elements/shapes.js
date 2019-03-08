class Rectangle extends DrawableElement{
    constructor(x, y, w, h, color) {
        super(x, y, color);
        this.w = w;
        this.h = h;
        this.shapeAction = this.rect;
    }
}

class Circle extends DrawableElement{
    constructor(x, y, r, color) {
        super(x, y, color);
        this.r = r;
        this.shapeAction = this.circle;
    }
    moveRight() {
        this.x += 1;
    }
}
