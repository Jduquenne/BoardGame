class InterfacePlateau {
    constructor(plateau) {
        this.plateau = plateau;
    }

    // Affiche le plateau en élément HTML
    displayPlateauHtml() {
        const grid = $("#grid");
        let gridLigne = "";
        let gridCase = "";
        let key = 0;

        const cssWidth = (100 / this.plateau.nbOfCaseX) * 0.75 + "%";
        let widthInPx = null;

        for (let i = 0; i < this.plateau.nbOfCaseY; i++) {
            gridLigne = $(`<div class='lignes' id='ligne${i}'></div>`);
            grid.append(gridLigne);

            for (let j = 0; j < this.plateau.nbOfCaseX; j++) {
                gridCase = $(`<div class='case' id='${key}'></div>`);
                gridLigne.append(gridCase);

                key++;

                gridCase.css("width", cssWidth);
                if (widthInPx === null) {
                    widthInPx = document.getElementById("0").offsetWidth + "px";
                }
                gridCase.css("height", widthInPx);
            }
        }
        window.addEventListener("resize", () => {
            widthInPx = document.getElementById("0").offsetWidth + "px";
            $(".cell").css("height", widthInPx);
        });
    }
}

export { InterfacePlateau }
