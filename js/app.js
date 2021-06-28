import { InterfaceUi } from "./Views/InterfaceUi.js";

let menu = new InterfaceUi()
menu.displayMainMenu()

// Bouton qui permet de revenir au menu principal
$('#backToMenu').on("click", function () {
        menu.displayMainMenu()
    }
);

// Bouton qui gère l'isometric du plateau
$('#isometric').on("click", function () {
        $('#isometric').css('display', 'none')
        $('#topView').css('display', 'block')
        $('#board').addClass('isometric')
    }
);

// Bouton qui gère l'isometric du plateau
$('#topView').on("click", function () {
        $('#topView').css('display', 'none')
        $('#isometric').css('display', 'block')
        $('#board').removeClass('isometric')
    }
);

