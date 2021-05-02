export let CELL_DECOR_FLOOR = 0;
export let CELL_DECOR_OBSTACLE = 1;
export let CELL_DECOR_WEAPON = 2;
export let CELL_DECOR_PLAYER = 3;



export class AssetManager
{
    static  getDecorImg(what)
    {
        switch (what) {
            case CELL_DECOR_FLOOR:
                return "./assets/dungeon/empty.jpg";
            case CELL_DECOR_OBSTACLE:
                return "./assets/dungeon/obstacle.png";
            case CELL_DECOR_WEAPON:
                return "./assets/dungeon/weapons/dagger3.png";
            case CELL_DECOR_PLAYER:
                return "./assets/dungeon/characters/samurai.png";
        }
    }
}
