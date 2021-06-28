// Classe Arme - Les armes sont manipuler par les joueurs
class Weapon {
    /**
     *
     * @param {string} name
     * @param {number} damage
     * @param {string} image
     */
    constructor(name,damage,image){
        this.name = name;
        this.damage = damage;
        this.image = image;
    }

}
export { Weapon }
