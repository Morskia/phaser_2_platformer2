
var MyGame = {
    music: null,
    score: 0,
    level: 1
};
MyGame.boot = function () {

};
MyGame.boot.prototype = {
    // set default parametrs to engine
    init: function () {
//        this.input.maxPointers = 4;
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignVertically = true;
//      
        //  this.physics.startSystem(Phaser.Physics.ARCADE);

    },
    // preload assets for this
    preload: function () {
        this.load.path = 'assets/';
        this.load.image('progressBar', 'progressBar.png');
        this.load.image('welcomescreen', 'welcomescreen.png');
    },
    create: function () {

        if (this.game.device.desktop) {
           
            this.scale.maxWidth = 810;
            this.scale.maxHeight = 660;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

        } else {
            
        }
        this.state.start('preload');


    },
    render: function () {

//        game.debug.text('Navigator: ' + navigator.userAgent, 32, 32);
//        game.debug.text('iOS: ' + game.device.iOS, 32, 64);
//        game.debug.text('Mobile Safari: ' + game.device.mobileSafari, 32, 98);
//        game.debug.text('WebApp: ' + game.device.webApp, 32, 128);
//        game.debug.text('nav: ' + navigator['standalone'], 32, 128 + 32);
//        game.debug.text('app: ' + game.device.iOSVersion, 32, 128 + 64);
//        
//        
//         game.debug.text('ros: ' + game.device);
    }
};

