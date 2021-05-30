
export let CELL_DECOR_FLOOR = 0;
export let CELL_DECOR_OBSTACLE = 1;
export let CELL_DECOR_WEAPON = 2;
export let CELL_DECOR_PLAYER = 3;

export class AssetManager
{
    static  getWhatInsideImg(what) {
        switch (what) {
            case CELL_DECOR_FLOOR:
                return `./assets/dungeon/empty.jpg`;
            case CELL_DECOR_OBSTACLE:
                return `./assets/dungeon/obstacle.png`;
        }
    }

    static getWeaponImg(weapon){
        return `./assets/dungeon/weapons/${weapon.image}`;

    }

    static getPlayerImg(player){
        return `./assets/dungeon/characters/${player.image}`;
    }
}
