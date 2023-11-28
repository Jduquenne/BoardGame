class InterfacePlayers {

    constructor(playersInfos) {
        this.playersInfos = playersInfos

        this.activePlayer = 0

        this.controlsElt = {
            playersInterface: $('.playerInterface')
        }
    }

    // Affiche l'interface joueurs
    displayPlayers() {
        this.controlsElt.playersInterface.empty()
        for (let i = 0; i < this.playersInfos.length; i++) {
            this.controlsElt.playersInterface.append( this.generateOnePlayerUI(this.playersInfos[i].player, i === this.activePlayer));
        }
    }

    // créer une card joueur
    generateOnePlayerUI(player, isActive = false) {

        const playerCard = $("<div class='playerCard borderPixel " + ((isActive)?' active ' : '')+"'></div>")

        const playerTopInfos = $("<div class='playerTopInfos'></div>")
        const playerImg = $(`<img class='playerImg' src="./assets/dungeon/characters/${player.image}\" alt="${player.name}"/>`)

        const playerInfos = $("<div class='playerInfos'></div>")
        const playerName = $(`<div class='playerName'>${player.name}</div>`)
        const playerHealth = $(`<div class='playerHealth'>Points de vie : ${player.health}</div>`)
        const playerMaxMove = $(`<div class='playerMaxMove'>PM : ${player.maxMove}</div>`)
        playerInfos.append(playerName, playerHealth, playerMaxMove)
        playerTopInfos.append(playerImg, playerInfos)

        const playerWeapon = $(`<div class='playerWeapon'></div>`)
        const playerWeaponImage = $(`<img class='playerWeaponImg' src="./assets/dungeon/weapons/${player.weapon.image}\" alt="weaponImg"/>`)
        const playerWeaponNameDamage = $(`<div class="playerWeaponName">${player.weapon.name} <span class="red">${player.weapon.damage}</span></div>`)
        playerWeapon.append(playerWeaponImage, playerWeaponNameDamage)

        return playerCard.append(playerTopInfos, playerWeapon)
    }

    // Actualise l'arme du joueur
    setPlayerWeapon() {
        this.displayPlayers();
    }

    // Actualise la vie du joueur
    setPlayerHealth() {
        this.displayPlayers();
    }

    // Actualise l'affichage du joueur actif
    setActivePlayer(player) {
        this.activePlayer = player
        this.displayPlayers()
    }

}
export { InterfacePlayers }