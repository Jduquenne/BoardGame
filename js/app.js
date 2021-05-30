import { Board } from "./Engine/Board.js";
import { AssetManager } from "./AssetManager.js";

let board = new Board(10,10)
board.initGame(10, 4, 2)


$( "#randomWeapons" ).click(function() {
    board.randomWeaponCoordinates()
});
