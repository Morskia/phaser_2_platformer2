
MyGame.currentlevel = function () {
}
MyGame.currentlevel.prototype = {
    create: function () {

// Add a background image
        this.add.image(0, 0, 'background');
// Display the name of the game
        if (MyGame.level === 7) {
            var nameLabel = this.add.text(this.world.centerX, -50, 'Congratulations !', {font: '50px Arial', fill: '#ffffff'});
            this.add.tween(nameLabel).to({y: 180}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            nameLabel.anchor.setTo(0.5, 0.5);
            // It means that this is the first time the game is played
            if (!localStorage.getItem('bestScore')) {
// Then set the best score to 0
                localStorage.setItem('bestScore', 0);
            }
            // If the score is higher than the best score
            if (MyGame.score > localStorage.getItem('bestScore')) {
// Then update the best score
                localStorage.setItem('bestScore', MyGame.score);
            }
            MyGame.lives = 3;
            MyGame.level = 1;
            MyGame.score = 0,
                    this.time.events.add(Phaser.Timer.SECOND * 4, this.restart, this);
            return;
        }
        if (MyGame.lives <= 0) {

            var nameLabel = this.add.text(this.world.centerX, -50, 'Game Over', {font: '50px Arial', fill: '#ffffff'});
            this.add.tween(nameLabel).to({y: 180}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            nameLabel.anchor.setTo(0.5, 0.5);
            // It means that this is the first time the game is played
            if (!localStorage.getItem('bestScore')) {
// Then set the best score to 0
                localStorage.setItem('bestScore', 0);
            }
            // If the score is higher than the best score
            if (MyGame.score > localStorage.getItem('bestScore')) {
// Then update the best score
                localStorage.setItem('bestScore', MyGame.score);
            }
            MyGame.lives = 3;
            MyGame.level = 1;
            MyGame.score = 0,
                    this.time.events.add(Phaser.Timer.SECOND * 4, this.restart, this);

        } else {
            var nameLabel = this.add.text(this.world.centerX, -50, 'Level: ' + MyGame.level, {font: '50px Arial', fill: '#ffffff'});
            this.add.tween(nameLabel).to({y: 180}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            nameLabel.anchor.setTo(0.5, 0.5);
            var text = 'score: ' + MyGame.score;
// Show the score at the center of the screen
            var scoreLabel = this.add.text(this.world.centerX, this.world.centerY, text,
                    {font: '25px Arial', fill: '#ffffff', align: 'center'});
            scoreLabel.anchor.setTo(0.5, 0.5);
// Explain how to start the game

// Create a new Phaser keyboard variable: the up arrow key
            this.time.events.add(Phaser.Timer.SECOND * 4, this.start, this); // add 4 second delay
// When the 'upKey' is pressed, it will call the 'start' function once


            this.muteButton = this.add.button(20, 20, 'mute', this.toggleSound, this);
// If the mouse is over the button, it becomes a hand cursor
            this.muteButton.input.useHandCursor = true;
            if (this.sound.mute) {
// Change the frame to display the speaker with no sound
                this.muteButton.frame = 1;
            }
        }
    },
    start: function () {
        this.state.start('playGame');
    },
    toggleSound: function () {
// Switch the Phaser sound variable from true to false, or false to true
// When 'this.sound.mute = true', Phaser will mute the game
        this.sound.mute = !this.sound.mute;
// Change the frame of the button
        this.muteButton.frame = this.sound.mute ? 1 : 0;
    },
    restart: function () {
        this.state.start('startscreen');
    }

}