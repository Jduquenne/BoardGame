import { Cell } from "./Cell.js";
import {CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE, CELL_DECOR_WEAPON, CELL_DECOR_PLAYER} from "../AssetManager.js";

class Board {

    constructor(maxLine, maxColumn, world="dungeon") {
        this.maxLine = maxLine;
        this.maxColumn = maxColumn;
        this.world = "../jeuxPlateau/assets/"+world+"/";
        this.boardArray = [];
        this.players = [];

        // Joueur actif
        this.activePlayer = 0;

        // Verifie si Json est bien chargé
        this.readyWeapons = false;
        this.readyCharacters = false;
    }

    initGame(nbObstacles,nbWeapons,nbPlayers) {
        this.initFloor();
        this.initObstacles(nbObstacles);
        this.initWeapons(nbWeapons);
        this.initPlayers(nbPlayers);

        this.displayMap();
        //
        // this.isReady();
    }

    isReady(){
        if (this.readyWeapons === true && this.readyCharacters === true) {
            this.displayMap();
        }
    }



    displayMap(){
        let map = this;
        let boardElt = $('#board');
        $.each(map.boardArray,function(x,line) {
            let lineElt = $(`<div class='lines' id='line${x}'></div>`);
            lineElt.appendTo(boardElt);
            $.each(line,function(y) {
                lineElt.append( map.boardArray[x][y].container);
            });
        });
    }

    initFloor(){
        for (let i = 0 ; i < this.maxLine ; i++) {
            this.boardArray[i] = [];
            for (let j = 0 ; j < this.maxColumn ; j++) {
                this.boardArray[i][j] = new Cell(i+''+j, CELL_DECOR_FLOOR);
            }
        }
    }

    // Ajouter obsctables sur cases vide aléatoires
    initObstacles(nbObstacles) {
        for (let k = 0 ; k < nbObstacles ; k++) {
            let [x,y] = this.randomCoordinates();
            if (this.boardArray[x][y].isObstacle()) {
                k--
            } else {
                this.boardArray[x][y].decor = 1;
                this.boardArray[x][y].setDecor('obstacle', CELL_DECOR_OBSTACLE, CELL_DECOR_FLOOR)
            }
        }
        console.log(this.boardArray)
    }



    // Ajouter armes sur cases vide aléatoires
    initWeapons(nbWeapon) {
        for (let k = 0 ; k < nbWeapon ; k++) {
            let [x,y] = this.randomCoordinates();
            if (this.boardArray[x][y].isObstacle() || this.boardArray[x][y].isPlayer() || this.boardArray[x][y].isWeapon()) {
                k--
            } else {
                this.boardArray[x][y].decor = 2;
                this.boardArray[x][y].setDecor(`weapon${k+1}`, CELL_DECOR_WEAPON, CELL_DECOR_FLOOR)
            }
        }
        console.log(this.boardArray)
    }

    // Ajouter joueurs sur case vide aléatoires
    initPlayers(nbPlayers) {
        for (let k = 0 ; k < nbPlayers ; k++) {
            let [x,y] = this.randomCoordinates();
            if (this.boardArray[x][y].isObstacle() || this.boardArray[x][y].isWeapon() || this.boardArray[x][y].isPlayer()) {
                k--
            } else {
                this.boardArray[x][y].decor = 3;
                this.boardArray[x][y].setDecor(`player${k+1}`,CELL_DECOR_PLAYER,  CELL_DECOR_FLOOR)
            }
        }
        console.log(this.boardArray)
    }

    // Coordonnées aléatoire X Y
    randomCoordinates(){
        let x = Math.floor(Math.random()*this.maxLine);
        let y = Math.floor(Math.random()*this.maxColumn);
        return [x,y];
    }

    // Récuperer active player
    getCurrentPlayer(){
        return this.activePlayer;
    }

}

export { Board }
