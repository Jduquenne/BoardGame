import {Weapon} from "./Weapon.js";

// Classe Joueur
class Player {
    /**
     *
     * @param {Object} options
     */
    constructor(options) {
        this.name = options.name || "Joueur";
        this.health = options.health || "100";
        this.defense = false;
        this.weapon = new Weapon('Epée de boisaille',10, "basic_weapon.png");
        this.image = options.image;

        // MaxMove représente la distance de déplacement d'un joueur, il est donc possible de donner la possibilité au joueur de se déplacer plus ou moins loin
        this.maxMove = 3;
    }
}

export { Player };
