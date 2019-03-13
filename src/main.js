const GEN_COUNT = 4;
const POPULATION = 5;

const fibSeq = {
    0: 0,
    1: 1,
    2: 1,
};

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

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
    // return { x: 11000, y: 9000 };
    return { x: Math.random()*16000, y: Math.random()*9000 };
}

function getTarget(zombie, humans, ash) {
    let target = 0;
    let minDistance = Infinity;
    humans.forEach((h, i) => {
        const distance = getDistance(zombie.x, zombie.y, h.x, h.y);
        if (distance < minDistance) {
            minDistance = distance;
            target = i;
        }
    });
    if (getDistance(zombie.x, zombie.y, ash.x, ash.y) < minDistance) {
        target = -1;
    }
    return target;
}

function fib(n) {
    if (!fibSeq[n]) {
        fibSeq[n] = fib(n-1) + fib(n - 2);
    }
    return fibSeq[n];
}

function calcScore(humans, combo) {
    const zombieWorth = Math.pow(humans.length, 2) * 10;
    const score = combo > 0 ? zombieWorth * fib(combo + 2) : zombieWorth;
    return score;
}

function simulate(ash, humans, zombies, color) {
    let score = 0;
    const ashDirections = [];
    const turns = [];

    for(let i = 0; i < 50; i++) {
        const dir = randomDir();
        ashDirections.push(dir);
    }

    while(zombies.length && humans.length) {
        ash.directions.push(ashDirections.pop());
        ash.updateDirection();
        ash.update(1000);

        zombies.forEach(z => {
            const target = getTarget(z, humans, ash);
            if (target === -1) {
                z.dir.x = ash.x;
                z.dir.y = ash.y;
            } else {
                z.dir.x = humans[target].x;
                z.dir.y = humans[target].y;
            }
            z.update(400)
        });

        let combo = 0;
        zombies = zombies.filter((z, i) => {
            if (getDistance(ash.x, ash.y, z.x, z.y) <= 2000) {
                // console.log('got ya', combo);
                score += calcScore(humans, combo);
                combo++;
                return false;
            }
            humans.forEach((h, j) => {
                if (getDistance(z.x, z.y, h.x, h.y) <= 400) {
                    // console.log('ded');
                    humans.splice(j, 1);
                }
            });
            return true;
        });
        turns.push(new Turn(ash, zombies, humans, score, color));
    }



    return turns;
}

async function main() {
    init();
    for (let i = 0; i < GEN_COUNT; i++) {
        const games = [];
        for (let j = 0; j < POPULATION; j++) {
            const {ash, humans, zombies} = getInputs();
            const color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;

            games.push(simulate(ash, humans, zombies, color));
        }
        games.sort((d1, d2) => d1.score - d2.score);
        await draw(games, i);
    }

    print('16000 9000'); // Your destination coordinates
}
