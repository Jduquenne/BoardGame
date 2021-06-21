import { Board } from "../Controllers/Board.js";

class InterfaceMenu {

    constructor() {
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
            }
        ]

        this.controlsElt = {
            app : $('.app'),
            mainMenu: $('.mainMenu')
        }
    }

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

    startDefaultGame() {
        $('.game').css('display', 'flex');
        let board = new Board(10,10)
        board.initGame()
    }

    startCustomGame() {
        $('.game').css('display', 'flex');
        let board = new Board(this.inputs[0].value,this.inputs[1].value)
        board.initGame()
    }

    removeInterfaceMenu() {
        this.controlsElt.mainMenu.empty()
        this.controlsElt.mainMenu.remove()
    }

    createBrand() {
        const logo = $(`<h1 class='title fatFont'>Board Game</h1>`)
        this.controlsElt.mainMenu.append(logo)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

    createMenuSelect() {
        const menuSelectDiv = $(`<div class="menuSelect"></div>`)

        const btnNewGame = $(`<button class="btn borderPixel fatFont" id="newGame">Lancer le combat</button>`)
        const btnOptions = $(`<button class="btn borderPixel fatFont" id="options">Paramétres</button>`)

        menuSelectDiv.append(btnNewGame, btnOptions)
        this.controlsElt.mainMenu.append(menuSelectDiv)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

    createMenuSelectOptions() {
        const menuSelectOptions = $(`<div class="menuSelectOptions"></div>`)
        const groupSpinner = $(`<div class="groupSpinner"></div>`)
        for (let i = 0; i < this.inputs.length; i++) {
            const spinnerTitle = $(`<h2 class="whiteFont">${this.inputs[i].name}</h2>`)

            const nbSpinner = $(`<div class="nb-spinner"></div>`)
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

            nbSpinner.append(btnMinus, input, btnAdd)
            groupSpinner.append(spinnerTitle, nbSpinner)
        }
        menuSelectOptions.append(groupSpinner)

        const groupBtn = $(`<div class="groupBtnColumn marginTop"></div>`)

        const btnReturn = $(`<button class="btn borderPixel fatFont" id="returnMainMenu">Retour</button>`)
        const btnStartBattle = $(`<button class="btn borderPixel fatFont" id="startGame">Lancer le combat</button>`)

        groupBtn.append(btnStartBattle, btnReturn)

        this.controlsElt.mainMenu.append(menuSelectOptions, groupBtn)
        this.controlsElt.app.append(this.controlsElt.mainMenu)
    }

}
export { InterfaceMenu }