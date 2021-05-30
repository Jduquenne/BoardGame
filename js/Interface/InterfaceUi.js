class InterfaceUi {

    constructor(playersInfos, weaponsInfos) {
        this.playersInfos = playersInfos;
        this.weaponsInfos = weaponsInfos

        this.controlsElt = {
            playersUi: document.getElementById("playersList"),
            weaponsUi: document.getElementById("weaponsList")
        }
    }

    displayPlayersUi() {
        for (let i = 1 ; i < this.playersInfos.length + 1 ; i++) {
            const playerInfoDiv = document.createElement("div")
            playerInfoDiv.className = `player${i}Infos`

            const playerCard = document.createElement('div')
            playerCard.className = "player-card"

            const playerName = document.createElement('h2')
            playerName.innerText = this.playersInfos[i-1].player.name

            const playerHealth = document.createElement('p')
            playerHealth.innerText = this.playersInfos[i-1].player.health

            const playerImage = document.createElement('img')
            playerImage.className = "playerImg"
            playerImage.src = `./assets/dungeon/characters/${this.playersInfos[i-1].player.image}`

            const playerWeapon = document.createElement('p')
            playerWeapon.className = "playerWeaponName"
            playerWeapon.innerText = this.playersInfos[i-1].player.weapon.name

            const playerWeaponImage = document.createElement('img')
            playerWeaponImage.className = "playerWeaponImg"
            playerWeaponImage.src = `./assets/dungeon/weapons/${this.playersInfos[i-1].player.weapon.image}`

            playerCard.append(playerName, playerHealth, playerImage, playerWeapon, playerWeaponImage)
            playerInfoDiv.append(playerCard)
            this.controlsElt.playersUi.append(playerInfoDiv)
        }
    }

    displayWeaponsUi() {
        const weaponUl = document.createElement('ul')
        this.controlsElt.weaponsUi.append(weaponUl)
        for (let i = 1 ; i < this.weaponsInfos.length + 1 ; i++) {
            const weaponLi = document.createElement('li')

            const weaponName = document.createElement('h2')
            weaponName.innerText = this.weaponsInfos[i-1].weapon.name;

            const weaponDamage = document.createElement('p')
            weaponDamage.innerText = this.weaponsInfos[i-1].weapon.damage;

            weaponLi.append(weaponName,weaponDamage)
            weaponUl.append(weaponLi)
        }
    }

}

export { InterfaceUi }
