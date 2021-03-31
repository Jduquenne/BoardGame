class Case {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;

        this.cellContent = "0";
        this.weaponOnCell = null;
        this.playerOnCell = null;

        this.diagonalOfObstacle = false;
        this.securityCell = false;
        this.cellToGo = false;
    }
}

export { Case }
