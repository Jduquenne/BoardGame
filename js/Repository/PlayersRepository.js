import {Player} from "../Models/Player.js";

// Base de donnée des joueurs disponible - Ajout de joueur simplifié
const data = [
    new Player({ name:'Björn', health: 100, image : "Björn.png", maxMove: 3}),
    new Player({ name:'Bolvar', health: 150, image : "Bolvar.png", maxMove: 2}),
    new Player({ name:'Brutus', health: 75, image : "Brutus.png", maxMove: 4}),
    new Player({ name:'ElonMusk', health: 100, image : "ElonMusk.png", maxMove: 3}),
    new Player({ name:'Gunnar', health: 75, image : "Gunnar.png", maxMove: 4}),
    new Player({ name:'Indiana', health: 70, image : "Indiana.png", maxMove: 5}),
    new Player({ name:'Jail', health: 100, image : "Jail.png", maxMove: 3}),
    new Player({ name:'Kerhs', health: 100, image : "Kerhs.png", maxMove: 5}),
    new Player({ name:'Khadgar', health: 100, image : "Khadgar.png", maxMove: 3}),
    new Player({ name:'Lancelot', health: 100, image : "Lancelot.png", maxMove: 4}),
    new Player({ name:'Prirodny', health: 100, image : "Prirodny.png", maxMove: 3}),
    new Player({ name:'Thork', health: 100, image : "Thork.png", maxMove: 2}),
    new Player({ name:'Vanessa VanCleef', health: 100  , image : "Van_cleef.png", maxMove: 3}),
    new Player({ name:'Xena', health: 300, image : "Xena.png", maxMove: 1}),
    new Player({ name:'Yggdrassil', health: 100, image : "Yggdrassil.png", maxMove: 3}),
]
class PlayersRepository {

    static findAllPlayers(){
        return data;
    }
}

export { PlayersRepository }
