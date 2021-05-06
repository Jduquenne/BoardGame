import {
    CELL_DECOR_FLOOR,
    CELL_DECOR_OBSTACLE,
    CELL_DECOR_WEAPON,
    CELL_DECOR_PLAYER,
    AssetManager
} from "../AssetManager.js";


class Cell {

    constructor(id, decor, theme) {
        this.id = id;
        this.decor = decor;
        this.container = this.initContainer();

        this.setDecor(this.decor, theme);
    }

    initContainer(){
        return $(`<div class="cell" id="${this.id}"></div>`);
    }

    setDecor(decor, theme, floor, classAdd, name) {
        if (decor === CELL_DECOR_FLOOR) {
            this.container.css('background-image', "url('"+ AssetManager.getDecorImg(decor, theme) +"')");
        } else {
            this.container.css('background-image', "url('"+ AssetManager.getDecorImg(decor, theme, name) +"'), url('"+ AssetManager.getDecorImg(floor, theme) +"')");
            this.container.addClass(classAdd);
            // TODO A voir avec Sébastien ( récuperer before, after avec la meme img (getDecorImg)
        }
    }
    //
    // addInStack(what)
    //
    // deleteFromStack(what)

    isEmpty(){
        return this.decor === CELL_DECOR_FLOOR;
    }
}

export { Cell }
