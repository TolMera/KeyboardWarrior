class MainMenu extends GameScreen {
    template = '/view/mainMenu/template.html';

    constructor() {
        super();
        console.debug(`Loading: ${this.constructor.name}`);
    }

    // Correctly fetch and read the template as text
    async loadTemplate() {
        console.debug("debug: f1486080-2c93-5af0-b46f-9eca7a86de8d");
        try {
            const response = await fetch(this.template);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return await response.text();
        } catch (error) {
            console.error('Failed to load template:', error);
        }
    }

    async render() {
        super.render();
        // Apply the loaded template to the body's HTML
        const templateHTML = await this.loadTemplate();
        if (templateHTML) {
            $('body').html(templateHTML);
        }

        // Set the background image using CSS
        $('body').css('background-image', 'url("/resources/images/backgrounds/mainMenu.png")');

        // Load CSS
        this.loadMyCSS();

        this.attachListeners();
    }

    // Load CSS files
    loadMyCSS() {
        loadNewCSS('/view/mainMenu/index.css');
    }

    attachListeners() {
        $('#loadGame').on('click', KeyboardWarrior.game.loadGameState.bind(KeyboardWarrior.game));
        $('#newGame').on('click', KeyboardWarrior.game.playScreen.bind(KeyboardWarrior.game));
        $('#tutorial').on('click', KeyboardWarrior.game.tutorialScreen.bind(KeyboardWarrior.game));
        // $('#settings').
    }

}

globalThis.KeyboardWarrior.mainMenu = new MainMenu();