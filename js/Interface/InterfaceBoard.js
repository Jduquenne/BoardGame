import { InterfaceCell } from "./InterfaceCell.js";

class InterfaceBoard {

    constructor(board) {
        this.board = board;
    }

    // Affiche le plateau en élément HTML
    displayPlateauHtml() {
        const grid = $("#grid");
        let gridLine = "";
        let gridCell = "";
        let key = 0;

        for (let i = 0; i < this.board.nbOfCellY; i++) {

            gridLine = $(`<div class='lines' id='line${i}'></div>`);
            grid.append(gridLine);

            for (let j = 0; j < this.board.nbOfCellX; j++) {
                gridCell = $(`<div class='cell floor' id='cell${key}'></div>`);

                if (this.board.boardArray[key].cellContent === "Obstacle") {
                    gridCell.addClass("obstacle");
                }

                if (this.board.boardArray[key].cellWeapons) {
                    // gridCell.addClass(this.board.boardArray[key].cellWeapons.toString());
                    gridCell.removeClass("floor");
                    gridCell.addClass("weapon");
                }

                if (this.board.boardArray[key].cellPlayer) {
                    // gridCell.addClass(this.board.boardArray[key].cellPlayer.toString());
                    gridCell.addClass("player");
                }
                gridLine.append(gridCell);
                key++;
            }
        }
    }
}

export { InterfaceBoard }
