import { Cell } from "./Cell.js";
import { Weapon } from "./Weapon.js";
import { Player } from "./Player.js";

class Board {

    constructor(nbOfCellX, nbOfCellY, nbObstacles, nbWeapons, nbPlayers) {
        this.nbOfCellX = nbOfCellX;
        this.nbOfCellY = nbOfCellY;
        this.totalNbOfCells = this.nbOfCellX * this.nbOfCellY;

        this.nbObstacles = nbObstacles;
        this.nbWeapons = nbWeapons;
        this.nbPlayers = nbPlayers;

        this.boardArray = [];

    }
    generateBoard() {
        for (let i = 0; i < this.totalNbOfCells; i++) {
            let newCell = new Cell(i % this.nbOfCellX, Math.trunc(i / this.nbOfCellX));
            this.boardArray.push(newCell);
        }
        this.addRandomObstacles();
        this.addWeapons();
        this.addPlayers();
    }

    // Donne la position d'une case du plateau
    trouverCase(x, y) {
        return this.boardArray.find((Cell) => Cell.posX === x && Cell.posY === y);
    }

    // Retourne les cases vides du plateau
    returnEmptyCells() {
        return this.boardArray.filter((Cell) => Cell.cellContent === "0");
    }

    returnCasesObstacles() {
        return this.boardArray.filter((Cell) => Cell.cellContent === "0" && Cell.diagonalOfObstacle === false);
    }

    returnCasesPlayer() {
        return this.boardArray.filter((Cell) => Cell.cellContent === "0" && Cell.securityCell === false);
    }

    // Ajouter obsctables sur cases vide aléatoires
    addRandomObstacles() {
        for (let i = 0; i < this.nbObstacles; i++) {
            let emptyCellsForObstacles = this.returnCasesObstacles();
            let index = Math.floor(Math.random() * emptyCellsForObstacles.length);
            emptyCellsForObstacles[index].cellContent = "Obstacle";
        }

    }
    // Ajouter armes sur cases vide aléatoires
    addWeapons() {
        for (let i = 0; i < this.nbWeapons; i++) {
            let emptyCells = this.returnEmptyCells();
            let index = Math.floor(Math.random() * emptyCells.length);
            emptyCells[index].cellContent = "Weapon";
            emptyCells[index].cellWeapons = new Weapon([i], 'arme', 10, 'unknown');
        }
    }

    // Ajouter joueurs sur case vide aléatoires
    addPlayers() {
        for (let i = 0; i < this.nbPlayers; i++){
            let emptyCells = this.returnCasesPlayer();
            let index = Math.floor(Math.random() * emptyCells.length);
            let playerCase = emptyCells[index];

            playerCase.cellContent = "Player";
            playerCase.cellPlayer = new Player('player'+[i], 'player'+[i]+'nom');
        }
    }
}

export { Board }
