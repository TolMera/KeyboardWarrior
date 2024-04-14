const ONE_SECOND = 1_000;

class Play extends GameScreen {
    template = '/view/play/template.html';

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
        this.populateTheChant();
        this.attachListeners();
    }

    // Load CSS files
    loadMyCSS() {
        loadNewCSS('/view/play/index.css');
    }

    sampleText = '';
    userInput = '';

    populateTheChant() {
        const chant = randomPop(this.chants);
        if (chant) {
            this.sampleText = chant;
            $('#sampleText')[0].innerText = chant;
        }
        else if (this.chants.length === 0) {
            // TODO:  You have summoned everything that can be summoned
        }
    }


    attachListeners() {
        $('html').on('keydown', (event) => {
            if (!this.timer) {
                $('#userInput')[0].innerText = '';
                // Start the timer only if the key is alphanumeric or punctuation
                if (/[\w\d\p{P}]/u.test(event.key)) {
                    this.startTimer();
                    this.timer = true; // Set a flag indicating the timer is running
                }
            }

            // Handling special keys
            console.log(event);
            if (event.key === 'Enter') {
                this.userInput += '\n';
                $('#userInput')[0].innerText = this.userInput; // Add a newline character
                const newlines = $('#userInput')[0].innerText.split('\n').length;
                const targetLines = $('#sampleText')[0].innerText.split('\n').length;
                if (newlines > targetLines) this.endTimer();
            }
            else if (event.key.length > 1) {
                // Don't do anything with characters that are not a single character in length
            }
            // I don't want to purge the last character
            // else if (event.key === 'Backspace') {
                // Remove the last character
                // $('#userInput')[0].innerText = $('#userInput')[0].innerText.slice(0, -1);
            // }
            else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
                // Append the key if it's not a control/meta/alt combination
                if (/[\w\d\p{P}\s]/u.test(event.key)) {
                    this.userInput += event.key;
                    $('#userInput')[0].innerText = this.userInput; // Add a newline character
                }
            }    
        });
    }

    endTimer() {
        console.log("debug: dcb85dea-ab09-5d32-9cda-8558ad4fed98");

        this.endTime = new Date();
        this.timer = false; // Reset the flag when the timer ends
        clearInterval(this.ticker);
        clearTimeout(this.timerTimeout);

        this.tallyScore();

        this.populateTheChant();

        this.ticker = undefined;
        this.timer = undefined;
        this.countdown = undefined;
        this.timerTimeout = undefined;
    }

    tallyScore() {
        const timePassed = this.endTime - this.startTime;

        const diffScore = this.sampleText.length - levenshteinDistance(this.sampleText, this.userInput);
        console.log(diffScore, timePassed);

        KeyboardWarrior.game.chartData.push({
            x: diffScore,
            y: timePassed/ONE_SECOND,
        });

        this.userInput = '';
        this.sampleText = '';
    }

    ticker = undefined;
    timer = undefined;
    countdown = undefined;
    timerTimeout = undefined;
    startTime = undefined;
    endTime = undefined;
    startTimer() {
        this.startTime = new Date();

        this.countdown = 60 * ONE_SECOND;

        this.ticker = setInterval(this.tick.bind(this), ONE_SECOND);
        this.timerTimeout = setTimeout(this.endTimer, this.countdown);
    }

    tick() {
        this.countdown -= ONE_SECOND;
        // Get the timer element, and decriment the counter
        $('#timer')[0].innerText = this.countdown/ONE_SECOND;
    }

    chants = [
        `Oh, mighty Voidsay, lurker of the code deep,
        With a whisper and a keystroke, awake from your sleep!
        Tap-tap-tap, on the keys so bright,
        Bring forth the Void, to code through the night!
        Echo, echo, in the digital abyss,
        Summon the Voidsay with a message like this!`,
        `Hear ye, hear ye, collectors of lore,
        In the quest for the coin, one hundred and more!
        Click-clack, click-clack, gather your stash,
        Summon the 100th_Coin with a virtual dash!
        Coins in the cloud, swirling around,
        Bring forth the treasure, waiting to be found!`,
        `Oh, 764hotshot, gamer so bold,
        With a click and a tap, let the fun unfold!
        Zoom, zoom, on the digital track,
        Summon the hotshot, no looking back!
        Keys that clatter, screens that glow,
        Bring forth the hotshot, let the games flow!`,
        `Oh, grand Akmon, wielder of the byte,
        From realms of code, bring your light!
        Tap, tap, tap on the gate of zeroes,
        Summon the Akmon, hero of the tech heroes!
        Beeps and buzzes, flashing screens,
        Bring forth Akmon, where digital dreams convene!`,
        `Alejandrodlsp, swift coder of the night,
        With a flick and a click, step into the light!
        Lines of logic, crafted so fine,
        Summon alejandrodlsp, with code divine!`,
        `AllBetsAreOff, gambler so wise,
        Appear with a shuffle, a roll, and dice!
        Bet high, bet low, with a virtual toss,
        Summon AllBetsAreOff, show them who's boss!`,
        `AnaGF, crafter of tales so grand,
        With a whisper and a wave, make your stand!
        Spin your story, weave your plot,
        Summon AnaGF, give it all you've got!`,
        `Andreas Ragen Ayal, with wisdom so old,
        In digital realms, let your stories be told!
        A sage so mighty, with words like steel,
        Summon Andreas, to the keyboard we kneel!`,
        `AntaresValdemar, of the cosmic sea,
        Navigate the stars, set your spirits free!
        Chart your course, in the digital expanse,
        Summon AntaresValdemar, take the chance!`,
        `AppoxGames, creator of worlds so bright,
        Craft your games in the glow of night!
        Pixels align, code perfectly arranged,
        Summon AppoxGames, let the games be changed!`,
        `Ariel Meylan, with a touch so fine,
        Paint your pixels, let them intertwine!
        Art and code, blend in harmony,
        Summon Ariel Meylan, set your canvas free!`,
        `Attala, the guardian of forgotten lore,
        Unlock the secrets, open the door!
        Whispers of the past, echoes so tall,
        Summon Attala, reveal to all!`,
        `Auros, the whisper in the digital wind,
        With a command and a click, let the game begin!
        Code that dances, scripts that sing,
        Summon Auros, let the virtual spring!`,
        `Azuredraco, dragon of the net,
        In clouds of data, our fates are set!
        Soar through bytes, with wings unfurled,
        Summon azuredraco, navigator of the world!`,
        `Badly Drawn Rod, artist so free,
        Sketch and doodle, let us see!
        Lines that wiggle, colors that pop,
        Summon Badly Drawn Rod, and do not stop!`,
        `Bjeaurn, silent whisperer of the code,
        In realms digital, make your abode!
        With each keystroke, a new world born,
        Summon bjeaurn, in the digital morn!`,
        `BmanStudio, crafter of games,
        Shape the pixels, call the names!
        A world of wonder, creatively sewn,
        Summon BmanStudio, let it be known!`,
        `Caroline Costa, weaver of words,
        Stories and tales, like flocks of birds!
        Pen them down, let them fly,
        Summon Caroline, reach the sky!`,
        `Carsen D., master of the beat,
        Tap your feet, feel the heat!
        With rhythms bold, music cast,
        Summon Carsen D., let the sound blast!`,
        `Christian Camargo, with a script so bright,
        Craft your tales by morning light!
        From act to act, let the story flow,
        Summon Christian, let the world know!`,
        `Coding4rtist, with a palette of code,
        Paint the screens, with colors bold!
        From function to function, artfully made,
        Summon Coding4rtist, let none fade!`,
        `Convg, converter of data streams,
        Translate the bytes into digital dreams!
        From zero to one, let your circuits run,
        Summon Convg, until it’s done!`,
        `Croped, editor of frames so tight,
        Cut and crop, make it just right!
        From edge to edge, perfectly aligned,
        Summon Croped, redefine!`,
        `Dcrdro, the silent guardian of code,
        In shadows of syntax, your home abode!
        Debug and deploy, without a sound,
        Summon dcrdro, where solutions are found!`,
        `Deathray, blaster of virtual foes,
        Charge your beams as the energy flows!
        Zap and zing through digital fray,
        Summon deathray, save the day!`,
        `December Dogs, howlers at the moon,
        Bark and yowl, a frosty tune!
        In snowy pixels, let your paws dig,
        Summon December Dogs, dance the winter jig!`,
        `Derek Volker, crafter of tales,
        Spin your stories as the adventure unveils!
        Pen in hand, create your saga,
        Summon Derek, let none lag ya!`,
        `Devastus, destroyer of bugs,
        Sweep the code clean, no need for drugs!
        Compile and run, without a fuss,
        Summon Devastus, debug for us!`,
        `Diefleder, tanner of digital hide,
        Craft your armors with skill and pride!
        Leather so tough, designs so sleek,
        Summon Diefleder, none shall be weak!`,
        `Divadyugi, master of cards,
        Shuffle the deck, defy all odds!
        With a flick and a snap, let the game start,
        Summon divadyugi, play your part!`,
        `Dokalfar, elf of the shadow screen,
        Weave your magic, subtle and unseen!
        From byte to byte, let your spells dart,
        Summon Dokalfar, show your art!`,
        `Dominatorino, ruler of the game,
        Command your minions, rise to fame!
        Strategize and conquer, make your claim,
        Summon Dominatorino, earn your name!`,
        `Dreamarch, builder of dreams,
        Construct your worlds in beams and reams!
        With a blueprint of code, your visions spark,
        Summon Dreamarch, light the dark!`,
        `Edshotmachine, sniper so keen,
        Aim your cursor, steady and clean!
        With every click, precision you glean,
        Summon edshotmachine, be the unseen!`,
        `Eldar, sage of ancient script,
        In your wisdom, our minds are dipped!
        From lore to law, your knowledge vast,
        Summon Eldar, link to the past!`,
        `Eldelhas, keeper of the eldritch lore,
        Unlock the secrets, open the door!
        Mysteries of old, in code they're cast,
        Summon Eldelhas, bridge the vast!`,
        `Ericbolseiro, wanderer with a code,
        Journey through networks, carry the load!
        With a pack full of scripts, your path is clear,
        Summon Ericbolseiro, draw near!`,
        `Etrealjunior, fresh with ideas,
        Invent and innovate, overcome your fears!
        New concepts like seeds, let them sprout,
        Summon etrealjunior, shout out!`,
        `Fabula rasa, slate so clean,
        Craft your tales, unseen, serene!
        With every word, a world anew,
        Summon fabula rasa, spin the yarn true!`,
        `Fadi Khoury, weaver of notes,
        Play your melodies, let them float!
        From chord to chord, your music cast,
        Summon Fadi Khoury, make it last!`,
        `FatPenguin, waddler of the icy code,
        Slide through bugs, on your abode!
        Chill and fun, in digital frost,
        Summon fatPenguin, no data lost!`,
        `Firefluid, burner of the digital streams,
        Ignite the wires, power the dreams!
        Flame in the circuit, spark so wild,
        Summon Firefluid, nature's child!`,
        `Fluburbio, blaster of cosmic dust,
        Through galaxies digital, in you we trust!
        Spin through the void, with a quirky twist,
        Summon Fluburbio, in the cosmic mist!`,
        `ForeverTrash, collector of forgotten bits,
        In digital dumps, where the quirky fits!
        Recycle the bytes, give them a bash,
        Summon ForeverTrash, make a splash!`,
        `Games by Tom, crafter of play,
        With each level, lead the way!
        Puzzles and quests, in lines of code,
        Summon Games by Tom, load the mode!`,
        `Gamescodedogs, barkers of binary,
        Debug the system, end the query!
        With tails wagging, and algorithms bold,
        Summon gamescodedogs, break the mold!`,
        `Gassasin, silent and swift,
        Through digital shadows, you deftly sift!
        Strike at bugs, with a code so clean,
        Summon gassasin, remain unseen!`,
        `Giusex27, crafter of digital art,
        Paint with pixels, from the start!
        Brush and palette, through screens relay,
        Summon giusex27, display your array!`,
        `GuitarBro, strummer of the digital strings,
        Play your riffs, let the echo rings!
        Notes that flow, in harmonic sync,
        Summon GuitarBro, give us a wink!`,
        `Gustavo.christino, architect of code,
        Build your programs, along the road!
        From logic to function, with design so fine,
        Summon gustavo.christino, let the code shine!`,
        `Human Writes Code, scribe of the script,
        In binary worlds, your tales are equipped!
        From byte to byte, your stories unfold,
        Summon Human Writes Code, brave and bold!`,
        `Ian, keeper of the ancient lore,
        Unlock the secrets, open the door!
        Wisdom old, in modern trim,
        Summon Ian, on a whim!`,
        `Iasper, whisperer of the hidden path,
        Guide us through the code, spare us the wrath!
        Mysteries unfold at your command,
        Summon Iasper, with a gentle hand!`,
        `Icxon, charger of the electric quest,
        Power up, and build your best!
        Circuits connect, energy flow,
        Summon icxon, let the currents glow!`,
        `Iluvatar, creator of worlds in the void,
        Shape the cosmos, let none be destroyed!
        From thought to reality, your powers deploy,
        Summon Iluvatar, bring us joy!`,
        `Inferture, master of infinite loops,
        Through algorithms, your wisdom swoops!
        From code to code, your logic never stops,
        Summon Inferture, bypass the flops!`,
        `Iskra, spark of the creative flare,
        Ignite ideas, in the digital air!
        Light up the circuit, with a brilliant stroke,
        Summon Iskra, let the code evoke!`,
        `James Audio, mixer of sound,
        Layer the tracks, where beats abound!
        From wave to mp3, your mixes compel,
        Summon James Audio, cast your spell!`,
        `Jeff Kerman, launcher of celestial quests,
        Navigate the stars, pass all tests!
        From Earth to Mars, in your virtual ship,
        Summon Jeff Kerman, let 'er rip!`,
        `JeffSobel, solver of complex codes,
        Untangle the algorithms, lighten the loads!
        Each line you write, precision you weave,
        Summon JeffSobel, in code we believe!`,
        `Joey Shipley, sailor of the digital seas,
        Chart your courses, with ease!
        Navigate through storms of bugs and bytes,
        Summon Joey Shipley, to new heights!`,
        `Johnsensei, teacher of the coding way,
        Guide us through, day by day!
        In lessons and loops, your wisdom shared,
        Summon Johnsensei, be prepared!`,
        `Jordantanner, tanner of virtual hides,
        Craft your armors, in which we'll abide!
        From pixel to polygon, your designs hold tight,
        Summon jordantanner, armor us right!`,
        `JoskerDu, jester of the code court,
        Play your pranks, support and retort!
        With a laugh and a trick, keep us amused,
        Summon JoskerDu, let us be bemused!`,
        `Jupiter_Hadley, explorer of gaming moons,
        Journey through genres, hum your tunes!
        With a joystick in hand, through galaxies you rove,
        Summon Jupiter_Hadley, let's treasure trove!`,
        `Kobato Games, creator of delightful plays,
        Design your worlds, in countless ways!
        From level to level, your games enthrall,
        Summon Kobato Games, captivate us all!`,
        `Kodingnights, coder in the dark,
        Illuminate the code, make your mark!
        Through the night, your programs run clear,
        Summon Kodingnights, bring them here!`,
        `Kristinamay, weaver of the narrative thread,
        Tell your stories, as they spread!
        From page to screen, your words do play,
        Summon Kristinamay, lead the way!`,
        `LadyMistLeaf, mistress of the ethereal forest,
        Call forth the spirits, at your behest!
        With a whisper of leaves, and a rustle so soft,
        Summon LadyMistLeaf, aloft!`,
        `LeReveur, dreamer of the virtual stage,
        Sketch your worlds on the digital page!
        In dreams and data, your creations unfurl,
        Summon LeReveur, let the dreams swirl!`,
        `Llewellyn and Michael, duo so bright,
        Together you code, from morning to night!
        With teamwork and talent, your projects take flight,
        Summon Llewellyn and Michael, to delight!`,
        `Mad Brokli, wild grower of digital greens,
        Cultivate pixels, in all the scenes!
        From sprites to sprites, your gardens are lush,
        Summon Mad Brokli, with a brush!`,
        `MadLibberator, creator of wordy fun,
        Twist and shout, till the game is done!
        Fill in the blanks, let the stories run wild,
        Summon MadLibberator, oh child!`,
        `Maki Mahoney, artist of the surreal,
        Paint your visions, let them feel real!
        With brush in hand, your canvas calls,
        Summon Maki Mahoney, enchant these halls!`,
        `Marcusnystrand, weaver of the net,
        Connect the worlds, let no one forget!
        Through lines of code, your networks expand,
        Summon marcusnystrand, across the land!`,
        `Marie Launhardt, poet of the pixel stage,
        Write your scripts, let them engage!
        From drama to comedy, your range is vast,
        Summon Marie Launhardt, cast the cast!`,
        `MarkoPoloDev, explorer of code,
        Travel the syntax, load by load!
        Discover new functions, chart the ways,
        Summon MarkoPoloDev, through the maze!`,
        `Michal_Atlas, cartographer of the digital realm,
        Map the binaries, take the helm!
        With each coordinate plotted so keen,
        Summon Michal_Atlas, see the unseen!`,
        `Mixdr, DJ of the data stream,
        Mix and match, make the algorithms scream!
        From beat to beat, your code does blend,
        Summon mixdr, mix till the end!`,
        `MrchickenBoy, herder of the digital flock,
        Guide your chickens, round the clock!
        With a cluck and a peck, keep bugs at bay,
        Summon MrchickenBoy, lead the way!`,
        `N0va, star of the coding night,
        Explode with ideas, oh so bright!
        In bursts of creativity, let your code flow,
        Summon N0va, let the world know!`,
        `Nax_89, gamer with the master plan,
        Conquer the levels, as fast as you can!
        With strategy and skill, you command the game,
        Summon nax_89, rise to fame!`,
        `Nekoballs, crafter of the cute and cuddly,
        Shape your critters, soft and muddly!
        With yarn and needle, your creations delight,
        Summon nekoballs, by day and night!`,
        `Nerdytopic, scholar of the obscure,
        Share your knowledge, make it pure!
        From fact to fiction, your topics enthrall,
        Summon nerdytopic, captivate all!`,
        `Nilan, weaver of the code's thread,
        Spin your logic, let the algorithms spread!
        From byte to byte, your wisdom flows,
        Summon Nilan, as the network grows!`,
        `Obi One, master of the code saber,
        Defend the syntax, stabilize the labor!
        With wisdom and wit, guide us through,
        Summon Obi One, show us what to do!`,
        `OddballDave, joker of the digital scene,
        Your humor and quirks, a coding machine!
        With a laugh and a line, keep spirits high,
        Summon OddballDave, reach for the sky!`,
        `OgelGames, creator of worlds so vast,
        From pixel dungeons to futures past!
        With each game launched, adventures begin,
        Summon OgelGames, let the players win!`,
        `Oxrock, solid as the digital stone,
        Code foundations where seeds of data are sown!
        Firm and unyielding, in your craft secure,
        Summon oxrock, make the programs endure!`,
        `Pbluke, prince of the pixel art,
        Draw your visions, a digital start!
        Colors blend, frames come alive,
        Summon pbluke, let creativity thrive!`,
        `Peringo, traveler of the code paths,
        Explore the loops, avoid the wraths!
        With each function call, your journey's told,
        Summon peringo, brave and bold!`,
        `Petitpois, tiny architect of delight,
        Craft your minis, make them just right!
        In every pixel, a story's seed,
        Summon petitpois, fulfill the need!`,
        `PhilStrahl, illuminator of the dark codes,
        Shine your light, break the old modes!
        From shadows to clarity, let knowledge reign,
        Summon PhilStrahl, banish the strain!`,
        `Piscythe, reaper of the buggy fields,
        Swing your tool, see what it yields!
        Harvest the errors, clear the land,
        Summon piscythe, with a steady hand!`,
        `Pklaschka, mixer of design and code,
        Blend the elements in creative mode!
        With aesthetics and function, make all align,
        Summon pklaschka, let the work shine!`,
        `Predominant, leader of the digital pack,
        Set the pace, never look back!
        With vision and courage, lead the fray,
        Summon Predominant, seize the day!`,
        `PurpledArtFrog, painter of the surreal,
        Dip your brush in the dreamy teal!
        Canvas of bytes, where colors jog,
        Summon PurpledArtFrog, clear the fog!`,
        `Qaolin, sculptor of the fine clay,
        Mold the data, shape the way!
        With each touch, your art defines,
        Summon Qaolin, through the lines!`,
        `Ranquil, soother of the stormy code,
        Calm the functions, lighten the load!
        With a breeze of logic, peace you instill,
        Summon Ranquil, bend at will!`,
        `Red-fan-games, player of the fiery themes,
        Ignite the pixels, fuel the dreams!
        Games ablaze, with passion and fame,
        Summon red-fan-games, win the game!`,
        `Rhym, poet of the coding verse,
        Align the syntax, dispel the curse!
        With meter and rhyme, set the code free,
        Summon Rhym, as it should be!`,
        `Rjerez192, crafter of digits and data,
        Weave through the code, no one faster!
        With each tap and type, perfection is nigh,
        Summon rjerez192, reach for the sky!`,
        `RobinHoodPT, hero of the code,
        Steal from the bugs, to users bestow!
        With arrows of syntax, your targets never miss,
        Summon RobinHoodPT, grant us this bliss!`,
        `Rojola,
        dancer of the digital flame,
        Twist and turn,
        never the same! In the fire of pixels,
        your artistry grows,
        Summon Rojola,
        as the wind blows!`,
        `Ruruie,
        whisperer of the gentle night,
        Guide us through shadows,
        lead us right! With a touch so soft,
        a word so calm,
        Summon ruruie,
        bring us your balm!`,
        `Saithir,
        keeper of the ancient lore,
        Unlock the secrets,
        open the door! Mysteries of old,
        in code they're cast,
        Summon Saithir,
        link to the past!`,
        `Salmonmoose,
        majestic and grand,
        Swim through the streams,
        across the digital land! With antlers cast wide,
        in rivers of code,
        Summon salmonmoose,
        bear the load!`,
        `Samuli,
        builder of bridges so wide,
        Connect us all,
        side by side! With beams of code and nails of logic,
        Summon Samuli,
        make it epic!`,
        `Savvy Community,
        collective so bright,
        Share your wisdom,
        give us insight! A network of thoughts,
        a fabric of ideas,
        Summon Savvy Community,
        dispel our fears!`,
        `Seth Tal,
        composer of the coded symphony,
        Play your keys,
        in harmony! From function to function,
        your music we hear,
        Summon Seth Tal,
        bring us near!`,
        `SevenLevelGames,
        master of stages,
        Unlock the levels,
        turn the pages! Each level a challenge,
        a story to tell,
        Summon SevenLevelGames,
        break the spell!`,
        `Shambles,
        creator of chaos and fun,
        Where pieces fall,
        the game's begun! With a jumble and tumble,
        let order flee,
        Summon Shambles,
        set it free!`,
        `Shaunyeap,
        teller of tales so bold,
        Narrate the stories,
        as they unfold! With a whisper and word,
        let the narratives wrap,
        Summon shaunyeap,
        bridge the gap!`,
        `Shigor,
        crafter of the mystic brew,
        Mix your potions,
        make them true! With herbs of code and spells of byte,
        Summon Shigor,
        end the plight!`,
        `Shivur,
        weaver of the frosty thread,
        Bind the ice,
        where foes dread! With a chill and a shiver,
        freeze the screen,
        Summon Shivur,
        be unseen!`,
        `Shunaky,
        sneaker in the digital fog,
        Creep through code,
        clear the smog! With stealth and cunning,
        paths you pave,
        Summon Shunaky,
        bold and brave!`,
        `Sillyman987,
        jester of the byte realm,
        Bring your humor,
        overwhelm! With a giggle and a code,
        let laughter spread,
        Summon sillyman987,
        joy we wed!`,
        `Simon Rahnasto,
        weaver of visual tales,
        Sketch and design,
        as your art prevails! With a stroke and a line,
        create with gusto,
        Summon Simon Rahnasto,
        let the canvas show!`,
        `Simonhutchinson,
        crafter of the coded song,
        Play your tunes,
        make them strong! From byte to beat,
        let the rhythm flow,
        Summon simonhutchinson,
        start the show!`,
        `SimplePotential,
        seed of great feats,
        Grow your ideas in digital peats! From simple to complex,
        your projects expand,
        Summon SimplePotential,
        take a stand!`,
        `Smbe19,
        guardian of data's gate,
        Secure the bytes,
        lock the slate! Encrypt and safeguard,
        let no breach be,
        Summon smbe19,
        keep us free!`,
        `Sneakysushi,
        ninja of the night,
        Slice through code with great insight! Stealthy and swift,
        with a dash of flair,
        Summon sneakysushi,
        slice the air!`,
        `Somogy,
        painter of the old lands,
        Capture the hills,
        the soils,
        the sands! With palette and pixel,
        your landscapes call,
        Summon Somogy,
        paint us all!`,
        `Spyranteros,
        spy of the cyber sphere,
        Gather secrets,
        far and near! With gadgets and gear,
        your missions are clear,
        Summon spyranteros,
        bring them here!`,
        `Sun-Wukong,
        trickster so bold,
        With your staff,
        break the mold! Leap through code,
        with monkey's cheer,
        Summon Sun-Wukong,
        bring joy here!`,
        `Thuvareyn,
        sorcerer of the hidden mist,
        Twist reality with your digital wrist! With spells of code,
        your secrets compile,
        Summon Thuvareyn,
        bewitch our style!`,
        `Thygrrr,
        beast of the programming lair,
        Roar through syntax,
        tear the air! With claws of logic and teeth so sharp,
        Summon Thygrrr,
        code your mark!`,
        `Trigueiro,
        architect of dreams,
        Build your visions,
        stitch the seams! From blueprint to reality,
        let your designs be known,
        Summon Trigueiro,
        construct your throne!`,
        `Ty_,
        minimalist of the code scene,
        Simplify,
        clarify,
        make it clean! With less is more,
        your philosophy rings,
        Summon ty_,
        let clarity sing!`,
        `Tygrak,
        warrior of the pixel plains,
        Battle through bugs,
        break the chains! With sword of code and shield of byte,
        Summon Tygrak,
        win the fight!`,
        `Velvetlobster,
        crafter of the soft shell,
        Weave your stories,
        cast your spell! In oceans of code,
        your creations dive deep,
        Summon velvetlobster,
        secrets to keep!`,
        `Vetu11,
        keeper of the ancient script,
        In your wisdom,
        our minds are dipped! From lore to law,
        your knowledge vast,
        Summon vetu11,
        link to the past!`,
        `Wadlo,
        tinkerer of the machine heart,
        Gear up the engines,
        make them start! With wrench and cog,
        set the pace,
        Summon Wadlo,
        win the race!`,
        `Wheybags,
        mixer of the potion rare,
        Blend the elements with care! From alchemy to recipes,
        let your concoctions brew,
        Summon wheybags,
        make it new!`,
        `Widdershinscrustacean,
        crawler of the left-hand path,
        Navigate the code,
        avoid the wrath! With a shell so tough and claws so keen,
        Summon widdershinscrustacean,
        be seen!`,
        `WiredOverload,
        master of the tech surge,
        Power the circuits,
        let the electrons merge! With a zap and a byte,
        make the systems sing,
        Summon WiredOverload,
        control everything!`,
        `Wospy,
        whisperer of the windswept wires,
        Navigate the networks,
        kindle the fires! With a gust of data,
        set the stream free,
        Summon wospy,
        as swift as can be!`,
        `Xist3nce,
        crafter of the digital realm,
        Command the code,
        take the helm! From virtual voids,
        your creations rise,
        Summon Xist3nce,
        reach the skies!`,
        `Xlambein,
        forger of the pixel flame,
        Mold your graphics,
        frame by frame! With colors so vivid and details so fine,
        Summon xlambein,
        let your art shine!`,
        `Zonoxx,
        guardian of the zero zone,
        Protect the binary,
        let no error be shown! With a shield of logic and a sword of code,
        Summon Zonoxx,
        secure the load!`,
    ]
}

globalThis.KeyboardWarrior.play = new Play();
