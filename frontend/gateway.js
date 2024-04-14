/**
 * This will handled the comms between the server and the client
 */
class Connection {
    constructor() {
        console.debug(`Loading: ${this.constructor.name}`);
        // Connection controller - for comms back to the server is we implement that
    }
}

/**
 * This will hold the current game state
 */
class Game {
    currentScreen;
    chartData = [];

    constructor() {
        console.debug(`Loading: ${this.constructor.name}`);
        this.currentScreen = "mainMenu";

        this.mainMenuScreen();
    }

    newGame() {

    }

    saveGameState(gameState) {
        // Convert the game state object to a JSON string
        const gameStateString = JSON.stringify(this);
        // Store it in localStorage
        localStorage.setItem('gameState', gameStateString);
        return this;
    }

    loadGameState() {
        const gameStateString = localStorage.getItem('gameState');

        if (gameStateString) {
            Object.assign(this, JSON.parse(gameStateString));
        }

        return this;
    }

    mainMenuScreen() {
        this.dynamicLoad('/view/mainMenu/index.js', 'mainMenu');
    }

    tutorialScreen() {
        this.dynamicLoad('/view/tutorial/index.js', 'tutorial');
    }

    playScreen() {
        this.dynamicLoad('/view/play/index.js', 'play');
    }

    dynamicLoad(path, name) {
        if (!KeyboardWarrior[name]) {
            $.getScript(path)
                .done((script, textStatus) => {
                    console.log('loaded: 1f1b5e9d-b681-5831-bb45-7d9d2cd74cf3');
                    // You can now use any functionality that the script added
                    KeyboardWarrior[name].render();
                })
                .fail((jqxhr, settings, exception) => {
                    console.error('Error loading: d573a929-7de5-5e7a-bd6d-9427c4550a37');
                    console.error(exception);
                });
        }
        else {
            KeyboardWarrior[name].render();
        }
    }
}

/**
 * A class to be extended with different screens like the title, tutorial, settings etc.
 */
class GameScreen {
    name;

    constructor(name) {
        console.debug(`Loading: ${this.constructor.name}`);
        this.name = name;
    }

    render() {
        const body = $('body');
        body.empty();
        body.append(this.template);
    }
}

const cssUtilities = '/utilities/css.js';
$.getScript(cssUtilities);
const jsUtilities = '/utilities/js.js';
$.getScript(jsUtilities);
const textUtilities = '/utilities/text.js';
$.getScript(textUtilities);
const chartUtilities = '/utilities/chart.js';
$.getScript(chartUtilities);

globalThis.KeyboardWarrior = {};
KeyboardWarrior.connection = new Connection();
KeyboardWarrior.game = new Game();

