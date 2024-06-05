const readline = require('readline');

const ROLL_COMMAND = 'r';
const QUIT_COMMAND = 'q';
const LIST_COMMAND = 'l';
const RESET_COMMAND = 'reset';

const Rarity = {
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Mythic'
};

class Aura {
    constructor(name, rarity) {
        this.name = name;
        this.rarity = rarity;
    }
}

class AuraRollingGame {
    constructor() {
        this.auras = this.generateAuras();
        this.rarityChances = {
            1: 60,
            2: 25,
            3: 10,
            4: 4,
            5: 1
        };
        this.score = 0;
        this.readlineInterface = null;
    }

    generateAuras() {
        return [
            new Aura("Aura of Strength", 1),
            new Aura("Aura of Agility", 1),
            new Aura("Aura of Intelligence", 1),
            new Aura("Aura of Fortitude", 2),
            new Aura("Aura of Swiftness", 2),
            new Aura("Aura of Wisdom", 2),
            new Aura("Aura of Power", 3),
            new Aura("Aura of Speed", 3),
            new Aura("Aura of Knowledge", 3),
            new Aura("Aura of Might", 4),
            new Aura("Aura of Haste", 4),
            new Aura("Aura of Insight", 4),
            new Aura("Aura of Dominance", 5),
            new Aura("Aura of Fleetness", 5),
            new Aura("Aura of Enlightenment", 5)
        ];
    }

    getRandomAuraOfRarity(rarity) {
        const aurasOfRarity = this.auras.filter(aura => aura.rarity === rarity);
        return aurasOfRarity[Math.floor(Math.random() * aurasOfRarity.length)];
    }

    rollAura() {
        const randomNumber = Math.random() * 100;
        let cumulativeChance = 0;

        for (const rarity in this.rarityChances) {
            cumulativeChance += this.rarityChances[rarity];
            if (randomNumber < cumulativeChance) {
                const rolledAura = this.getRandomAuraOfRarity(Number(rarity));
                console.log(`You rolled: ${rolledAura.name} (${Rarity[rolledAura.rarity]})`);
                this.score += rolledAura.rarity;
                console.log(`Your current score is: ${this.score}`);
                return rolledAura;
            }
        }
    }

    displayAuras() {
        console.log('List of auras:');
        this.auras.forEach(aura => console.log(`${aura.name} (${Rarity[aura.rarity]})`));
    }

    resetGame() {
        this.score = 0;
        console.log('Game reset. Your score is now 0.');
    }

    handleInput(input) {
        switch (input.toLowerCase()) {
            case ROLL_COMMAND:
                this.rollAura();
                break;
            case QUIT_COMMAND:
                console.log(`Your final score is: ${this.score}`);
                this.readlineInterface.close();
                break;
            case LIST_COMMAND:
                this.displayAuras();
                break;
            case RESET_COMMAND:
                this.resetGame();
                break;
            default:
                console.log('Invalid command. Please try again.');
        }
    }

    async start() {
        this.readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.readlineInterface.on('line', (input) => this.handleInput(input));

        console.log(`Welcome to Aura Rolling Game!`);
        console.log(`Commands: '${ROLL_COMMAND}' to roll a new aura, '${QUIT_COMMAND}' to quit, '${LIST_COMMAND}' to list auras, '${RESET_COMMAND}' to reset the game.`);
    }
}

// Example usage:
const game = new AuraRollingGame();
game.start();
