class InterfaceBattleInfos {

    constructor() {
        this.banner = "";

        this.controlsElt = {
            battleInfos: $('#battleInfos')
        }
    }

    display() {
        this.controlsElt.battleInfos.empty()
        const battleInfos = $(`<h2 class='battleInfosText'>${this.banner}</h2>`)
        this.controlsElt.battleInfos.append(battleInfos)
        this.controlsElt.battleInfos.removeClass('hidden')
        this.controlsElt.battleInfos.css('display', 'flex')
    }

    setBannerBattleStart(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='attackerImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} lance le combat contre ${target.player.name} ! ${targetImg}`
        this.display()
    }

    setBannerAttackOrDefence(attacker) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.image}" alt="playerImg"/>`
        const attackButton = "<button class='btn' id='attack'>Attaquer</button>"
        const defenseButton = "<button class='btn' id='defense'>Se défendre</button>"
        this.banner = `${attackerImg} ${attackButton} ${defenseButton}`
        this.display()
    }

    setBannerPlayerDamage(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='attackerImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} attaque ${target.player.name}. ${target.player.name} perd <span class="bannerDmg">&nbsp${attacker.player.weapon.damage}&nbsp</span> points de vie.${targetImg}`
        this.display()
    }

    setBannerPlayerDamageWithDefense(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='attackerImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} met <span class="bannerDmg">&nbsp${attacker.player.weapon.damage / 2}&nbsp</span> dommages à ${target.player.name} ! Au tour de ${target.player.name}.${targetImg}`
        this.display()
    }

    setBannerPlayerDefense(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} se défend ! Au tour de ${target.player.name}.`
        this.display()
    }

    setBannerPlayerWin(attacker) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} remporte le duel ! Félicitations`
        this.display()
    }

    setBannerNewGame() {
        const newGame = "<button class='btn' id='newGame'>Nouvelle partie</button>"
        const exit = "<button class='btn' id='exit'>Quitter</button>"
        this.banner = `${newGame} ${exit}`
        this.display()
    }
}

export { InterfaceBattleInfos }