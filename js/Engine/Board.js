import { Cell } from "../Entite/Cell.js";
import { CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE } from "../AssetManager.js";
import { WeaponsRepository } from "../Repository/WeaponsRepository.js";
import { PlayersRepository } from "../Repository/PlayersRepository.js";
import { InterfaceUi } from "../Interface/InterfaceUi.js";

class Board {

    constructor(maxLine, maxColumn) {
        this.maxLine = maxLine;
        this.maxColumn = maxColumn;

        this.cellsArray = [];

        this.playersInfos = []
        this.weaponsInfos = []

        this.activePlayer = 0;

        // this.maxRound = 20;
        // this.nbRound = 0;

        this.interfaceUi = new InterfaceUi(this.playersInfos, this.weaponsInfos)
    }

    initGame(nbObstacles,nbWeapons,nbPlayers) {
        this.generateBoard()
        this.putObstacles(nbObstacles);
        this.putWeapons(nbWeapons);
        this.putPlayers(nbPlayers);

        this.initInterface()

        this.getCellsToGo()
    }

    initInterface() {
        this.interfaceUi.displayWeaponsUi()
        this.interfaceUi.displayPlayersUi()
    }

    generateBoard(){
        this.createCells();
        this.displayBoard()
    }

    createCells(){
        for (let i = 0 ; i < this.maxLine ; i++) {
            this.cellsArray[i] = [];
            for (let j = 0 ; j < this.maxColumn ; j++) {
                this.cellsArray[i][j] = new Cell(i+''+j, CELL_DECOR_FLOOR, this.cellClickHandler);
            }
        }
    }

    displayBoard(){
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

    // Ajouter obsctables sur cases vide aléatoires
    putObstacles(nbObstacles) {
        for (let k = 0 ; k < nbObstacles ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty()) {
                k--
            } else {
                this.cellsArray[x][y].setDecor(CELL_DECOR_OBSTACLE)
            }
        }
    }

    // Ajouter armes sur cases vide aléatoires
    putWeapons(nbWeapon) {
        let weapons = WeaponsRepository.findAllWeapons();
        this.shuffleArray(weapons);

        for (let k = 0 ; k < nbWeapon ; k++) {
            let [x,y] = this.randomCoordinates();

            if (!this.cellsArray[x][y].isEmpty()) {
                k--
            } else {
                this.cellsArray[x][y].setWeapon(weapons[k]);

                this.weaponsInfos.push(
                    {
                        weapon: weapons[k],
                        position: this.cellIdToCoord(this.cellsArray[x][y].id)
                    }
                )
            }
        }
    }

    // Ajouter joueurs sur case vide aléatoires
    putPlayers(nbPlayers) {
        let players = PlayersRepository.findAllWeapons();
        this.shuffleArray(players)

        for (let k = 0 ; k < nbPlayers ; k++) {
            let [x,y] = this.randomCoordinates();

            if (!this.cellsArray[x][y].isEmpty() || this.cellsArray[x][y].hasWeapon() || this.cellsArray[x][y].isSecurityZone()) {
                k--
            } else {
                this.cellsArray[x][y].setPlayer(players[k])
                this.playersInfos.push(
                    {
                        player: players[k],
                        position: this.cellIdToCoord(this.cellsArray[x][y].id),
                        cellToGo: []
                    }
                )
                this.putAllSecurityZone(this.playersInfos[k].position)
            }
        }
    }

    newRound(){
        // TODO A voir
        // this.cellsArray.map(cell => cell.removeCellToGo())
        this.changeActivePlayer()
        this.getCellsToGo()
    }

    cellClickHandler(cell){
        console.log(cell);
    }

    selectCellsPlayerMove() {
        this.removeAllSecurityZone(this.getActivePlayerInfos().position)
        this.putAllSecurityZone(this.getWaitingPlayerInfos().position)

        for (let i = 0; i < this.getActivePlayerInfos().cellToGo.length; i++) {
            let cellChosen = this.getActivePlayerInfos().cellToGo[i];

            $(cellChosen.container).on('click', (event) => {
                $('.cellToMove').off()
                const originCell = this.cellsArray[this.getActivePlayerInfos().position.row][this.getActivePlayerInfos().position.col]
                originCell.removePlayer();

                const newPlayerPosition = this.cellIdToCoord($(event.target).attr('id'));
                const newPlayerCell = this.cellsArray[newPlayerPosition.row][newPlayerPosition.col]

                newPlayerCell.setPlayer(this.getActivePlayerInfos().player)
                this.getActivePlayerInfos().position = newPlayerPosition

                if (newPlayerCell.hasWeapon()) {
                    const playerWeapon = this.getActivePlayerInfos().player.weapon
                    this.getActivePlayerInfos().player.weapon = newPlayerCell.weapon
                    newPlayerCell.removeWeapon(newPlayerCell.weapon)
                    newPlayerCell.weapon = playerWeapon
                }

                $(".cellToMove").removeClass("cellToMove")
                this.getActivePlayerInfos().cellToGo = []
                this.removeAllCellToGo()

                if (newPlayerCell.securityZone === true) {
                    alert('Le combat commence !')
                } else {
                    this.newRound()
                }
            })
        }
    }

    getCellsToGo() {
        let activePlayerCoordinate = this.getActivePlayerInfos().position;
        console.log(activePlayerCoordinate)
        for (let i = 1; i < 4; i++) { // droite
            if ((activePlayerCoordinate.col + i) >= 0 && (activePlayerCoordinate.col + i) <= this.maxColumn - 1) {
                let cellRight = this.findCell( `${activePlayerCoordinate.row}${activePlayerCoordinate.col + i}`);

                if ((cellRight.isEmpty() && !cellRight.hasPlayer()) || (cellRight.hasWeapon() && !cellRight.hasPlayer()) ) {
                    cellRight.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellRight);
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < 4; i++) { // gauche
            if ((activePlayerCoordinate.col - i) >= 0 && (activePlayerCoordinate.col - i) <= this.maxColumn - 1) {
                let cellLeft = this.findCell( `${activePlayerCoordinate.row}${activePlayerCoordinate.col - i}`);

                if ((cellLeft.isEmpty() && !cellLeft.hasPlayer()) || (cellLeft.hasWeapon() && !cellLeft.hasPlayer()) ) {
                    cellLeft.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellLeft);
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i < 4; i++) { // Haut
            if ((activePlayerCoordinate.row - i) >= 0 && (activePlayerCoordinate.row - i) <= this.maxLine - 1) {
                let cellTop = this.findCell( `${activePlayerCoordinate.row - i}${activePlayerCoordinate.col}`);

                if ((cellTop.isEmpty() && !cellTop.hasPlayer()) || (cellTop.hasWeapon() && !cellTop.hasPlayer()) ) {
                    cellTop.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellTop);
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i < 4; i++) { // Bas
            if ((activePlayerCoordinate.row + i) >= 0 && (activePlayerCoordinate.row + i) <= this.maxLine - 1) {
                let cellBottom = this.findCell( `${activePlayerCoordinate.row + i}${activePlayerCoordinate.col}`);

                if ((cellBottom.isEmpty() && !cellBottom.hasPlayer()) || (cellBottom.hasWeapon() && !cellBottom.hasPlayer()) ) {
                    cellBottom.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellBottom);
                } else {
                    break;
                }
            }
        }
        this.selectCellsPlayerMove()
    }

    removeAllCellToGo () {
        const allCellToGo = this.cellsArray.flat()
        allCellToGo.filter(cell => cell.isMovable === true)

        for (let i = 0; i < allCellToGo.length; i++) {
            allCellToGo[i].removeCellToGo()
        }
    }

    putAllSecurityZone(cell) {
        if ((cell.col + 1) >= 0 && (cell.col + 1) <= this.maxColumn - 1){
            const rightCell = this.findCell(`${cell.row}${cell.col + 1}`)
            if ((rightCell.isEmpty() && !rightCell.hasPlayer()) || rightCell.hasWeapon()){
                rightCell.setSecurityZone()
            }
        }

        if ((cell.col - 1) >= 0 && (cell.col - 1) <= this.maxColumn - 1) {
            const leftCell = this.findCell(`${cell.row}${cell.col - 1}`)
            if ((leftCell.isEmpty() && !leftCell.hasPlayer()) || leftCell.hasWeapon()){
                leftCell.setSecurityZone()
            }
        }

        if ((cell.row - 1) >= 0 && (cell.row - 1) <= this.maxLine - 1) {
            const topCell = this.findCell(`${cell.row - 1}${cell.col}`)
            if ((topCell.isEmpty() && !topCell.hasPlayer()) || topCell.hasWeapon()){
                topCell.setSecurityZone()
            }
        }

        if ((cell.row + 1) >= 0 && (cell.row + 1) <= this.maxLine - 1) {
            const bottomCell = this.findCell(`${cell.row + 1}${cell.col}`)
            if ((bottomCell.isEmpty() && !bottomCell.hasPlayer()) || bottomCell.hasWeapon()){
                bottomCell.setSecurityZone()
            }
        }
    }

    removeAllSecurityZone(cell) {
        if ((cell.col + 1) >= 0 && (cell.col + 1) <= this.maxColumn - 1){
            const rightCell = this.findCell(`${cell.row}${cell.col + 1}`)
            if ((rightCell.isEmpty() && !rightCell.hasPlayer()) || rightCell.hasWeapon()){
                rightCell.removeSecurityZone()
            }
        }

        if ((cell.col - 1) >= 0 && (cell.col - 1) <= this.maxColumn - 1) {
            const leftCell = this.findCell(`${cell.row}${cell.col - 1}`)
            if ((leftCell.isEmpty() && !leftCell.hasPlayer()) || leftCell.hasWeapon()){
                leftCell.removeSecurityZone()
            }
        }

        if ((cell.row - 1) >= 0 && (cell.row - 1) <= this.maxLine - 1) {
            const topCell = this.findCell(`${cell.row - 1}${cell.col}`)
            if ((topCell.isEmpty() && !topCell.hasPlayer()) || topCell.hasWeapon()){
                topCell.removeSecurityZone()
            }
        }

        if ((cell.row + 1) >= 0 && (cell.row + 1) <= this.maxLine - 1) {
            const bottomCell = this.findCell(`${cell.row + 1}${cell.col}`)
            if ((bottomCell.isEmpty() && !bottomCell.hasPlayer()) || bottomCell.hasWeapon()){
                bottomCell.removeSecurityZone()
            }
        }
    }

    changeActivePlayer() {
        this.activePlayer = (this.activePlayer + 1 ) % this.playersInfos.length;
    }

    getActivePlayerInfos() {
        return this.playersInfos[this.activePlayer]
    }

    getWaitingPlayerInfos () {
        let waitingPlayerIndex = (this.activePlayer + 1 ) % this.playersInfos.length;
        return this.playersInfos[waitingPlayerIndex];
    }

    // Coordonnées aléatoire X Y
    randomCoordinates(){
        let x = Math.floor(Math.random()*this.maxLine);
        let y = Math.floor(Math.random()*this.maxColumn);
        return [x,y];
    }

    cellIdToCoord(id){
        return {row: Math.floor(id / this.maxLine), col: id % this.maxColumn};
    }

    findCell(id) {
        let cellCoord = this.cellIdToCoord(id)
        return this.cellsArray[cellCoord.row][cellCoord.col];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export { Board }
