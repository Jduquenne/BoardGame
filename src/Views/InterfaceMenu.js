import { Board } from "../Controllers/Board.js";

class InterfaceMenu {

    constructor() {
        // Ajout d'un autre input facilité
        this.inputs = [
            {
                name : "Hauteur du plateau",
                value : 10,
                min: 7,
                max: 12
            },
            {
                name : "Largeur du plateau",
                value : 10,
                min: 7,
                max: 12
            },
            {
                name : "Nombre d'obstacles",
                value : 10,
                min: 7,
                max: 20
            },
            {
                name : "Nombre d'armes",
                value : 3,
                min: 1,
                max: 5
            },
            {
                name : "Nombre de bonus",
                value : 3,
                min: 1,
                max: 5
            },
            {
                name : "Nombre de pièges",
                value : 3,
                min: 1,
                max: 5
            }
            
        ]
        this.controlsElt = {
            app : $('.app'),
            mainMenu: $('.mainMenu')
        }
    }

    // Affiche le menu principale
    displayInterfaceMainMenu() {
        this.controlsElt.mainMenu.empty()
        this.createBrand()
        this.createMenuSelect()

        $('#newGame').on("click", function () {
                this.startDefaultGame()
            }.bind(this)
        );

        $('#options').on("click", function () {
            this.displayInterfaceOptions()
            }.bind(this)
        );
    }

    // Affiche le menu options
    displayInterfaceOptions() {
        this.controlsElt.mainMenu.empty()
        this.createBrand()
        this.createMenuSelectOptions()

        $('#startGame').on("click", function () {
                this.startCustomGame()
            }.bind(this)
        );

        $('#returnMainMenu').on("click", function () {
                this.displayInterfaceMainMenu()
            }.bind(this)
        );
    }

    // Fonction qui permet de lancer une partie par défaut
    startDefaultGame() {
        $('.game').css('display', 'flex');
        let board = new Board(10,10,10,3,3,3)
        board.initGame()
    }

    // Fonction qui permet de lancer une partie customisé
    startCustomGame() {
        $('.game').css('display', 'flex');
        let board = new Board(this.inputs[0].value,this.inputs[1].value, this.inputs[2].value, this.inputs[3].value, this.inputs[4].value, this.inputs[5].value)
        board.initGame()
    }

    // Cache le menu prinpal
    removeInterfaceMenu() {
        this.controlsElt.mainMenu.empty()
        this.controlsElt.mainMenu.remove()
    }

    // Créer le logo
    createBrand() {
        const logo = $(`<div class='title h150px fatFont'>Board Game</div>`)
        this.controlsElt.mainMenu.append(logo)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

    // Créer le menu principal
    createMenuSelect() {
        const menuSelectDiv = $(`<div class="menuSelect"></div>`)

        const btnNewGame = $(`<button class="btn borderPixel fatFont" id="newGame">Lancer le combat</button>`)
        const btnOptions = $(`<button class="btn borderPixel fatFont" id="options">Paramétres</button>`)

        menuSelectDiv.append(btnNewGame, btnOptions)
        this.controlsElt.mainMenu.append(menuSelectDiv)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

    // Créer le menu option
    createMenuSelectOptions() {
        const menuSelectOptions = $(`<div class="menuSelectOptions"></div>`)
        for (let i = 0; i < this.inputs.length; i++) {
            const spinnerTitle = $(`<div class="whiteFont">${this.inputs[i].name}</div>`)

            const nbSpinner = $(`<div class="nb-spinner-${i}"></div>`)
            const input = $(`<input disabled class="spinner" type="text" value="${this.inputs[i].value}" min="${this.inputs[i].min}" max="${this.inputs[i].max}" step="1"/>`)

            const btnMinus = $(`<button class="btn borderPixel fatFont" id="decrement">-</button>`)
            const btnAdd = $(`<button class="btn borderPixel fatFont" id="increment">+</button>`)

            btnMinus.on("click", function () {
                if (input.val() > this.inputs[i].min ) {
                    input.val(parseInt(input.val()) - 1)
                    this.inputs[i].value = input.val()
                }
                }.bind(this)
            );

            btnAdd.on("click", function () {
                if (input.val() < this.inputs[i].max ) {
                    input.val(parseInt(input.val()) + 1)
                    this.inputs[i].value = input.val()
                }
                }.bind(this)
            );

            nbSpinner.append(spinnerTitle, btnAdd, input, btnMinus)
            menuSelectOptions.append(nbSpinner)
        }

        const groupBtn = $(`<div class="flex h150px"></div>`)

        const btnReturn = $(`<button class="btn borderPixel fatFont" id="returnMainMenu">Retour</button>`)
        const btnStartBattle = $(`<button class="btn borderPixel fatFont" id="startGame">Lancer le combat</button>`)

        groupBtn.append(btnStartBattle, btnReturn)

        this.controlsElt.mainMenu.append(menuSelectOptions, groupBtn)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

}
export { InterfaceMenu }