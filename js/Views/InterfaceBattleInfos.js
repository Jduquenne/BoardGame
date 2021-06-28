class InterfaceBattleInfos {

    constructor() {
        this.banner = "";

        this.controlsElt = {
            battleModal: $('.battleModal'),
            battleInfos: $('#battleInfos')
        }
    }

    // Fonction qui permet d'afficher la bannière
    display() {
        this.controlsElt.battleInfos.empty()
        const battleInfos = $(`<h2 class='battleInfosText'>${this.banner}</h2>`)
        this.controlsElt.battleInfos.append(battleInfos)
        this.controlsElt.battleModal.removeClass('hidden')
        this.controlsElt.battleInfos.css('display', 'flex')
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerBattleStart(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='targetImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} lance le combat contre ${target.player.name} ! ${targetImg}`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerAttackOrDefence(attacker) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.image}" alt="playerImg"/>`
        const attackButton = "<button class='btn' id='attack'>Attaquer</button>"
        const defenseButton = "<button class='btn' id='defense'>Se défendre</button>"
        this.banner = `${attackerImg} ${attackButton} ${defenseButton}`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerPlayerDamage(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='targetImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`

        this.banner = `${attackerImg}${attacker.player.name} attaque ${target.player.name} / ${target.player.name} perd ${attacker.player.weapon.damage} points de vie.${targetImg}`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerPlayerDamageWithDefense(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        const targetImg = `<img class='targetImg' src="./assets/dungeon/characters/${target.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} met ${attacker.player.weapon.damage / 2} dommages à ${target.player.name} ! Au tour de ${target.player.name}.${targetImg}`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerPlayerDefense(attacker, target) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} se défend ! Au tour de ${target.player.name}.`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerPlayerWin(attacker) {
        const attackerImg = `<img class='attackerImg' src="./assets/dungeon/characters/${attacker.player.image}" alt="playerImg"/>`
        this.banner = `${attackerImg}${attacker.player.name} remporte le duel ! Félicitations`
        this.display()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerNewGame() {
        const newGame = "<button class='btn' id='newGame'>Nouvelle partie</button>"
        const exit = "<button class='btn' id='exit'>Quitter</button>"
        this.banner = `${newGame} ${exit}`
        this.display()
    }
}

export { InterfaceBattleInfos }