import { Trap } from "../Models/Trap.js";

const data = [
    new Trap('trap1', 'trap1.png'),
    new Trap('trap2', 'trap1.png'),
    new Trap('trap3', 'trap1.png'),
    new Trap('trap4', 'trap1.png'),
    new Trap('trap5', 'trap1.png'),
]

class TrapRepository {
    static findAllTrap(){
        return data;
    }

    static getTrapLength() {
        return data.length
    }
}

export { TrapRepository }