import { Board } from "./Entite/Board.js";
import { InterfaceBoard } from "./Interface/InterfaceBoard.js";

let board = new Board(10,10,10,4, 2)
board.generateBoard()

let interfacePlateau = new InterfaceBoard(board);
interfacePlateau.displayPlateauHtml();

