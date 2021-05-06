import { Cell } from "../Entite/Cell.js";
import { CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE, CELL_DECOR_WEAPON, CELL_DECOR_PLAYER, AssetManager } from "../AssetManager.js";
import { Player } from "../Entite/Player.js";
import { Weapon } from "../Entite/Weapon.js";
import { Utils } from "../Utils.js";

class Board {

    constructor(maxLine, maxColumn, world) {
        this.maxLine = maxLine;
        this.maxColumn = maxColumn;
        this.world = world;

        this.cellsArray = [];
        this.players = [];
        this.weapons = [];
    }

    initGame(nbObstacles,nbWeapons,nbPlayers) {
        this.initBoard();
        this.initObstacles(nbObstacles);
        this.initWeapons(nbWeapons);
        this.initPlayers(nbPlayers);

        this.displayMap();
        console.log(this.cellsArray)
        console.log(this.weapons)
        console.log(this.players)
    }

    displayMap(){
        let map = this;
        let boardElt = $('#board');
        $.each(map.cellsArray,function(x,line) {
            let lineElt = $(`<div class='lines' id='line${x}'></div>`);
            lineElt.appendTo(boardElt);
            $.each(line,function(y) {
                lineElt.append( map.cellsArray[x][y].container );
            });
        });
    }

    initBoard(){
        for (let i = 0 ; i < this.maxLine ; i++) {
            this.cellsArray[i] = [];
            for (let j = 0 ; j < this.maxColumn ; j++) {
                this.cellsArray[i][j] = new Cell(i+''+j, CELL_DECOR_FLOOR, this.world);
            }
        }
    }

    // Ajouter obsctables sur cases vide aléatoires
    initObstacles(nbObstacles) {
        for (let k = 0 ; k < nbObstacles ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty()) {
                k--
            } else {
                this.cellsArray[x][y].decor = 1;
                this.cellsArray[x][y].setDecor(CELL_DECOR_OBSTACLE, this.world, CELL_DECOR_FLOOR, 'obstacle')
            }
        }
    }



    // Ajouter armes sur cases vide aléatoires
    initWeapons(nbWeapon) {
        for (let k = 0 ; k < nbWeapon ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty()) {
                k--
            } else {
                const randomWeaponName = Utils.randomWeaponName()
                const randomWeaponImgUrl = AssetManager.getDecorImg(CELL_DECOR_WEAPON, this.world, randomWeaponName);
                const randomWeaponDmg = Utils.randomWeaponDamage();
                const weaponName = Utils.getImgNameInPath(randomWeaponImgUrl)

                if (!this.weapons.map(x => x.name).indexOf(randomWeaponName)) {
                    k--
                } else {
                    this.cellsArray[x][y].decor = 2;
                    this.cellsArray[x][y].setDecor( CELL_DECOR_WEAPON, this.world,CELL_DECOR_FLOOR, "weapon", weaponName)

                    this.weapons.push(new Weapon( randomWeaponName, randomWeaponImgUrl, randomWeaponDmg, this.boardArray[x][y]))
                }
            console.log(!this.weapons.map(x => x.name).indexOf(randomWeaponName))
            }
        }
    }

    // Ajouter joueurs sur case vide aléatoires
    initPlayers(nbPlayers) {
        for (let k = 0 ; k < nbPlayers ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty()) {
                k--
            } else {
                const randomPlayerName = Utils.randomPlayerName()
                const randomPlayerImgUrl = AssetManager.getDecorImg(CELL_DECOR_WEAPON, this.world, randomPlayerName);
                const playerName = Utils.getImgNameInPath(randomPlayerImgUrl)

                this.cellsArray[x][y].decor = 3;
                this.cellsArray[x][y].setDecor(CELL_DECOR_PLAYER, this.world,CELL_DECOR_FLOOR, "player", playerName)

                this.players.push(new Player(
                    playerName,
                    100,
                    new Weapon('Epée de boisaille', "./assets/dungeon/weapons/basic_weapon.png", 5),
                    this.cellsArray[x][y]
                ))
            }
        }
        this.activePlayer = this.players[0];
    }

    // Coordonnées aléatoire X Y
    randomCoordinates(){
        let x = Math.floor(Math.random()*this.maxLine);
        let y = Math.floor(Math.random()*this.maxColumn);
        return [x,y];
    }

}

export { Board }
