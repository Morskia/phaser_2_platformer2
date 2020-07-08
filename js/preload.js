MyGame.preload = function () {};
MyGame.preload.prototype = {
    // preload assets for game
    preload: function () {
        this.load.path = 'assets/';
        this.add.image(0, 0, 'welcomescreen');        
        this.load.images(['bg', 'bank', 'friends', 'night', 'gameover', 'download', 'scoin', 'navigation', 'bar', 'gcoin','buttonred', 'button']);
        //map and objects
        this.load.tilemap('level1', 'demo.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.text('levelobjects', 'objects.json');
        //spritesheet
        this.load.spritesheet('player', 'player.png', 55, 55, 8, 0, 0);
        this.load.spritesheet('bee', 'bee.png', 42, 43, 2);
        this.load.spritesheet('batman', 'batman.png', 140, 65, 2);
        // button
        startBtn = this.add.button(325, 505, '', '', this, 2, 1, 0);
        startBtn.width = 160;
        startBtn.height = 55;
        startBtn.inputEnabled = true;
        startBtn.input.useHandCursor = true;
        startBtn.events.onInputUp.add(startGame, this);
        function startGame() {
            this.state.start('playGame');
        }
//// Sound when the player jumps
//        this.load.audio('jump', ['jump.ogg', 'jump.mp3']);
//        this.load.audio('levelup', ['levelup.ogg', 'levelup.mp3']);
//
//// Sound when the player takes a coin
//        this.load.audio('coin', ['coin.ogg', 'coin.mp3']);
//// Sound when the player dies
//        this.load.audio('dead', ['dead.ogg', 'dead.mp3']);
//background music       
        // this.load.audio('bgmusic', ['bg.mp3']);
    }
};

