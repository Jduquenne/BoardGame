import { Bonus } from "../Models/Bonus.js";

const data = [
    { name:'PM 2', type: 'move', image : "PM.png", amount: 2},
    { name:'PM 3', type: 'move', image : "PM.png", amount: 2},
    { name:'life medium', type: 'life', image : "life.png", amount: 50},
    { name:'life low', type: 'life', image : "life.png", amount: 30},
    { name:'life big', type: 'life', image : "life.png", amount: 100}
]

class BonusRepository {
    static findAllBonus(){
        return data;
    }

    static getBonusLength() {
        return data.length
    }
}

export { BonusRepository }