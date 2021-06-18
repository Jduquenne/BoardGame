import {InterfacePlayers} from "./InterfacePlayers.js";
import {InterfaceWeapons} from "./InterfaceWeapons.js";
import {InterfaceBattleInfos} from "./InterfaceBattleInfos.js";

class InterfaceUi {

    constructor(playersInfos, weaponsInfos) {
        this.playersInfos = playersInfos
        this.weaponsInfos = weaponsInfos

        this.interfacePlayer = new InterfacePlayers(this.playersInfos)
        this.interfaceWeapon = new InterfaceWeapons(this.weaponsInfos)
        this.interfaceBattle = new InterfaceBattleInfos(this.playersInfos)
    }

    displayUI () {
        this.interfacePlayer.display()
        this.interfaceWeapon.display()
    }
}

export { InterfaceUi }
