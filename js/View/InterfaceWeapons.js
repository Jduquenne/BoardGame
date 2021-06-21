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

    displayWeapons() {
        this.controlsElt.weaponsUi.empty()
        for (let i = 0; i < this.weaponsInfos.length; i++) {
            this.controlsElt.weaponsUi.append(this.generateOneWeaponUI(this.weaponsInfos[i].weapon))
        }
    }

    generateOneWeaponUI(weapon) {
        const weaponInfo = $("<div class='weaponInfo'></div>")
        const weaponImg = $(`<img src="./assets/dungeon/weapons/${weapon.image}\" alt="playerImg"/>`)
        const weaponDamage = $(`<span>: ${weapon.damage}</span>`)

        return weaponInfo.append(weaponImg, weaponDamage)
    }

    setOptionsModal() {
        this.openModal()
        this.closeModal()
    }

    openModal() {
        this.controlsElt.btnRules.on("click", function () {
                this.controlsElt.modalRules.css('display', 'block')
            }.bind(this)
        );
    }

    closeModal() {
        this.controlsElt.spanClose.on("click", function () {
                this.controlsElt.modalRules.css('display', 'none')
            }.bind(this)
        );
    }

}
export { InterfaceWeapons }