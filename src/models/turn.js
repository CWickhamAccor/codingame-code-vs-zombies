class Turn {
    constructor(ash, zombies, humans, score) {
        this.ash = {
            x: ash.x,
            y: ash.y,
            dir: { x: ash.dir.x, y: ash.dir.y }
        };
        this.zombies = zombies.map(z => ({
            x: z.x,
            y: z.y,
            dir: { x: z.dir.x, y: z.dir.y },
            id: z.id,
        }));
        this.humans = humans.map(h => ({
            x: h.x,
            y: h.y,
            id: h.id,
        }));
        this.score = score;
    }

    factory() {
        return {
            ash: new Ash(this.ash.x, this.ash.y, this.ash.dir.x, this.ash.dir.y),
            zombies: this.zombies.map(z => new Zombie(z.x, z.y, z.dir.x, z.dir.y, z.id)),
            humans: this.humans.map(h => new Human(h.x, h.y, h.id)),
            score: this.score,
        };
    }
}
