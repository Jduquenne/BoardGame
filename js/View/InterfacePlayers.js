class InterfacePlayers {

    constructor(playersInfos) {
        this.playersInfos = playersInfos

        this.activePlayer = 0

        this.controlsElt = {
            playersInterface: $('.playerInterface')
        }
    }

    displayPlayers() {
        this.controlsElt.playersInterface.empty()
        for (let i = 0; i < this.playersInfos.length; i++) {
            this.controlsElt.playersInterface.append( this.generateOnePlayerUI(this.playersInfos[i].player, i === this.activePlayer));
        }
    }

    generateOnePlayerUI(player, isActive = false) {

        const playerCard = $("<div class='playerCard borderPixel " + ((isActive)?' active ' : '')+"'></div>")

        const playerTopInfos = $("<div class='playerTopInfos'></div>")
        const playerImg = $(`<img class='playerImg' src="./assets/dungeon/characters/${player.image}\" alt="${player.name}"/>`)

        const playerInfos = $("<div class='playerInfos'></div>")
        const playerName = $(`<h2 class='playerName'>${player.name}</h2>`)
        const playerHealth = $(`<p class='playerHealth'>Points de vie : ${player.health}</p>`)
        playerInfos.append(playerName, playerHealth)
        playerTopInfos.append(playerImg, playerInfos)

        const playerWeapon = $(`<h2 class='playerWeapon'></h2>`)
        const playerWeaponImage = $(`<img class='playerWeaponImg' src="./assets/dungeon/weapons/${player.weapon.image}\" alt="weaponImg"/>`)
        const playerWeaponNameDamage = $(`<div class="playerWeaponName">${player.weapon.name} <span class="red">${player.weapon.damage}</span></div>`)
        playerWeapon.append(playerWeaponImage, playerWeaponNameDamage)

        return playerCard.append(playerTopInfos, playerWeapon)
    }

    setPlayerWeapon() {
        this.displayPlayers();
    }

    setPlayerHealth() {
        this.displayPlayers();
    }

    setActivePlayer(player) {
        this.activePlayer = player
        this.displayPlayers()
    }

}
export { InterfacePlayers }