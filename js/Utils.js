class Utils {
    static randomWeaponDamage() {
        let damageNumbers = [10, 15, 20, 25, 30, 35, 40];
        const random = Math.floor(Math.random() * damageNumbers.length);
        return damageNumbers[random];
    }

    static randomWeaponName() {
        let weaponsNames = ['Excalibur', 'Dragonborn', 'Mjöllnir', 'Parashu', 'Almace', 'Baptism', 'Durandal'];
        const random = Math.floor(Math.random() * weaponsNames.length);
        return weaponsNames[random];
    }

    static randomPlayerName() {
        let playerNames = ['Arthur', 'Jackouille', 'Perceval', 'King-kong', 'Wallace', 'Billie the kid', 'Godzilla'];
        const random = Math.floor(Math.random() * playerNames.length);
        return playerNames[random];
    }

    static getImgNameInPath(path) {
        return path.split('/').reverse()[0].replace(/\.[^/.]+$/, "");
    }


}

export { Utils }
