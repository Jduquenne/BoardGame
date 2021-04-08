class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.health = 100;
        this.weapon = null;
        this.defense = false;

    }

    toString() {
        return this.id;
    }

}

export { Player };
