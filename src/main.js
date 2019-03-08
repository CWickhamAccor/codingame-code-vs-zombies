function getInputs() {
    const [x, y] = readline().split(' ')
        .map(e => parseInt(e));
    const ash = new Ash(x, y);
    const humans = [];
    const zombies = [];

    const humanCount = parseInt(readline());
    for (let i = 0; i < humanCount; i++) {
        const [id, x, y] = readline().split(' ')
            .map(e => parseInt(e));
        humans.push(new Human(x, y, id));
    }
    const zombieCount = parseInt(readline());
    for (let i = 0; i < zombieCount; i++) {
        const [id, x, y, dirx, diry] = readline().split(' ')
            .map(e => parseInt(e));
        zombies.push(new Zombie(x, y, dirx, diry, id));
    }
    return { ash, humans, zombies };
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randomDir() {
    return { x: Math.random()*16000, y: Math.random()*9000 };
}

function simulate(ash, humans, zombies) {
    let score = 0;
    const ashDirections = [];
    const turns = [];

    for(let i = 0; i < 50; i++) {
        const dir = randomDir();
        ashDirections.push(dir);
    }

    // while(zombies.length && humans.length) {
    for(let i = 0; i < 50; i++) {
        ash.directions.push(ashDirections.pop());
        ash.updateDirection();

        zombies[0].dir.x = humans[0].x;
        zombies[0].dir.y = humans[0].y;

        zombies.forEach(z => z.update(400));
        ash.update(1000);
        turns.push(new Turn(ash, zombies, humans, score));
    }



    return turns;
}

function main() {
    init();
    const { ash, humans, zombies } = getInputs();

    const data = simulate(ash, humans, zombies);

    // console.log(data);
    draw(data);

    print('16000 9000'); // Your destination coordinates
}
