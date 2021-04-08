class Cell {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;

        this.cellContent = "0";
        this.cellWeapons = null;
        this.cellPlayer = null;

        this.diagonalOfObstacle = false;
        this.securityCell = false;
        this.cellToGo = false;
    }
}

export { Cell }
