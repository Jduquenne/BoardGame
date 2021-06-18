class InterfacePlayers {

    constructor(playersInfos) {
        this.playersInfos = playersInfos;

        this.controlsElt = {
            playersUi: $('#playersList')
        }
    }

    display() {
        this.controlsElt.playersUi.empty()
        const playersTitle = $("<h1 class='playerTitle'>Players</h1>")
        this.controlsElt.playersUi.append(playersTitle);
        for (let i = 0; i < this.playersInfos.length; i++) {
            this.controlsElt.playersUi.append( this.generateOnePlayerUI(this.playersInfos[i].player));
        }
    }
    
    generateOnePlayerUI(player){
        const playerCard = $("<div class='playerCard'></div>")

        const playerName = $(`<h2 class='playerName'>${player.name}</h2>`)
        const playerHealth = $(`<p class='playerHealth'>${player.health}</p>`)
        const playerImg = $(`<img class='playerImg' src="./assets/dungeon/characters/${player.image}\" alt="playerImg"/>`)

        const playerWeapon = $(`<p class='playerWeaponInfos'>${player.weapon.name} <span>${player.weapon.damage}</span></p>`)
        const playerWeaponImage = $(`<img class='playerWeaponImg' src="./assets/dungeon/weapons/${player.weapon.image}\" alt="weaponImg"/>`)
        
        return playerCard.append(playerName, playerHealth, playerImg, playerWeapon, playerWeaponImage)
    }

    setPlayerWeapon() {
        this.display();
    }

    setPlayerHealth() {
        this.display();
    }

}
export { InterfacePlayers }