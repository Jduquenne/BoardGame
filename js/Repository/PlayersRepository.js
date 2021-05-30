import {Weapon} from "../Entite/Weapon.js";

const data =[
    { name:'Björn', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Björn.png"},
    { name:'Bolvar', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Bolvar.png"},
    { name:'Brutus', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Brutus.png"},
    { name:'ElonMusk', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "ElonMusk.png"},
    { name:'Gunnar', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Gunnar.png"},
    { name:'Indiana', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Indiana.png"},
    { name:'Jail', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Jail.png"},
    { name:'Kerhs', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Kerhs.png"},
    { name:'Khadgar', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Khadgar.png"},
    { name:'Lancelot', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Lancelot.png"},
    { name:'Prirodny', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Prirodny.png"},
    { name:'Thork', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Thork.png"},
    { name:'Vanessa VanCleef', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Van_cleef.png"},
    { name:'Xena', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Xena.png"},
    { name:'Yggdrassil', health: 100, weapon: new Weapon('Épée d\'entrainement' , 10, "basic_weapon.png") , image : "Yggdrassil.png"},

]
class PlayersRepository {

    static findPlayerByName(name){
        return data.filter(player => player.name === name)
    }

    static findAllWeapons(){
        return data;
    }
}

export { PlayersRepository }
