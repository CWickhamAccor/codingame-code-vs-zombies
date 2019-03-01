const SCALE = 20;

function draw() {
    const canvas = new Canvas("canvas", 16000, 9000);
    const background = new Rectangle(0, 0, 800, 450, 'rgb(150, 150, 150)');
    const circle = new Circle(40, 40, 15, 'rgb(0, 150, 0)');

    canvas.add(background);
    canvas.add(circle);
    canvas.draw();

    let i = 0;
    const interval = setInterval(() => {
        circle.moveRight();
        canvas.draw();
        console.log('coucou');
        i++;

    },5);
    // if (i > 50) {
    //     clearInterval(interval);
    // }
}
