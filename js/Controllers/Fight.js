class Fight {

    constructor(attacker, target, interfaceUi) {
        this.attacker = attacker;
        this.target = target;

        this.interfaceUi = interfaceUi;
    }

    // Affiche la bannière Choix d'action
    fight() {
        this.interfaceUi.interfaceBattle.setBannerAttackOrDefence(this.attacker.player)

        // Action qui effectue une attack
        $("#attack").on("click", function () {
                this.playerAttack()
            }.bind(this)
        );

        // Action qui effectue une défense
        $("#defense").on("click", function () {
                this.playerDefense()
            }.bind(this)
        );
    }

    // Le joueur attaque la cible
    playerAttack() {
        // Si le cible est dans la posture défensif
        if (this.target.player.defense === true) {
            // alors les dégats de son arme sont divisé par 2
            this.target.player.health -= this.attacker.player.weapon.damage / 2;
            this.target.player.defense = false;

            this.checkHealth()

            this.interfaceUi.interfacePlayer.setPlayerHealth(this.target)
            this.interfaceUi.interfaceBattle.setBannerPlayerDamageWithDefense(this.attacker, this.target)
        } else {
            // sinon l'attaquant attaque avec 100% des dégats de son arme
            this.target.player.health -= this.attacker.player.weapon.damage;

            this.checkHealth()

            this.interfaceUi.interfacePlayer.setPlayerHealth(this.target)
            this.interfaceUi.interfaceBattle.setBannerPlayerDamage(this.attacker, this.target)
        }
        setTimeout(() => this.checkVictory(), 1500)
    }

    // L'attaquant passe en posture défensive
    playerDefense() {
        this.attacker.player.defense = true;
        this.interfaceUi.interfaceBattle.setBannerPlayerDefense(this.attacker, this.target)
        setTimeout(() => this.checkVictory(), 1500)
    }

    // Vérifie si la vie de la cible est inférieur à 0 et la passe à 0
    checkHealth() {
        if (this.target.player.health < 0) {
            this.target.player.health = 0
        }
    }

    // Vérifie si la cible à ses points de vie à 0
    checkVictory() {
        if (this.target.player.health <= 0) {
            this.interfaceUi.interfaceBattle.setBannerPlayerWin(this.attacker)
            setTimeout(() => this.newGame(), 1500)
        } else {
            this.changeFighter();
            this.fight();
        }
    }

    // Passe la cible en attaquant
    changeFighter() {
        [this.attacker,this.target] = [this.target,this.attacker];
    }

    // Choix d'une nouvelle partie ou quitter le jeu
    newGame() {
        this.interfaceUi.interfaceBattle.setBannerNewGame()

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