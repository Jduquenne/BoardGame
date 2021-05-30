import {
    CELL_DECOR_FLOOR,
    CELL_DECOR_OBSTACLE,
    CELL_DECOR_WEAPON,
    CELL_DECOR_PLAYER,
    AssetManager
} from "../AssetManager.js";


class Cell {

    constructor(id, decor, onClick) {
        this.id = id;
        this.decor = decor;
        this.container = this.initContainer();
        this.isMovable = false;
        this.securityZone = false;
        this.weapon = null;
        this.player = null;
        this.onClick = onClick
        this.display();
    }

    initContainer() {
        let container =  $(`<div class="cell" id="${this.id}"></div>`);
        $(container).on('click', () => this.onClick(this));

        return container;
    }

    display() {
        this.initContainer()
        this.container.removeAttr("style");
        this.container.removeClass('obstacle cellToMove weapon player');

        this.container.css('background-image', "url('" + AssetManager.getWhatInsideImg(this.decor) + "')");

        if (this.decor === CELL_DECOR_OBSTACLE) {
            this.container.addClass('obstacle');
        }

        if (this.isMovable) {
            this.container.addClass('cellToMove');
        }

        if (this.weapon) {
            this.container.css('background-image', "url('" + AssetManager.getWeaponImg(this.weapon) + "'), url('" + AssetManager.getWhatInsideImg(this.decor) + "')");
            this.container.addClass('weapon');
        }

        if (this.player) {
            this.container.css('background-image', "url('" + AssetManager.getPlayerImg(this.player) + "'), url('" + AssetManager.getWhatInsideImg(this.decor) + "')");
            this.container.addClass('player');
        }
    }

    // SET FUNCTIONS

    setDecor(decor) {
        this.decor = decor;
        this.display()
    }

    setWeapon(weapon) {
        this.weapon = weapon;
        this.display();
    }

    setPlayer(player) {
        this.player = player;
        this.display();
    }

    setCellToGo() {
        this.isMovable = true;
        this.display();
    }

    setSecurityZone() {
        this.securityZone = true;
        this.display();
    }

    // GET FUNCTIONS

    // CHECK FUNCTIONS

    isEmpty() {
        return this.decor === CELL_DECOR_FLOOR;
    }

    isSecurityZone() {
        return this.securityZone === true;
    }

    hasWeapon() {
        return this.weapon !== null;
    }

    hasPlayer() {
        return this.player !== null;
    }

    // REMOVE FUNCTIONS

    removeWeapon() {
        this.weapon = null;
        this.display();
    }

    removePlayer() {
        this.player = null;
        this.display();
    }

    removeCellToGo() {
        this.isMovable = false;
        this.display();
    }

    removeSecurityZone() {
        this.securityZone = false;
        this.display();
    }

}

export {Cell}
