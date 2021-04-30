import { InterfaceCell } from "./InterfaceCell.js";

class InterfaceBoard {

    constructor(board) {
        this.board = board;
    }

    // Affiche le plateau en élément HTML
    displayBoardHtml() {
        const grid = $("#grid");
        let gridLine = "";
        let gridCell = "";
        let key = 0;

        for (let i = 0; i < this.board.maxColumn; i++) {

            gridLine = $(`<div class='lines' id='line${i}'></div>`);
            grid.append(gridLine);

            for (let j = 0; j < this.board.maxLine; j++) {
                gridCell = $(`<div class='cell floor' id='cell${key}'></div>`);

                if (this.board.boardArray[key].cellContent === 1) {
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
