import { Player } from "./Player.js";
import {CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE, AssetManager} from "../AssetManager.js";

class Cell {

    constructor(id, decor) {
        this.id = id;
        this.decor = decor;
        this.container = this.initContainer();
        this.setDecor(this.decor);
    }

    initContainer(){
        return $(`<div class="cell" id="${this.id}"></div>`);
    }

    setDecor(decor, classAdd){
        this.container.css('background-image', "url('"+ AssetManager.getDecorImg(decor) +"')");
        this.container.addClass(classAdd);
        // A voir avec Sébastien ( récuperer before, after avec la meme img (getDecorImg)
    }

    setContainer(element){
        // Si un container n'est pas crée, il est crée
        if(this.container===null) {
            this.container = [];
        }
        // On place un element dans le container
        this.container.push(element);
    }

    isEmpty(){
        return this.decor === CELL_DECOR_FLOOR;
    }

    isObstacle(){
        return this.decor === CELL_DECOR_OBSTACLE;
    }
}

export { Cell }
