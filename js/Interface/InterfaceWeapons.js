class InterfaceWeapons {

    constructor(weaponsInfos) {
        this.weaponsInfos = weaponsInfos;
        this.card = this.initCard()

        this.controlsElt = {
            weaponsUi: $('#weaponsList')
        }
    }

    initCard() {
        return $(`<li class="weaponLi"></li>`);
    }

    display() {
        const weaponUl = $("<ul class='weaponUl'></ul>")
        const weaponsTitle = $("<h1 class='weaponsTitle'>Weapons</h1>")
        this.controlsElt.weaponsUi.append(weaponsTitle);
        for (let i = 0; i < this.weaponsInfos.length; i++) {
            this.card.data(this.weaponsInfos[i].weapon.name, this.weaponsInfos[i])

            const weaponLi = $("<li class='weaponLi'></li>")

            const weaponImg = $(`<img class='weaponImg' src="./assets/dungeon/weapons/${this.card.data(this.weaponsInfos[i].weapon.name).weapon.image}\" alt="playerImg"/>`)

            const weaponName = $(`<h2 class='weaponName'>${this.card.data(this.weaponsInfos[i].weapon.name).weapon.name}</h2>`)
            const weaponDamage = $(`<span class='weaponDamage'>${this.card.data(this.weaponsInfos[i].weapon.name).weapon.damage}</span>`)

            weaponLi.append(weaponImg,weaponName,weaponDamage)
            weaponUl.append(weaponLi)
            this.controlsElt.weaponsUi.append(weaponUl)
        }
    }
}
export { InterfaceWeapons }