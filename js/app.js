import { InterfaceUi } from "./Interface/InterfaceUi.js";

let menu = new InterfaceUi()
menu.displayMainMenu()

$('#backToMenu').on("click", function () {

        menu.displayMainMenu()
    }.bind(this)
);

