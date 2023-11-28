import { Cell } from "../Models/Cell.js";
import { Fight } from "./Fight.js";
import { CELL_DECOR_FLOOR, CELL_DECOR_OBSTACLE } from "../AssetManager.js";
import { WeaponsRepository } from "../Repository/WeaponsRepository.js";
import { PlayersRepository } from "../Repository/PlayersRepository.js";
import { InterfaceUi } from "../Views/InterfaceUi.js";
import { BonusRepository } from "../Repository/BonusRepository.js";
import { TrapRepository } from "../Repository/TrapRepository.js";

class Board {

    constructor(maxLine, maxColumn, nbObstacles, nbWeapons, nbBonus, nbTrap) {
        this.maxLine = maxLine;
        this.maxColumn = maxColumn
        this.nbObstacles = nbObstacles
        this.nbWeapons = nbWeapons
        this.nbBonus = nbBonus
        this.nbTrap = nbTrap

        this.cellsArray = [];

        this.playersInfos = []
        this.weaponsInfos = []
        this.bonusInfos = []
        this.trapInfos = []

        this.activePlayer = 0;

        this.interfaceUi = new InterfaceUi(this.playersInfos, this.weaponsInfos)
    }

    // Initialise une partie sur le plateau généré
    initGame() {
        this.generateBoard()
        this.putObstacles(this.nbObstacles)
        this.putBonus(this.nbBonus)
        this.putTrap(this.nbTrap)
        this.putWeapons(this.nbWeapons)
        this.putPlayers(2)

        this.getCellsToGo()
        this.initInterface()
    }

    // Initialise l'interface du jeux (players et armes sur le terrain)
    initInterface() {
        this.interfaceUi.displayUI()
    }

    // Génére le plateau
    generateBoard(){
        this.createCells();
        this.displayBoard()
    }

    // Créer les cellules (new Cell)
    createCells(){
        for (let i = 0 ; i < this.maxLine ; i++) {
            this.cellsArray[i] = [];
            for (let j = 0 ; j < this.maxColumn ; j++) {
                this.cellsArray[i][j] = new Cell(i+'-'+j, CELL_DECOR_FLOOR, this.actionOnClick.bind(this));
            }
        }
    }

    // Affiche le plateau
    displayBoard(){
        const map = this;
        const boardElt = $('#board');
        $.each(map.cellsArray,function(x,line) {
            let lineElt = $(`<div class='lines' id='line${x}'></div>`);
            lineElt.appendTo(boardElt);
            $.each(line,function(y) {
                lineElt.append( map.cellsArray[x][y].container );
            });
        });
    }

    /**
     *
     * @param {number} nbBonus
     */
    // Ajouter bonus sur cases vide aléatoires
    putBonus(nbBonus) {
        let bonus = BonusRepository.findAllBonus()
        this.shuffleArray(bonus);
        for (let k = 0 ; k < nbBonus ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty() ||
                this.cellsArray[x][y].hasWeapon() ||
                this.cellsArray[x][y].hasPlayer() ||
                this.cellsArray[x][y].hasBonus() || 
                this.cellsArray[x][y].isSecurityZone() ||
                this.cellsArray[x][y].hasTrap()) 
            {
                k--
            } else {
                if (this.bonusInfos.length <= bonus.length) {
                    const bonusExist = this.bonusInfos.find((info) => {
                        return info.bonus === bonus[k]
                    })
                    if(!bonusExist) {
                        this.bonusInfos.push(
                            {
                                bonus: bonus[k],
                                position: this.cellIdToCoord(this.cellsArray[x][y].id)
                            }
                        )
                        this.cellsArray[x][y].setBonus(bonus[k]);
                    }
                }
            }
        }
    }

    // Ajouter trap sur cases vide aléatoires
    putTrap(nbTrap) {
        let trap = TrapRepository.findAllTrap()
        this.shuffleArray(trap);
        for (let k = 0 ; k < nbTrap ; k++) {
            let [x,y] = this.randomCoordinates();
            if (!this.cellsArray[x][y].isEmpty() || 
                this.cellsArray[x][y].hasWeapon() || 
                this.cellsArray[x][y].hasPlayer() || 
                this.cellsArray[x][y].hasTrap() || 
                this.cellsArray[x][y].hasBonus() || 
                this.cellsArray[x][y].isSecurityZone()
            ) {
                k--
            } else {
                this.cellsArray[x][y].setTrap(trap[k]);
                this.trapInfos.push(
                    {
                        trap: trap[k],
                        position: this.cellIdToCoord(this.cellsArray[x][y].id)
                    }
                )
            }
        }
    }

    /**
     *
     * @param {number} nbObstacles
     */
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

    /**
     *
     * @param {number} nbWeapon
     */
    // Ajouter armes sur cases vide aléatoires
    putWeapons(nbWeapon) {
        let weapons = WeaponsRepository.findAllWeapons();
        this.shuffleArray(weapons);

        for (let k = 0 ; k < nbWeapon ; k++) {
            let [x,y] = this.randomCoordinates();

            if (!this.cellsArray[x][y].isEmpty() || this.cellsArray[x][y].hasWeapon() || this.cellsArray[x][y].hasPlayer() || this.cellsArray[x][y].isSecurityZone() || this.cellsArray[x][y].hasTrap()) {
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

    /**
     *
     * @param {number}nbPlayers
     */
    // Ajouter joueurs sur case vide aléatoires
    putPlayers(nbPlayers) {
        let players = PlayersRepository.findAllPlayers();
        this.shuffleArray(players)

        for (let k = 0 ; k < nbPlayers ; k++) {
            let [x,y] = this.randomCoordinates();

            if (!this.cellsArray[x][y].isEmpty() || this.cellsArray[x][y].hasWeapon() || this.cellsArray[x][y].hasPlayer() || this.cellsArray[x][y].isSecurityZone()) {
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

    // Switch le joueur actif et récupére ses cellules de déplacement
    newRound(){
        this.changeActivePlayer()
        this.getCellsToGo()
    }

    /**
     *
     * @param {Cell} cell
     */
    // Action grace au click
    actionOnClick(cell){
        // Vérifie si une cellule est dans l'état déplacement possible
        if(cell.isMovable) {
            // Remplace la cellule de départ du joueur actif par une cellule vide
            const originCell = this.cellsArray[this.getActivePlayerInfos().position.row][this.getActivePlayerInfos().position.col]
            originCell.removePlayer();

            cell.setPlayer(this.getActivePlayerInfos().player)
            this.getActivePlayerInfos().position = this.cellIdToCoord(cell.id);

            if (cell.hasTrap()) {
                this.interfaceUi.interfaceTrapRelease.setBannerPlayerTrapped(this.getActivePlayerInfos())
                this.getActivePlayerInfos().player.health = this.getActivePlayerInfos().player.health - 20
                cell.trap.state = true

            }

            // Si le joueur peut se déplacer sur une arme alors il échange son arme avec celle de la cellule
            if (cell.hasWeapon()) {
                const playerWeapon = this.getActivePlayerInfos().player.weapon
                this.getActivePlayerInfos().player.weapon = cell.weapon
                cell.removeWeapon(cell.weapon)
                cell.weapon = playerWeapon
                this.interfaceUi.interfacePlayer.setPlayerWeapon(this.getActivePlayerInfos().player)
            }
            // Si le joueur se déplace sur le bonus
            if (cell.hasBonus()) {
                if (cell.bonus.type === 'move') {
                    this.getActivePlayerInfos().player.maxMove = this.getActivePlayerInfos().player.maxMove + cell.bonus.amount
                } else if (cell.bonus.type === 'life') {
                    this.getActivePlayerInfos().player.health = this.getActivePlayerInfos().player.health + cell.bonus.amount
                    // this.interfaceUi.interfacePlayer.playersInfos[this.activePlayer].player.health = this.getActivePlayerInfos().player.health
                }
                this.bonusInfos = this.bonusInfos.filter((info) => info.bonus !== cell.bonus)
                cell.container.removeClass('bonus')
                cell.removeBonus()
                this.putBonus()
            }
            // Retire les cellules de déplacement du joueur actif
            this.getActivePlayerInfos().cellToGo.map(cell => cell.removeCellToGo());
            this.getActivePlayerInfos().cellToGo = []

            // Vérifie si un joueur ne soit pas a coté d'un joueur sinon il passe au joueur suivant
            if (cell.securityZone === true) {
                this.interfaceUi.interfaceBattle.setBannerBattleStart(this.getActivePlayerInfos(), this.getWaitingPlayerInfos())

                let fight = new Fight(this.getActivePlayerInfos(), this.getWaitingPlayerInfos(), this.interfaceUi)
                setTimeout(() => fight.fight(), 1000)
            } else {
                this.newRound()
            }
        }
    }

    // Récupére les cases de déplacements
    getCellsToGo() {
        const activePlayerCoordinate = this.getActivePlayerInfos().position;
        const activePlayerMaxMove = this.getActivePlayerInfos().player.maxMove
        // TODO const déplacement
        for (let i = 1; i <= activePlayerMaxMove; i++) { // droite
            if ((activePlayerCoordinate.col + i) >= 0 && (activePlayerCoordinate.col + i) <= this.maxColumn - 1) {
                let cellRight = this.findCell( `${activePlayerCoordinate.row}-${activePlayerCoordinate.col + i}`);

                if ((cellRight.isEmpty() && !cellRight.hasPlayer()) || (cellRight.hasWeapon() && !cellRight.hasPlayer()) ) {
                    cellRight.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellRight);
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i <= activePlayerMaxMove; i++) { // gauche
            if ((activePlayerCoordinate.col - i) >= 0 && (activePlayerCoordinate.col - i) <= this.maxColumn - 1) {
                let cellLeft = this.findCell( `${activePlayerCoordinate.row}-${activePlayerCoordinate.col - i}`);

                if ((cellLeft.isEmpty() && !cellLeft.hasPlayer()) || (cellLeft.hasWeapon() && !cellLeft.hasPlayer()) ) {
                    cellLeft.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellLeft);
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i <= activePlayerMaxMove; i++) { // Haut
            if ((activePlayerCoordinate.row - i) >= 0 && (activePlayerCoordinate.row - i) <= this.maxLine - 1) {
                let cellTop = this.findCell( `${activePlayerCoordinate.row - i}-${activePlayerCoordinate.col}`);

                if ((cellTop.isEmpty() && !cellTop.hasPlayer()) || (cellTop.hasWeapon() && !cellTop.hasPlayer()) ) {
                    cellTop.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellTop);
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i <= activePlayerMaxMove; i++) { // Bas
            if ((activePlayerCoordinate.row + i) >= 0 && (activePlayerCoordinate.row + i) <= this.maxLine - 1) {
                let cellBottom = this.findCell( `${activePlayerCoordinate.row + i}-${activePlayerCoordinate.col}`);

                if ((cellBottom.isEmpty() && !cellBottom.hasPlayer()) || (cellBottom.hasWeapon() && !cellBottom.hasPlayer()) ) {
                    cellBottom.setCellToGo()
                    this.getActivePlayerInfos().cellToGo.push(cellBottom);
                } else {
                    break;
                }
            }
        }
        this.securityZoneNextPlayer()
    }

    // Place les zones de sécurité sur le joueur suivant
    securityZoneNextPlayer() {
        this.removeAllSecurityZone(this.getActivePlayerInfos().position)
        this.putAllSecurityZone(this.getWaitingPlayerInfos().position)
    }


    // Place les zones de sécurité
    putAllSecurityZone(cell) {
        if ((cell.col + 1) >= 0 && (cell.col + 1) <= this.maxColumn - 1){
            const rightCell = this.findCell(`${cell.row}-${cell.col + 1}`)
            if ((rightCell.isEmpty() && !rightCell.hasPlayer()) || rightCell.hasWeapon()){
                rightCell.setSecurityZone()
            }
        }

        if ((cell.col - 1) >= 0 && (cell.col - 1) <= this.maxColumn - 1) {
            const leftCell = this.findCell(`${cell.row}-${cell.col - 1}`)
            if ((leftCell.isEmpty() && !leftCell.hasPlayer()) || leftCell.hasWeapon()){
                leftCell.setSecurityZone()
            }
        }

        if ((cell.row - 1) >= 0 && (cell.row - 1) <= this.maxLine - 1) {
            const topCell = this.findCell(`${cell.row - 1}-${cell.col}`)
            if ((topCell.isEmpty() && !topCell.hasPlayer()) || topCell.hasWeapon()){
                topCell.setSecurityZone()
            }
        }

        if ((cell.row + 1) >= 0 && (cell.row + 1) <= this.maxLine - 1) {
            const bottomCell = this.findCell(`${cell.row + 1}-${cell.col}`)
            if ((bottomCell.isEmpty() && !bottomCell.hasPlayer()) || bottomCell.hasWeapon()){
                bottomCell.setSecurityZone()
            }
        }
    }

    // Supprime les zones de sécurité
    removeAllSecurityZone(cell) {
        if ((cell.col + 1) >= 0 && (cell.col + 1) <= this.maxColumn - 1){
            const rightCell = this.findCell(`${cell.row}-${cell.col + 1}`)
            if ((rightCell.isEmpty() && !rightCell.hasPlayer()) || rightCell.hasWeapon()){
                rightCell.removeSecurityZone()
            }
        }

        if ((cell.col - 1) >= 0 && (cell.col - 1) <= this.maxColumn - 1) {
            const leftCell = this.findCell(`${cell.row}-${cell.col - 1}`)
            if ((leftCell.isEmpty() && !leftCell.hasPlayer()) || leftCell.hasWeapon()){
                leftCell.removeSecurityZone()
            }
        }

        if ((cell.row - 1) >= 0 && (cell.row - 1) <= this.maxLine - 1) {
            const topCell = this.findCell(`${cell.row - 1}-${cell.col}`)
            if ((topCell.isEmpty() && !topCell.hasPlayer()) || topCell.hasWeapon()){
                topCell.removeSecurityZone()
            }
        }

        if ((cell.row + 1) >= 0 && (cell.row + 1) <= this.maxLine - 1) {
            const bottomCell = this.findCell(`${cell.row + 1}-${cell.col}`)
            if ((bottomCell.isEmpty() && !bottomCell.hasPlayer()) || bottomCell.hasWeapon()){
                bottomCell.removeSecurityZone()
            }
        }
    }

    // Joueur suivant
    changeActivePlayer() {
        this.activePlayer = (this.activePlayer + 1 ) % this.playersInfos.length;
        this.interfaceUi.interfacePlayer.setActivePlayer(this.activePlayer)
    }

    // Récupére les informations du joueur actif
    getActivePlayerInfos() {
        return this.playersInfos[this.activePlayer]
    }

    // Récupére les informations du joueur qui attend
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

    /**
     *
     * @param {string} id
     * @returns {{col: number, row: number}}
     */
    // Converti un ID en coordonnée
    cellIdToCoord(id){
        let split = id.split("-")
        return {row: Number(split[0]), col: Number(split[1])}
    }

    // Trouve et retourne la cellule selon un ID
    findCell(id) {
        let cellCoord = this.cellIdToCoord(id)
        return this.cellsArray[cellCoord.row][cellCoord.col];
    }

    /**
     *
     * @param {Array} array
     */
    // Mélange un tableau
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export { Board }
