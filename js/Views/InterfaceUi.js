import { InterfacePlayers } from "./InterfacePlayers.js";
import { InterfaceWeapons } from "./InterfaceWeapons.js";
import { InterfaceBattleInfos } from "./InterfaceBattleInfos.js";
import { InterfaceMenu } from "./InterfaceMenu.js";

class InterfaceUi {

    constructor(playersInfos, weaponsInfos) {
        this.playersInfos = playersInfos
        this.weaponsInfos = weaponsInfos

        this.interfacePlayer = new InterfacePlayers(this.playersInfos)
        this.interfaceWeapon = new InterfaceWeapons(this.weaponsInfos)
        this.interfaceBattle = new InterfaceBattleInfos(this.playersInfos)
        this.interfaceMenu = new InterfaceMenu()
    }


    displayUI () {
        this.interfaceMenu.removeInterfaceMenu()
        this.interfacePlayer.displayPlayers()
        this.interfaceWeapon.displayWeapons()
        this.interfaceWeapon.initOptionsModal()
    }

    displayMainMenu() {
        $('.game').css('display', 'none')
        $('#board').empty()
        this.interfaceMenu.displayInterfaceMainMenu()
    }
}

export { InterfaceUi }
