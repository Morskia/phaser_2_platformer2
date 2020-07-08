MyGame.startscreen = function () {
};
MyGame.startscreen.prototype = {
    create: function () {
        // Add a background image
        this.add.image(0, 0, 'background');
       // this.music = this.add.audio('bgmusic'); // Add the music
        // this.music.loop = true; // Make it 
//        this.music.volume = 0.2;
//        if (!MyGame.music ||!MyGame.music.isPlaying) {           
//            MyGame.music = this.game.add.audio('bgmusic');
//            MyGame.music.volume = 0.2;
//            MyGame.music.loop = true;
//            MyGame.music.play(); // Start the music
//        }
// Display the name of the game
        var nameLabel = this.add.text(this.world.centerX, -50, 'Super Coin Box', {font: '50px Arial', fill: '#ffffff'});
        this.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        nameLabel.anchor.setTo(0.5, 0.5);
        var text = 'score: ' + MyGame.score + '\nbest score: ' + localStorage.getItem('bestScore');
// Show the score at the center of the screen
        var scoreLabel = this.add.text(this.world.centerX, this.world.centerY, text,
                {font: '25px Arial', fill: '#ffffff', align: 'center'});
        scoreLabel.anchor.setTo(0.5, 0.5);
// Explain how to start the game
        var startLabel = this.add.text(this.world.centerX, this.world.height - 80,
                'press the up arrow key to start',
                {font: '25px Arial', fill: '#ffffff', align: 'center'});
        startLabel.anchor.setTo(0.5, 0.5);
        this.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop().start();
        this.muteButton = this.add.button(20, 20, 'mute', this.toggleSound, this);
// If the mouse is over the button, it becomes a hand cursor
        this.muteButton.input.useHandCursor = true;
        if (this.sound.mute) {
// Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        // Create a new Phaser keyboard variable: the up arrow key
        // When the 'upKey' is pressed, it will call the 'start' function once
        var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);
    },
    start: function () {
        this.state.start('currentlevel');
    },
    toggleSound: function () {
// Switch the Phaser sound variable from true to false, or false to true
// When 'this.sound.mute = true', Phaser will mute the game
        this.sound.mute = !this.sound.mute;
// Change the frame of the button
        this.muteButton.frame = this.sound.mute ? 1 : 0;
    }
};