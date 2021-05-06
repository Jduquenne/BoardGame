
export let CELL_DECOR_FLOOR = 0;
export let CELL_DECOR_OBSTACLE = 1;
export let CELL_DECOR_WEAPON = 2;
export let CELL_DECOR_PLAYER = 3;

export class AssetManager
{
    static  getDecorImg(what, theme, name) {
        switch (what) {
            case CELL_DECOR_FLOOR:
                return `./assets/${theme}/empty.jpg`;
            case CELL_DECOR_OBSTACLE:
                return `./assets/${theme}/obstacle.png`;
            case CELL_DECOR_WEAPON:
                return `./assets/${theme}/weapons/${name}.png`;
            case CELL_DECOR_PLAYER:
                return `./assets/${theme}/characters/${name}.png`;
        }

    }
}
