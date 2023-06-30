const data = [
    { name:'trap1', image : "trap1.png"},
    { name:'trap2', image : "trap1.png"},
    { name:'trap3', image : "trap1.png"},
    { name:'trap4', image : "trap1.png"},
    { name:'trap5', image : "trap1.png"},
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