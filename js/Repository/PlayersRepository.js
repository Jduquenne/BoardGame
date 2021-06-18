import {Weapon} from "../Entite/Weapon.js";
import {Player} from "../Entite/Player.js";

const data = [
    new Player({ name:'Björn', health: 100, image : "Björn.png"}),
    new Player({ name:'Bolvar', health: 100, image : "Bolvar.png"}),
    new Player({ name:'Brutus', health: 100, image : "Brutus.png"}),
    new Player({ name:'ElonMusk', health: 100, image : "ElonMusk.png"}),
    new Player({ name:'Gunnar', health: 100, image : "Gunnar.png"}),
    new Player({ name:'Indiana', health: 100, image : "Indiana.png"}),
    new Player({ name:'Jail', health: 100, image : "Jail.png"}),
    new Player({ name:'Kerhs', health: 100, image : "Kerhs.png"}),
    new Player({ name:'Khadgar', health: 100, image : "Khadgar.png"}),
    new Player({ name:'Lancelot', health: 100, image : "Lancelot.png"}),
    new Player({ name:'Prirodny', health: 100, image : "Prirodny.png"}),
    new Player({ name:'Thork', health: 100, image : "Thork.png"}),
    new Player({ name:'Vanessa VanCleef', health: 100  , image : "Van_cleef.png"}),
    new Player({ name:'Xena', health: 100, image : "Xena.png"}),
    new Player({ name:'Yggdrassil', health: 100, image : "Yggdrassil.png"}),
]
class PlayersRepository {

    static findPlayerByName(name){
        return data.filter(player => player.name === name)
    }

    static findAllPlayers(){
        return data;
    }
}

export { PlayersRepository }
