import {Player} from "../Models/Player.js";

// Base de donnée des joueurs disponible - Ajout de joueur simplifié
const data = [
    new Player('Björn', 100, "Björn.png", 3),
    new Player('Bolvar', 150, "Bolvar.png", 2),
    new Player('Brutus', 75, "Brutus.png", 4),
    new Player('ElonMusk', 100, "ElonMusk.png", 3),
    new Player('Gunnar', 75, "Gunnar.png", 4),
    new Player('Indiana', 70, "Indiana.png", 5),
    new Player('Jail', 100, "Jail.png", 3),
    new Player('Kerhs', 100, "Kerhs.png", 5),
    new Player('Khadgar', 100, "Khadgar.png", 3),
    new Player('Lancelot', 100, "Lancelot.png", 4),
    new Player('Prirodny', 100, "Prirodny.png", 3),
    new Player('Thork', 100, "Thork.png", 2),
    new Player('Vanessa VanCleef', 100  ,"Van_cleef.png", 3),
    new Player('Xena', 300, "Xena.png", 1),
    new Player('Yggdrassil', 100, "Yggdrassil.png", 3),
]
class PlayersRepository {

    static findAllPlayers(){
        return data;
    }
}

export { PlayersRepository }
