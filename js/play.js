MyGame.playGame = function () { };
var bee = null;
var jumpTimer = 0;
var motionBee = -160;
var timer;
var direction;
MyGame.playGame.prototype = {
    create: function () {
        this.levelData = JSON.parse(this.cache.getText('levelobjects')); // get json  text from cache
        this.cursor = this.input.keyboard.createCursorKeys(); // active default buttons
        switch (MyGame.level) {
            //build level 1
            case 1:
                this.map = this.add.tilemap('level1');
                this.map.addTilesetImage('download');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
                this.map.setCollision([8, 53]);
                this.layer.wrap = true;
                this.world.bringToTop(this.layer);
                this.night = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'night');

                //   this.map.setTileIndexCallback(44, this.underwater, this);
                this.night.alpha = 0;
                break;
            default :
                break;
        }
        this.silverCoins = this.add.group();
        var silverCoinsJSON = this.levelData.level1.coinsSilver;
        for (var i in silverCoinsJSON) {
            var coin = this.silverCoins.getFirstExists(false);
            if (!coin) {
                coin = new MyGame.coins(this.game, silverCoinsJSON[i].x, silverCoinsJSON[i].y, 'scoin');
                this.silverCoins.add(coin);
            }
            coin.reset(silverCoinsJSON[i].x, silverCoinsJSON[i].y, 'scoin', 5);
        }
        this.physics.arcade.enable(this.silverCoins);
        var goldCoinsJSON = this.levelData.level1.coinsGold;
        this.goldCoins = this.add.group();
        for (var i in goldCoinsJSON) {
            var coin = this.goldCoins.getFirstExists(false);
            if (!coin) {
                coin = new MyGame.coins(this.game, goldCoinsJSON[i].x, goldCoinsJSON[i].y, 'gcoin');
                this.goldCoins.add(coin);
            }
            coin.reset(goldCoinsJSON[i].x, goldCoinsJSON[i].y, 'gcoin', 10);
        }
        this.physics.arcade.enable(this.goldCoins);
        this.player = this.add.sprite(this.world.x + 60, this.world.y + 575, 'player');
        this.people = this.add.sprite(510, 400, 'friends');
        this.add.tween(this.people).to({y: this.people.y - 2}, 300).to({y: this.people.y}, 300).to({y: this.people.y + 2}, 300).loop().start();
        this.physics.arcade.enable(this.player);
        this.physics.arcade.enable(this.people);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('move', [0, 1, 2], 15, true);
        this.player.animations.add('swim', [4, 5, 6], 15, true);
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        this.player.gameover = false;
        this.camera.follow(this.player);
        this.player.underwater = false;
        bee = this.add.group();
        bat = this.add.group();
        bee.create(this.world.x + 260, this.world.y + 280, 'bee', 0);
        bee.create(this.world.x + 1260, this.world.y + 180, 'bee', 0);
        bee.create(this.world.x + 1760, this.world.y + 320, 'bee', 0);
        bat.onMap = false;
        bee.callAll('animations.add', 'animations', 'fly', [0, 1], 25, true);
        bee.callAll('play', null, 'fly');
        bee.callAll('anchorX', '.5');
        bee.callAll('anchorY', '.5');
        tween = this.add.tween(bee).to({x: -160}, 1000).to({x: 0}, 1000).loop().start();
        tween.onChildComplete.add(onStart, this);
        tween.onRepeat.add(onComplete, this);
        function onStart() {
            bee.setAll('scale.x', -1);
        }
        function onComplete() {
            bee.setAll('scale.x', 1);
        }
        //  this.map.setTileIndexCallback(75, this.addBat, this);
        this.scoreLabel = this.add.text(10, 10, MyGame.score, {font: '18px Arial', fill: '#000'});
        this.scoreLabel.fixedToCamera = true;
        this.nav = this.add.image(0, 0, 'navigation');
        this.nav.fixedToCamera = true;
        this.scoreLabel = this.add.text(150, 90, MyGame.score, {font: '18px Arial', fill: '#000'});
        this.scoreLabel.fixedToCamera = true;
        face = this.add.button(325, 5, '', '', this, 2, 1, 0);
        face.width = 80;
        face.height = 30;
        face.inputEnabled = true;
        face.input.useHandCursor = true;
        face.fixedToCamera = true;
        face.events.onInputUp.add(addFriend, this);
        function addFriend() {
            window.open('http://facebook.com', '_blank');
        }
        this.bar = this.add.sprite(514, 91, 'bar');
        this.bar.width = 230;
        this.bar.fixedToCamera = true;
        timer = this.time.create();
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE, this.endTimer, this);
        // Start the timer
        timer.start();
        game.time.events.loop(Phaser.Timer.QUARTER, updateCounter, this);
        function updateCounter() {
            this.bar.width = this.bar.width - 0.95;
        }
        this.map.setTileIndexCallback(24, this.finishLevel, this);
    },
    underwater: function (player, e) {
        this.player.underwater = true;


    },
    coinTakeb: function (player, coin) {
        //prevent multy trigers
        if (coin.motion === false) {
            coin.motion = true;
            this.add.tween(coin).to({y: coin.y - 100, alpha: 0}, 200, "Linear").start();
            MyGame.score += coin.value;
            this.scoreLabel.setText(MyGame.score);
        }
    },
    addBat: function () {
        if (bat.onMap === false) {
            bat.create(this.player.x + 100, this.player.y - 120, 'batman', 0);
            bat.onMap = true;
            bat.callAll('anchorX', '.5');
            bat.callAll('anchorY', '.5');
            bat.callAll('animations.add', 'animations', 'flybat', [0, 1], 5, true);
            bat.callAll('play', null, 'flybat');
            // this.add.tween(bat.scale).to({x: 1, y: 1}, 1000, "Linear", 2000).start();
        }
    },
    update: function () {



        //make it look towards it's movement


        var nextX = this.player.x + direction * (Math.abs(this.player.width) / 2 + 1);
        var nextY = this.player.bottom + 1;

        var nextTile = this.map.getTileWorldXY(nextX, nextY, this.map.tileWidth, this.map.tileHeight, 'Tile Layer 1');
        if (nextTile == null || nextTile == 44) {
            this.player.underwater = true;
        } else {
            this.player.underwater = false;
        }


        // console.log(this.silverCoins);
        this.physics.arcade.collide(this.player, this.layer);
        this.physics.arcade.overlap(this.player, this.silverCoins, this.coinTakeb, null, this);
        this.physics.arcade.overlap(this.player, this.goldCoins, this.coinTakeb, null, this);
        this.physics.arcade.overlap(this.player, this.people, this.inviteFaceook, null, this);
        // this.physics.arcade.overlap(this.player, this.water, this.underwater, null, this);
        this.physics.arcade.overlap(this.player, bee, this.underwater, null, this);
        // this.player.underwater = false;
        this.movePlayer();
        var timePast = Math.floor(this.game.time.totalElapsedSeconds());
        if (timePast === 30) {
            this.add.tween(this.night).to({alpha: 1}, 30000).start();
        }
//        console.log(this.player.underwater)
    },
    inviteFaceook: function (player, e) {
        e.kill();
    },
    movePlayer: function () {
        if (this.cursor.left.isDown) {
            if (!this.player.body.onFloor()) {
                this.player.frame = 3;
            } else {
                if (this.player.underwater === false) {
                    this.player.animations.play('move');
                } else {
                    this.player.animations.play('swim'); //swim
                }
            }
            this.player.body.velocity.x = -200;
            this.player.scale.x = -1;
            direction = -1;
        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            if (!this.player.body.onFloor()) {
                this.player.frame = 3;
            } else {
                if (this.player.underwater === false) {
                    this.player.animations.play('move');
                } else {
                    this.player.animations.play('swim');
                }
            }
            this.player.scale.x = 1;
            direction = -1;
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); // Stop the animation
            this.player.animations.paused = true;
        }
        if (this.cursor.up.isDown) {
            if (this.player.body.onFloor() && jumpTimer === 0) {
                //    this.jumpSound.play();
                jumpTimer = 1;

                this.player.body.velocity.y = -200;
            } else if (jumpTimer > 0 && jumpTimer < 10) {
                jumpTimer++;
                this.player.body.velocity.y = -200 - (jumpTimer * 11);
                if (this.player.underwater === false) {
                    this.player.animations.play('move');
                } else {
                    this.player.animations.play('swim');
                }
                this.player.frame = 3;
            }
        } else {
            jumpTimer = 0;
        }
        if (this.player.body.onFloor() && !this.cursor.up.isDown && !this.cursor.right.isDown && !this.cursor.left.isDown) {
            if (this.player.underwater === false) {
                this.player.frame = 1;
            } else {
                this.player.frame = 4;
            }
        } else if (!this.player.body.onFloor() && this.cursor.up.isDown) {
            this.player.frame = 3;
        }
        this.player.checkWorldBounds = true;
        this.player.body.collideWorldBounds = true;
    },
    finishLevel: function () {
        // Stop the timer when the delayed event triggers
        this.player.body.velocity.x = 0;
        timer.stop();
        this.add.sprite(this.camera.x, this.camera.y, 'bank');
        // this.player.gameover = true;
    },
    endTimer: function () {
        // Stop the timer when the delayed event triggers
        this.player.body.velocity.x = 0;
        timer.stop();
        this.night.alpha = 1;
        popup = this.add.sprite(this.camera.x, this.camera.y, 'gameover');
        this.player.gameover = true;
        restartLevelbtn = this.add.button(this.camera.x + 183, this.camera.y + 370, '', '', this, 2, 1, 0);
        restartLevelbtn.width = 198;
        restartLevelbtn.height = 55;
        restartLevelbtn.inputEnabled = true;
        restartLevelbtn.input.useHandCursor = true;
        restartLevelbtn.events.onInputUp.add(restartLevel, this);
        addFriendbtn = this.add.button(this.camera.x + 406, this.camera.y + 370, '', '', this, 2, 1, 0);
        addFriendbtn.width = 208;
        addFriendbtn.height = 55;
        addFriendbtn.inputEnabled = true;
        addFriendbtn.input.useHandCursor = true;
        addFriendbtn.events.onInputUp.add(addNewFrend, this);
//        popup.addChild(restartLevelbtn);
//        popup.addChild(addFriendbtn);
        function restartLevel() {
            this.state.start('playGame');
        }
        function addNewFrend() {
            window.open('http://facebook.com', '_blank');
        }
    },
    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 750, 105, '#fff', '13px Arial');
        }
        game.debug.body(bee);


    },
    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }

};
