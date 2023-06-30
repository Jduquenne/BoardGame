class InterfaceTrapRelease {

    constructor() {
        this.banner = "";

        this.controlsElt = {
            trapModal: $('.trapModal'),
            trapInfos: $('#trapInfos')
        }
    }

    // Fonction qui permet d'afficher la bannière
    display() {
        this.controlsElt.trapInfos.empty()
        const trapInfo = $(`<div class='trapInfosText'>${this.banner}</div>`)
        this.controlsElt.trapInfos.append(trapInfo)
        this.controlsElt.trapModal.removeClass('hidden')
        this.controlsElt.trapModal.css('display', 'flex')
    }

    hidden() {
        this.controlsElt.trapModal.addClass('hidden')
        this.controlsElt.trapModal.removeAttr('style')
        this.controlsElt.trapInfos.empty()
    }

    // Actualise la valeur de this.banner et affiche la bannière
    setBannerPlayerTrapped(currentPlayer) {
        const currentPlayerImg = `<img class='currentPlayerImg' src="./assets/dungeon/characters/${currentPlayer.player.image}" alt="playerImg"/>`
        this.banner = `${currentPlayerImg}${currentPlayer.player.name} déclenche un piége, -20 points de vie !`
        this.display()
        setTimeout(() => this.hidden(), 1500)
    }
}

export { InterfaceTrapRelease }