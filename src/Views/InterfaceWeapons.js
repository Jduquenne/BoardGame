class InterfaceWeapons {

    constructor(weaponsInfos) {
        this.weaponsInfos = weaponsInfos;

        this.controlsElt = {
            weaponsUi: $('#weaponList'),
            modalRules: $('#modal'),
            btnRules: $('#openRules'),
            spanClose: $('.close')
        }
    }

    // Affiche l'interface des armes sur le terrain
    displayWeapons() {
        this.controlsElt.weaponsUi.empty()
        for (let i = 0; i < this.weaponsInfos.length; i++) {
            this.controlsElt.weaponsUi.append(this.generateOneWeaponUI(this.weaponsInfos[i].weapon))
        }
    }

    // créer une arme dans l'interface
    generateOneWeaponUI(weapon) {
        const weaponInfo = $("<div class='weaponInfo'></div>")
        const weaponImg = $(`<img src="./assets/dungeon/weapons/${weapon.image}\" alt="playerImg"/>`)
        const weaponDamage = $(`<span>: ${weapon.damage}</span>`)

        return weaponInfo.append(weaponImg, weaponDamage)
    }

    // initialise les boutons du modal des régles
    initOptionsModal() {
        this.openModal()
        this.closeModal()
    }

    // Ouvre le modal des régles avec l'interface des armes
    openModal() {
        this.controlsElt.btnRules.on("click", function () {
                this.controlsElt.modalRules.css('display', 'block')
            }.bind(this)
        );
    }

    // Ferme le modal des régles avec l'interface des armes
    closeModal() {
        this.controlsElt.spanClose.on("click", function () {
                this.controlsElt.modalRules.css('display', 'none')
            }.bind(this)
        );
    }

}
export { InterfaceWeapons }