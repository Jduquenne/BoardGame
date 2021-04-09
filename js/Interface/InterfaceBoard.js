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

        // Loop Cases gardent la même forme "Carré"
        // const cssWidth = ((document.querySelector('.plateau').offsetWidth * 0.75) / this.board.nbOfCellX)  + "px";

        for (let i = 0; i < this.board.nbOfCellY; i++) {

            gridLine = $(`<div class='lignes' id='ligne${i}'></div>`);
            grid.append(gridLine);

            for (let j = 0; j < this.board.nbOfCellX; j++) {
                //let caseContainer = InterfaceCell::display(this.plateau.plateauArray[i*j+j])

                gridCell = $(`<div class='case floor' id='${key}'></div>`);

                if (this.board.boardArray[key].cellContent === "Obstacle") {
                    // gridCell.addClass("obstacle");
                    gridCell.addClass("cube");
                }

                if (this.board.boardArray[key].cellWeapons) {
                    gridCell.addClass(this.board.boardArray[key].cellWeapons.toString());
                    gridCell.css("background-color", "yellow");
                }

                if (this.board.boardArray[key].cellPlayer) {
                    gridCell.addClass(this.board.boardArray[key].cellPlayer.toString());
                    gridCell.css("background-color", "black");
                }

                // gridCell.css("width", cssWidth);
                // gridCell.css("height", cssWidth);

                key++;
                gridLine.append(gridCell);
            }
        }
        // Height = Width
        // window.addEventListener("resize", () => {
        //     const cssWidth = ((document.querySelector('.plateau').offsetWidth * 0.75) / this.board.nbOfCellX) + "px";
        //     $(".case").css({
        //         "height": cssWidth,
        //         'width': cssWidth
        //     });
        //     $('.cube, .cube:after, .cube:before').css(
        //         {
        //             'height': cssWidth,
        //             "width": cssWidth
        //         });
        //     $('.cube:after').css(
        //         {
        //             '-webkit-transform': 'translateY(' + cssWidth + ')'
        //     });
        //     $('.cube:before').css(
        //         {
        //             '-webkit-transform': 'translateY(' + cssWidth + ')'
        //     });
        // })
    }
}

export { InterfaceBoard }
