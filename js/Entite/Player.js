class Player {
    constructor(name,health,image,line=null,column=null) {
        this.name = name;
        this.health = health;
        this.image = image;
        this.line = line;
        this.column = column;
        this.container = null;
    }

    setPlayerContainer(element){
        // Si le container n'existe pas il est crée
        if(this.container===null) {
            this.container = [];
        }
        element.line = this.line;
        element.column = this.column;
        // Push l'elt dans le container
        this.container.push(element);
    }
}

export { Player };
