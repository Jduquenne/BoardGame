export const CELL_DECOR_FLOOR = 0;
export const CELL_DECOR_OBSTACLE = 1;

export class AssetManager
{
    static  getDecorImg(what)
    {
        switch (what) {
            case CELL_DECOR_FLOOR:
                return "./assets/dungeon/empty.jpg";
            case CELL_DECOR_OBSTACLE:
                return "./assets/dungeon/obstacle.png";
        }
    }
}
