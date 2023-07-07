import {Weapon} from "./Weapon.js";

// Classe Joueur
class Player {
    /**
     *
     * @param string name
     * @param number health
     * @param string image
     * @param number maxMove
     * 
     */
    constructor(name, health, image, maxMove) {
        this.name = name || "Joueur";
        this.health = health || "100";
        this.defense = false;
        this.weapon = new Weapon('Epée de boisaille',10, "basic_weapon.png");
        this.image = image;

        // MaxMove représente la distance de déplacement d'un joueur, il est donc possible de donner la possibilité au joueur de se déplacer plus ou moins loin
        this.maxMove = maxMove;
    }
}

export { Player };
