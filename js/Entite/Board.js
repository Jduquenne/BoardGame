import { Cell } from "./Cell.js";
import { Weapon } from "./Weapon.js";
import { Player } from "./Player.js";
import {CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE} from "../AssetManager.js";

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
        this.initMap();
        this.displayMap();
        this.initRandomObstacles(nbObstacles);
        // this.initWeapons(nbWeapons);
        // this.initPlayers(nbPlayers);
        //
        // this.isReady();
    }

    isReady(){
        if (this.readyWeapons === true && this.readyCharacters === true) {
            this.displayMap();
        }
    }

    initMap(){
        for (let i = 0 ; i < this.maxLine ; i++) {
            this.boardArray[i] = [];
            for (let j = 0 ; j < this.maxColumn ; j++) {
                this.boardArray[i][j] = new Cell(i+''+j, CELL_DECOR_FLOOR);
            }
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

    // Ajouter obsctables sur cases vide aléatoires
    initRandomObstacles(nbObstacles) {
        for (let k = 0 ; k < nbObstacles ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.boardArray[x][y].isEmpty()) {
                k--
            } else {
                this.boardArray[x][y].setDecor(CELL_DECOR_OBSTACLE,'obstacle')
            }
        }
    }



    // Ajouter armes sur cases vide aléatoires
    initWeapons(weapon) {
        let board=this;
        // Json : weapons
        $.ajax({
            type: 'GET',
            url: board.world+'json/weapons.json',
            dataType:"json",
            timeout: 2000,
            success: function(data) {

                let weapons=[];
                $.each(data,function(index,value){
                    weapons.push(new Weapon(value.name,value.image,null,null,"weapon",value.damage));
                });

                // Armes active sur le plateau
                let activeWeapons = new Array(weapon);

                // Liste armes random
                let tableIndexWeapon = [];
                for ( let i = 0 ; i < weapons.length ; i++) {
                    tableIndexWeapon[i]=i;
                }

                let indexWeapon = 0;
                for (let j = 0; j < weapon; j++){
                    indexWeapon = Math.floor(Math.random()*tableIndexWeapon.length);
                    activeWeapons[j]=weapons[tableIndexWeapon[indexWeapon]];
                    tableIndexWeapon.splice(indexWeapon,1);
                }

                // Coordonnées random pour chaques armes
                let [x,y] = [];
                let square;
                $.each(activeWeapons, function(index,value){
                    // Pas d'obstables ou joueur sur la case
                    do {
                        [x,y] = board.randomCoordinates();
                        square = board.boardArray[x][y];
                    }
                    while (square.isObstacle() || square.container!==null);
                    // We place the weapon in the box's container
                    square.setContainer(value);
                });
                // The request is a success, we indicate that we are ready
                board.readyWeapons = true;
                board.isReady();
            }
        });
    }

    // Ajouter joueurs sur case vide aléatoires
    initPlayers(nbPlayers) {
        let board=this;
        // Json : characters
        $.ajax({
            type: 'GET',
            url: board.world+'json/players.json',
            dataType:"json",
            timeout: 2000,
            success: function(data) {
                // Characters recovery
                let players=[];
                $.each(data,function(index,value){
                    players.push(new Player ( value.name, value.health, value.image,null,null));
                });

                // Limite 2 joueurs
                if ( players > 2 ){
                    nbPlayers = 2;
                }

                // Tableau joueurs actifs
                let activePlayers = board.players;

                // Coordonnées joueurs actif dans un tableau
                let posPlayer = [];

                // Default Weapon
                let weaponBasic = new Weapon("Arme de Base","basic_weapon.png",null,null,"weapon",10);
                // Init avec des joueurs random
                let tableIndexAvatar = [];
                for ( let i = 0 ; i < players.length ; i++) {
                    tableIndexAvatar[i]=i;
                }

                let indexAvatar = 0;
                for (let j = 0; j < nbPlayers; j++) {
                    indexAvatar = Math.floor(Math.random()*tableIndexAvatar.length);
                    board.players[j]=players[tableIndexAvatar[indexAvatar]];
                    tableIndexAvatar.splice(indexAvatar,1);
                }

                $.each(activePlayers, function(index,value){
                    // Coordonnées random pour chaque joueurs actifs
                    let [x,y]=[];
                    let square;
                    let alone = true;

                    // Verification pas d'obstacles ou armes
                    let tryPlayer=0;

                    // Erreur false = ok Erreur true = erreur de position
                    let errorPlayer=false;

                    do {
                        [x,y] = board.randomCoordinates();
                        square = board.boardArray[x][y];
                        // On verifie si il n'y a pas de joueur autour.
                        $.each(posPlayer,function(index,value){
                            if ((Math.abs(x-value[0]) <= 1) && (Math.abs(y-value[1]) <=1 )) {
                                alone = false;
                                tryPlayer++;
                            }
                        });
                        // Si plus de 100 essais = Erreur
                        if (tryPlayer>100) {
                            errorPlayer=true;
                            break;
                        }
                    }
                    while ( square.isObstacle() || square.container != null || alone === false );
                    // Nous vérifions qu'il existe un chemin entre le joueur précédent et le joueur actif.
                    // S'il y a trop d'échec de positionnement, break la boucle
                    if (errorPlayer === true){
                        return false;
                    }
                    // On place le joueur dans un container
                    square.setPlayerContainer(value);
                    // On place une arme basique sur le joueur
                    value.setContainer(weaponBasic);
                    // On ajoute les coordonnées du joueur
                    posPlayer.push([x,y]);

                });
                // Si succés, alors on est Ready
                board.readyCharacters = true;
                board.isReady();
            }
        });
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
