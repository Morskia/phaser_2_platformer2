MyGame.playGame = function () {
// global variables
};
var bee = null;
var jumpTimer = 0;
var motionBee = -160;
MyGame.playGame.prototype = {
    create: function () {
        this.levelData = JSON.parse(this.cache.getText('levelobjects')); // get json  text from cache
        this.cursor = this.input.keyboard.createCursorKeys(); // active default buttons
        // this.add.image(0, 0, 'wall');
//        this.jumpSound = this.add.audio('jump');
//        this.coinSound = this.add.audio('coin');
//        this.deadSound = this.add.audio('dead');
//        this.levelup = this.add.audio('levelup');
        switch (MyGame.level) {
            //build level 1
            case 1:
                this.map = this.add.tilemap('level1');
                this.map.addTilesetImage('download');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
                this.map.setCollision([8, 42, 43, 53]);
                this.world.bringToTop(this.layer);
//                rJump = this.map.getTile(10, 4);
//                rJump.enableBody = true;
//                rJump.tilePadding.set(32, 32);
//                console.log(rJump);
                break;
                //build level 2

            default :
                break;
        }
        this.silverCoins = this.add.physicsGroup();

      //  this.silverCoins.enableBody = true;
        this.silverCoins.callAll('anchorX', '.5');
        this.silverCoins.callAll('anchorY', '.5');
        var silverCoinsJSON = this.levelData.level1.coinsSilver;
        for (var i in silverCoinsJSON) {
            this.silverCoins.create(silverCoinsJSON[i].x, silverCoinsJSON[i].y, 'scoin', 0);
        }

        this.goldCoins = this.add.group();
        this.goldCoins.callAll('anchorX', '.5');
        this.goldCoins.callAll('anchorY', '.5');
        var goldCoinsJSON = this.levelData.level1.coinsGold;
        for (var i in goldCoinsJSON) {
            this.silverCoins.create(goldCoinsJSON[i].x, goldCoinsJSON[i].y, 'gcoin', 0);
        }
        this.player = this.add.sprite(this.world.x + 60, this.world.y + 280, 'player');
        this.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('move', [0, 1, 2], 15, true);

        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        this.player.frame = 4;
        this.camera.follow(this.player);
        bee = this.add.group();
        bat = this.add.group();

//        for (var i = 1 ; i < 3; i++){
//           bee.create(this.world.x + 260 * i, this.world.y + 280, 'bee', 0);  
//        }
        bee.create(this.world.x + 260, this.world.y + 280, 'bee', 0);
        bee.create(this.world.x + 1260, this.world.y + 180, 'bee', 0);
        bee.create(this.world.x + 1760, this.world.y + 320, 'bee', 0);

//        bat.create(this.world.x + 360, this.world.y + 180, 'batman', 0);
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
        this.map.setTileIndexCallback(75, this.addBat, this);

       

    },
    coinTakeb: function (player, coin) {
        this.add.text(coin.top, coin.left, '10.', {font: '18px Arial', fill: '#ffffff'});
    },
    addBat: function () {
        if (bat.onMap === false) {

            bat.create(this.player.x + 100, this.player.y - 120, 'batman', 0);
            //   bat.scale.setTo(0.2);
            bat.onMap = true;
            bat.callAll('anchorX', '.5');
            bat.callAll('anchorY', '.5');

            bat.callAll('animations.add', 'animations', 'flybat', [0, 1], 5, true);
            bat.callAll('play', null, 'flybat');

            // this.add.tween(bat.scale).to({x: 1, y: 1}, 1000, "Linear", 2000).start();

        }
    },
    update: function () {
        this.physics.arcade.collide(this.player, this.layer);
         this.physics.arcade.collide(this.player, this.silverCoins, this.coinTakeb, null, this);
        this.movePlayer();
    },
    movePlayer: function () {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('move');
            this.player.scale.x = -1;
        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('move');
            this.player.scale.x = 1;
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
            }
        } else {
            jumpTimer = 0;
        }
        this.player.checkWorldBounds = true;
        this.player.body.collideWorldBounds = true;
    },
//    takeCoin: function (player, coin) {
//        // New score variable
//        this.coinSound.play();
//        MyGame.score += 5;
//         this.add.text( coin.top,  coin.left, '10 ??.', {font: '18px Arial', fill: '#ffffff'});
//        if (MyGame.score % 110 == 0) {
//            this.numberLives = this.add.image(40 + this.moreSpace, 80, 'lives');
//            this.numberLives.fixedToCamera = true;
//            this.moreSpace += 20;
//            MyGame.lives += 1;
//            this.levelup.play();
//        }
//        this.scoreLabel.text = 'score: ' + MyGame.score + " / " + (50 * MyGame.level);
//        if (MyGame.score === (50 * MyGame.level)) {
//            MyGame.level += 1;
//            this.state.start('currentlevel');
//            return;
//        }
//        this.updateCoinPosition(); //attach event
//    },
//    playerDie: function () {
//        // When the player dies, we go to the currentlevel screen  
//        MyGame.lives -= 1;
//        this.deadSound.play();
//        this.state.start('currentlevel');
//    },
//    updateCoinPosition: function () {
//        switch (MyGame.level) {
//            //build level 1
//            case 1:
//                coinPositionJSON = this.levelData.level1.coinPosition;
//                break;
//                //build level 2
//            case 2:
//                coinPositionJSON = this.levelData.level2.coinPosition;
//                break;
//            case 3:
//                coinPositionJSON = this.levelData.level3.coinPosition;
//                break;
//            case 4:
//                coinPositionJSON = this.levelData.level4.coinPosition;
//                break;
//            case 5:
//                coinPositionJSON = this.levelData.level5.coinPosition;
//                break;
//            case 6:
//                coinPositionJSON = this.levelData.level6.coinPosition;
//                break;
//            default :
//                break;
//        }
//        var newPosition = coinPositionJSON[this.rnd.between(0, coinPositionJSON.length - 1)];
//        if (newPosition.x != this.coin.x) {
//            this.coin.reset(newPosition.x, newPosition.y);
//        } else {
//            this.updateCoinPosition();
//        }
//    },
//    addEnemy: function () {
//        var enemy = this.enemies.getFirstDead();
//        if (!enemy) {
//            return;
//        }
//        enemy.anchor.setTo(0.5, 0.5);
//        var direction = Phaser.Utils.randomChoice(-1, 1);
//        if (direction === 1) {
//            this.add.tween(enemy).to({angle: 360}, 2500, Phaser.Easing.linear).loop().start();
//        } else {
//            this.add.tween(enemy).to({angle: -360}, 2500, Phaser.Easing.linear).loop().start();
//        }
//        if (MyGame.level === 5 || MyGame.level === 6) {
//            switch (direction) {
//                case -1:
//                    enemy.reset(this.world.centerX / 2, 0);
//                    enemy.body.velocity.x = 150;
//                    break;
//                case 1:
//                    enemy.reset(this.world.centerX + (this.world.centerX / 2), 0);
//                    enemy.body.velocity.x = -150;
//                    break
//                default:
//                    break;
//            }
//        } else {
//            enemy.reset(this.world.centerX, 0);
//            enemy.body.velocity.x = 150 * direction;
//        }
//
//        enemy.body.gravity.y = 500;
//        enemy.body.bounce.x = 1;
//        enemy.body.bounce.y = 0.3;
//        enemy.body.setSize(36, 36);
//        enemy.checkWorldBounds = true;
//        enemy.outOfBoundsKill = true;
//    }
};