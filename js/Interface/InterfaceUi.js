class InterfaceUi {

    constructor(playersInfos, weaponsInfos) {
        this.playersInfos = playersInfos
        this.weaponsInfos = weaponsInfos

        this.controlsElt = {
            playersUi: $('#playersList'),
            weaponsUi: $('#weaponsList'),
            fightModal: $('.fightStart')
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
            playerImage.id = `player${i}Img`
            playerImage.src = `./assets/dungeon/characters/${this.playersInfos[i-1].player.image}`

            const playerWeapon = document.createElement('p')
            playerWeapon.className = "playerWeaponName"
            playerWeapon.id = `player${i}WeaponName`
            playerWeapon.innerText = this.playersInfos[i-1].player.weapon.name

            const playerWeaponImage = document.createElement('img')
            playerWeaponImage.className = "playerWeaponImg"
            playerWeaponImage.id = `player${i}WeaponImg`
            playerWeaponImage.src = `./assets/dungeon/weapons/${this.playersInfos[i-1].player.weapon.image}`

            playerCard.append(playerName, playerHealth, playerImage, playerWeapon, playerWeaponImage)
            playerInfoDiv.append(playerCard)
            this.controlsElt.playersUi.append(playerInfoDiv)
        }
    }

    setPlayerWeapon(activePlayer) {
        if (activePlayer === this.playersInfos[0]) {
            const playerWeaponName = document.getElementById('player1WeaponName')
            const playerWeaponImg = document.getElementById('player1WeaponImg')
            playerWeaponName.innerText = activePlayer.player.weapon.name
            playerWeaponImg.src = `./assets/dungeon/weapons/${activePlayer.player.weapon.image}`
        } else if (activePlayer === this.playersInfos[1]) {
            const playerWeaponName = document.getElementById('player2WeaponName')
            const playerWeaponImg = document.getElementById('player2WeaponImg')
            playerWeaponName.innerText = activePlayer.player.weapon.name
            playerWeaponImg.src = `./assets/dungeon/weapons/${activePlayer.player.weapon.image}`
        }
    }

    displayWeaponsUi() {
        const weaponUl = document.createElement('ul')
        this.controlsElt.weaponsUi.append(weaponUl)
        for (let i = 1 ; i < this.weaponsInfos.length + 1 ; i++) {
            const weaponLi = document.createElement('li')

            const weaponName = document.createElement('h2')
            weaponName.innerText = this.weaponsInfos[i-1].weapon.name;

            const weaponDamage = document.createElement('span')
            weaponDamage.innerText = this.weaponsInfos[i-1].weapon.damage;

            weaponLi.append(weaponName,weaponDamage)
            weaponUl.append(weaponLi)
        }
    }

    displayFightStart(activePlayer) {
        const activePlayerNameP = document.createElement('h2')
        activePlayerNameP.innerText = `${activePlayer.player.name} lance le combat !`
        this.controlsElt.fightModal.append(activePlayerNameP)
        this.controlsElt.fightModal.removeClass('hidden')

        setTimeout( function () {
            this.controlsElt.fightModal.addClass('hidden')
        }, 2000)
    }

}

export { InterfaceUi }
