import { Board } from "./Entite/Board.js";
import { InterfaceBoard } from "./Interface/InterfaceBoard.js";
import { Weapon } from "./Entite/Weapon.js";


let board = new Board(10,10, "dungeon" )
board.initGame(10, 4, 2)

$(document).ready(function(){
    $('.btnIsoToTop').click(function(e){
        $("#board").addClass("isometric")
    });
    $('.btnTopToIso').click(function(e){
        $("#board").removeClass("isometric")
    });
})
