import {Weapon} from "./Weapon.js";

class Player {
    constructor(name,health,weapon,image) {
        this.name = name;
        this.health = health;
        this.weapon = new Weapon('Epée de boisaille',5, "./assets/dungeon/weapons/basic_weapon.png",);
        this.image = image;
    }

    pickWeapon() {
        if (activePlayer.playerCell.weaponOnCell) {
            // Trades player weapon for cell weapon
            const playerWeapon = activePlayer.weapon;
            activePlayer.weapon = activePlayer.playerCell.weaponOnCell;
            activePlayer.playerCell.weaponOnCell = playerWeapon;

            // Changes the Html interface of the cell to display the new weapon on the grid
            if (activePlayer.playerCell.coordY === 0) {
                let cellWithNewWeaponHtml = $(`#${activePlayer.playerCell.coordX}`);
                cellWithNewWeaponHtml
                    .removeClass("weapon10 weapon20 weapon30 weapon40 weapon50")
                    .addClass(activePlayer.playerCell.weaponOnCell.toString());
            } else {
                let cellWithNewWeaponHtml = $(`#${activePlayer.playerCell.coordY}${activePlayer.playerCell.coordX}`);
                cellWithNewWeaponHtml
                    .removeClass("weapon10 weapon20 weapon30 weapon40 weapon50")
                    .addClass(activePlayer.playerCell.weaponOnCell.toString());
            }
        }
    }
}

export { Player };
