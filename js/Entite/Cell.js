import {
    CELL_DECOR_FLOOR,
    CELL_DECOR_OBSTACLE,
    CELL_DECOR_WEAPON,
    CELL_DECOR_PLAYER,
    AssetManager
} from "../AssetManager.js";


class Cell {

    constructor(id, decor) {
        this.id = id;
        this.decor = decor;
        this.container = this.initContainer();
        this.setDecor("", this.decor, this.decor);
    }

    initContainer(){
        return $(`<div class="cell" id="${this.id}"></div>`);
    }

    setDecor(classAdd, decor, floor){
        this.container.css('background-image', "url('"+ AssetManager.getDecorImg(decor) +"'), url('"+ AssetManager.getDecorImg(floor) +"')");
        this.container.addClass(classAdd);
        // A voir avec Sébastien ( récuperer before, after avec la meme img (getDecorImg)
    }

    isEmpty(){
        return this.decor === CELL_DECOR_FLOOR;
    }

    isObstacle(){
        return this.decor === CELL_DECOR_OBSTACLE;
    }

    isWeapon(){
        return this.decor === CELL_DECOR_WEAPON;
    }

    isPlayer(){
        return this.decor === CELL_DECOR_PLAYER;
    }
}

export { Cell }
