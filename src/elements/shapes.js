class Rectangle extends DrawableElement{
    constructor(x, y, w, h, color) {
        super(x, y, color);
        this.w = w;
        this.h = h;
        this.rect();
    }
    // moveRight() {
    //     this.x ++;
    //     moveTo(this.x, this.y);
    // }
}

class Circle extends DrawableElement{
    constructor(x, y, r, color) {
        super(x, y, color);
        this.r = r;
        this.circle();
    }
    moveRight() {
        this.x ++;
        moveTo(this.x, this.y);
    }
}
