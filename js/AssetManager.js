export let CELL_DECOR_FLOOR = 0;
export let CELL_DECOR_OBSTACLE = 1;

export class AssetManager
{
    // Récupère selon un entier le type de cellule et récupère la bonne image
    static  getWhatInsideImg(what) {
        switch (what) {
            case CELL_DECOR_FLOOR:
                return `./assets/dungeon/empty.jpg`;
            case CELL_DECOR_OBSTACLE:
                return `./assets/dungeon/obstacle.png`;
        }
    }

    // Récupére l'image d'un bonus d'une cellule
    static getBonusImg(bonus){
        return `./assets/dungeon/bonus/${bonus.image}`;
    }

    // Récupére l'image d'arme d'une cellule
    static getWeaponImg(weapon){
        return `./assets/dungeon/weapons/${weapon.image}`;
    }

    // Récupére l'image d'arme d'une cellule
    static getTrapImg(trap){
        return `./assets/dungeon/trap/${trap.image}`;
    }

    // Récupére l'image d'un joueur d'une cellule
    static getPlayerImg(player){
        return `./assets/dungeon/characters/${player.image}`;
    }
}
