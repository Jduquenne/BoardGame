import {Bonus} from '../Models/Bonus.js'

const data = [
    new Bonus('PM 2', 'move', 2, 'PM.png'),
    new Bonus('PM 3', 'move', 2, 'PM.png'),
    new Bonus('life medium', 'life', 50, 'life.png'),
    new Bonus('life low', 'life', 30, 'life.png'),
    new Bonus('life big', 'life', 100, 'life.png')
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