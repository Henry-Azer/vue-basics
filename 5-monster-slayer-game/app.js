function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerMaxHealth: 100,

            monsterHealth: 100,
            monsterMaxHealth: 100,

            specialHeal: true,
            loadSpecialHeal: 0,
            specialAttack: true,
            loadSpecialAttack: 0,

            winner: null,
            battleLog: ["The game has started"],
            isGameOver: false,
        };
    },

    computed: {
        monsterHeathBarStyle() {
            return this.isGameOver
                ? { width: 0 + "%" }
                : { width: this.monsterHealth + "%" };
        },
        playerHeathBarStyle() {
            return this.isGameOver
                ? { width: 0 + "%" }
                : { width: this.playerHealth + "%" };
        },
        playerSpecialAttackReady() {
            if (this.specialAttack)
                this.battleLog.push("player special attack ready");

            return !this.specialAttack;
        },
        playerHealingReady() {
            if (this.playerHealth >= 100) return true;

            if (this.specialHeal) this.battleLog.push("player healing ready");

            return !this.specialHeal;
        },
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
                this.isGameOver = true;
                this.battleLog.push("It'a draw!");
            } else if (value <= 0) {
                this.winner = "monster";
                this.isGameOver = true;
                this.battleLog.push("Monster has won");
                this.battleLog.push("You lost!");
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
                this.isGameOver = true;
                this.battleLog.push("It'a drawwwwwwwwwwwww!");
            } else if (value <= 0) {
                this.winner = "player";
                this.isGameOver = true;
                this.battleLog.push("Monster has lost");
                this.battleLog.push("You Win!");
            }
        },
    },

    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;

            this.specialHeal = true;
            this.loadSpecialHeal = 0;
            this.specialAttack = true;
            this.loadSpecialAttack = 0;

            this.winner = null;
            this.isGameOver = false;

            this.battleLog = ["The game has started"];
        },
        attackMonster() {
            this.loadSpecialHeal++;
            this.loadSpecialAttack++;

            var attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.addBattleLog("player", "monster", "damage", attackValue);

            this.attackPlayer();

            this.checkSpecialAttackAndHeal();
        },
        attackPlayer() {
            var attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addBattleLog("monster", "player", "damage", attackValue);
        },
        specialAttackToMonster() {
            this.specialAttack = false;
            this.loadSpecialAttack = 0;

            var attackValue = getRandomNumber(15, 20);
            this.monsterHealth -= attackValue;
            this.addBattleLog(
                "player",
                "monster",
                "special damage",
                attackValue
            );

            this.attackPlayer();
        },
        checkSpecialAttackAndHeal() {
            if (this.loadSpecialAttack === 3) {
                this.loadSpecialAttack = 0;
                this.specialAttack = true;
            }

            if (this.loadSpecialHeal === 3) {
                this.loadSpecialHeal = 0;
                this.specialHeal = true;
            }
        },
        healPlayer() {
            this.specialHeal = false;
            this.loadSpecialHeal = 0;

            var healValue = getRandomNumber(15, 18);

            if (healValue + this.playerHealth > 100) {
                this.playerHealth += healValue / 2;
                this.addBattleLog("player", "himself", "healed", healValue / 2);
            } else {
                this.playerHealth += healValue;
                this.addBattleLog("player", "himself", "healed", healValue);
            }

            this.attackPlayer();
        },
        surrender() {
            this.winner = "monster";
            this.isGameOver = true;
            this.battleLog.push("player surrender for monster");
        },
        addBattleLog(attacker, attacked, skill, value) {
            var log = attacker + " " + skill + " " + attacked + " by " + value;
            this.battleLog.push(log);
        },
    },
});

app.mount("#game");
