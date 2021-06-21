import { InterfaceUi } from "./View/InterfaceUi.js";

let menu = new InterfaceUi()
menu.displayMainMenu()

$('#backToMenu').on("click", function () {
        menu.displayMainMenu()
    }
);

$('#isometric').on("click", function () {
        $('#isometric').css('display', 'none')
        $('#topView').css('display', 'block')
        $('#board').addClass('isometric')
    }
);

$('#topView').on("click", function () {
        $('#topView').css('display', 'none')
        $('#isometric').css('display', 'block')
        $('#board').removeClass('isometric')
    }
);

