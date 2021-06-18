class Fight {
    constructor(attacker, target, ui) {
        this.attacker = attacker;
        this.target = target;

        this.ui = ui;
    }

    fight() {
        this.ui.interfaceBattle.setBannerAttackOrDefence(this.attacker.player)

        $("#attack").on("click", function () {
                console.log("check button attack")
                this.playerAttack()
            }.bind(this)
        );

        $("#defense").on("click", function () {
                console.log("check button defense")
                this.playerDefense()
            }.bind(this)
        );
    }

    playerAttack() {
        if (this.target.player.defense === true) {
            console.log("attack with defense")
            this.target.player.health -= this.attacker.player.weapon.damage / 2;
            this.target.player.defense = false;

            if (this.target.player.health < 0) {
                this.target.player.health = 0
            }

            this.ui.interfacePlayer.setPlayerHealth(this.target)

            this.ui.interfaceBattle.setBannerPlayerDamageWithDefense(this.attacker, this.target)
        } else {
            console.log("attack no defense")
            this.target.player.health -= this.attacker.player.weapon.damage;

            if (this.target.player.health < 0) {
                this.target.player.health = 0
            }

            this.ui.interfacePlayer.setPlayerHealth(this.target)

            this.ui.interfaceBattle.setBannerPlayerDamage(this.attacker, this.target)
        }
        setTimeout(() => this.checkVictory(), 1500)
    }

    playerDefense() {
        this.attacker.player.defense = true;
        this.ui.interfaceBattle.setBannerPlayerDefense(this.attacker, this.target)
        setTimeout(() => this.checkVictory(), 1500)
    }

    checkVictory() {
        if (this.target.player.health <= 0) {
            this.ui.interfaceBattle.setBannerPlayerWin(this.attacker)
            setTimeout(() => this.newGame(), 1500)
        } else {
            this.changeFighter();
            this.fight();
        }
    }

    changeFighter() {
        [this.attacker,this.target] = [this.target,this.attacker];
    }

    newGame() {
        this.ui.interfaceBattle.setBannerNewGame()

        $("#newGame").on("click", function () {
                document.location.reload()
            }.bind(this)
        );

        $("#exit").on("click", function () {
                window.close()
            }.bind(this)
        );
    }
}

export { Fight }