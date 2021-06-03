import {Weapon} from "./Weapon.js";

class Player {
    /**
     *
     * @param {string} name
     * @param {number} health
     * @param {Weapon} weapon
     * @param {string} image
     */
    constructor(name,health,weapon,image) {
        this.name = name;
        this.health = health;
        this.weapon = new Weapon('Epée de boisaille',5, "./assets/dungeon/weapons/basic_weapon.png",);
        this.image = image;
    }
}

export { Player };
