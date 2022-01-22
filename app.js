function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({

    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],


        }
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return {
                width: this.monsterHealth + '%'
            };
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return {
                    width: '0%',
                };
            }
            return { width: this.playerHealth + '%' };
        },
        useSp() {
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // A draw 
                this.winner = 'Drwa';
            } else if (value <= 0) {
                // player lost
                this.winner = "Monster";
            }


        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // A draw 
                this.winner = 'Drwa';

            } else if (value <= 0) {
                // player win 
                this.winner = 'Player';

            }
        },


    },


    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100,
                this.winner = null,
                this.currentRound = 0,
                this.logMessages = []


        },
        surrender() {
            this.winner = 'monster';


        },


        attackMonster() {
            this.currentRound++;
            let attack = getRandomValue(5, 12);
            this.monsterHealth -= attack;
            this.addlogMessage('player', 'attack', attack);
            this.attackPlayer();


        },
        attackPlayer() {
            let attack = getRandomValue(8, 12);
            this.playerHealth -= attack;
            this.addlogMessage('monster', 'attack', attack);

        },
        spAttack() {
            this.currentRound++;
            let attack = getRandomValue(10, 25);
            this.monsterHealth -= attack;
            this.addlogMessage('player', 'specail attack', attack);
            this.attackPlayer();

        },
        heal() {
            this.currentRound++;
            const healValue = getRandomValue(10, 25);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {


                this.playerHealth += healValue;
            }
            this.addlogMessage('player', 'heal', healValue);

            this.attackPlayer();
        },
        addlogMessage(who, what, value) {
            // add to the begain 
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });

        }

    },

});










app.mount('#game');