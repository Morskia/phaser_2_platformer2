MyGame.coins = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.anchor.setTo(0.5);



}
MyGame.coins.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.coins.prototype.constructor = MyGame.coins;

MyGame.coins.prototype.reset = function (x, y, key, value) {
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.motion = false;
    this.value = value;

   
    game.add.tween(this).to({y: this.y - 5}, 300, "Linear").to({y: this.y + 5}, 300, "Linear").to({y: this.y}, 300, "Linear").loop().start();


};
