class Player {
    constructor(name,health,image) {
        this.name = name;
        this.health = health;
        this.image = image;
        this.container = null;
    }

    insertPlayer(index) {
        $(`#c${index}`).addClass(this.image);
    }
}

export { Player };
