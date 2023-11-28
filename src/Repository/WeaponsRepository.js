import { Weapon } from '../Models/Weapon.js'
// Base de donnée des armes disponible - Ajout d'arme simplifié
const data =[
    new Weapon('Excalibur', 40, "Excalibur.png"),
    new Weapon('Deuilleombre', 40, "Deuilleombre.png"),
    new Weapon('Hurlesang', 35, "Hurlesang.png"),
    new Weapon('Arc de Nodens', 35, "Arc_de_Nodens.png"),
    new Weapon('Marteau du destin', 30, "Marteau_du_destin.png"),
    new Weapon('Aiguille', 30, "Aiguille.png"),
    new Weapon('Quel\'delar', 25, "Quel_delar.png"),
    new Weapon('Lame du puits de soleil', 25, "Lame_du_puits_de soleil.png"),
    new Weapon('Shuriken de Zorro', 20, "Shuriken_de_Zorro.png"),
    new Weapon('Gressil', 20, "Gressil.png"),
    new Weapon('Skyword', 15, "Skyword.png"),
    new Weapon('Firefox', 15, "Firefox.png"),
]
class WeaponsRepository {
    static findAllWeapons(){
        return data;
    }
}

export { WeaponsRepository }
