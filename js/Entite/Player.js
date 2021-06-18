import {Weapon} from "./Weapon.js";
import {AssetManager} from "../AssetManager.js";

class Player {
    /**
     *
     * @param {string} name
     * @param {number} health
     * @param {Weapon} weapon
     * @param {string} image
     */
    constructor(options) {
        this.name = options.name || "Joueur";
        this.health = options.health || "100";
        this.defense = false;
        this.weapon = new Weapon('Epée de boisaille',10, "basic_weapon.png");
        this.maxMove = 3;
        this.image = options.image;
    }
}

export { Player };
