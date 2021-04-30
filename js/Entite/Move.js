import { Player } from "./Player.js";
import { Board } from "./Board.js"
import { Cell } from "./Cell.js";

class Move {

    constructor(cellChosenHtml) {
        this.cellChosenHtml = cellChosenHtml;
        this.formerCell = new Cell;
        this.cellChosen = new Cell;
    }

    // prepareNextPlayerToMove() {
    //     // Exchanges players :
    //     activePlayer = activePlayer === player1 ? player2 : player1;
    //
    //     // Prepares variables to use into the next part :
    //     const checkFreeCell = (cell) => {
    //         return cell.cellContent !== "Obstacle" && !cell.cellPlayer;
    //     };
    //     const becomesCellsToGo = (cell) => {
    //         cell.cellToGo = true;
    //         activePlayer.cellsToGo.push(cell);
    //     };
    //
    //     // Calculates new activePlayer's cells to go :
    //     activePlayer.cellsToGo = [];
    //
    //     for (let i = 1; i <= 3; i++) { // loops right
    //         if (activePlayer.cellPlayer.posX + i < board.nbOfCellX) {
    //             let cellRight = board.findCell(activePlayer.playerCell.coordX + i, activePlayer.cellPlayer.coordY);
    //             if (checkFreeCell(cellRight)) {
    //                 becomesCellsToGo(cellRight);
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    //     for (let i = 1; i <= 3; i++) { // loops down
    //         if (activePlayer.cellPlayer.posY + i < board.nbOfCellX) {
    //             let cellDown = board.findCell(activePlayer.playerCell.coordX, activePlayer.cellPlayer.posY + i);
    //             if (checkFreeCell(cellDown)) {
    //                 becomesCellsToGo(cellDown);
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    //     for (let i = 1; i <= 3; i++) { // loops left
    //         if (activePlayer.cellPlayer.posX - i >= 0) {
    //             let cellLeft = board.findCell(activePlayer.cellPlayer.posX - i, activePlayer.cellPlayer.posY);
    //             if (checkFreeCell(cellLeft)) {
    //                 becomesCellsToGo(cellLeft);
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    //     for (let i = 1; i <= 3; i++) { // loops up
    //         if (activePlayer.cellPlayer.posY - i >= 0) {
    //             let cellUp = board.findCell(activePlayer.cellPlayer.posX, activePlayer.cellPlayer.posY - i);
    //             if (checkFreeCell(cellUp)) {
    //                 becomesCellsToGo(cellUp);
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    //
    //     // Displays new activePlayer's cellsToGo into the Html interface :
    //     for (let i = 0; i < activePlayer.cellsToGo.length; i++) {
    //         if (activePlayer.cellsToGo[i].posY === 0) {
    //             $(`#${activePlayer.cellsToGo[i].posX}`).addClass("cellToMove");
    //         } else {
    //             $(`#${activePlayer.cellsToGo[i].posY}${activePlayer.cellsToGo[i].posX}`).addClass("cellToMove");
    //         }
    //     }
    //
    //     // Calls the playerMove method back, so as to click on another "cellToGo"
    //     activePlayer.playerMove();
    // }

    // updateFormerPosition() {
    //     // Changes Html interface of the former player cell :
    //     if (activePlayer === "player1") {
    //         document.querySelector(".player1").classList.remove("player1");
    //     } else {
    //         document.querySelector(".player2").classList.remove("player2");
    //     }
    //
    //     // Removes informations involving the former player cell in object classes :
    //     this.formerCell = activePlayer.cellPlayer;
    //     activePlayer.cellPlayer.cellContent = "0";
    //     activePlayer.cellPlayer.playerOnCell = null;
    //
    //     // Initializes player securityZone :
    //     for (let i = 0; i < activePlayer.securityZone.length; i++) {
    //         activePlayer.securityZone[i].securityCell = false;
    //     }
    //     activePlayer.securityZone = [];
    //
    //     // Initializes player cellsToGo :
    //     $(".cellToMove").removeClass("cellToMove");
    //     for (let i = 0; i < activePlayer.cellsToGo.length; i++) {
    //         activePlayer.cellsToGo[i].cellToGo = false;
    //     }
    //     activePlayer.cellsToGo = [];
    // }

}

export { Move }
