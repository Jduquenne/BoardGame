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

            gridLine = $(`<div class='lignes' id='ligne${i}'></div>`);
            grid.append(gridLine);

            for (let j = 0; j < this.board.nbOfCellX; j++) {
                gridCell = $(`<div class='case floor' id='${key}'></div>`);

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
                    gridCell.css("background-color", "black");
                }

                key++;
                gridLine.append(gridCell);
            }
        }
    }

    isometricToTopView () {
        $(".btnIsoToTop").click(function () {
            $("#grid")
                .animate({transform: 'rotateX(0deg)'},2000);
        })
    }
}

export { InterfaceBoard }
