import { Case } from "./Case.js";

class Plateau {

    constructor(nbOfCaseX, nbOfCaseY, nbObstacles, nbArmes) {
        this.nbOfCaseX = nbOfCaseX;
        this.nbOfCaseY = nbOfCaseY;
        this.totalNbOfCases = this.nbOfCaseX * this.nbOfCaseY;

        this.nbObstacles = nbObstacles;
        this.nbArmes = nbArmes;

        this.plateauArray = [];
    }

    genererPlateau() {
        for (let i = 0; i < this.totalNbOfCases; i++) {
            let newCell = new Case(i % this.nbOfCaseX, Math.trunc(i / this.nbOfCaseX));
            this.plateauArray.push(newCell);
        }
    }

}

export { Plateau }
