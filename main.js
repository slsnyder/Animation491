
var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, xInit, yInit, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.xInit = xInit;
    this.yInit = yInit;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 this.xInit + xindex * this.frameWidth, this.yInit + yindex * this.frameHeight,
                     // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

// inheritance 
function Sprite(game, spritesheet) {
    this.animation = new Animation(spritesheet, 67, 100, 0, 0, 6, 0.2, 6, true, 1);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Sprite.prototype = new Entity();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.update = function () {
    this.x += this.game.clockTick * this.xSpeed;
    if (this.x > 800) this.x = -150;
    this.y += this.game.clockTick * this.ySpeed;
    if (this.y > 700) this.y = -150;
    Entity.prototype.update.call(this);
}

Sprite.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function CC(game, spritesheet) {
    this.animation = new Animation(spritesheet, 32, 32, 96, 0, 3, 0.15, 3, true, 2);
    this.xSpeed = 0;
    this.ySpeed = 64;
    this.ctx = game.ctx;
    Entity.call(this, game, 300, 300);
}

CC.prototype = new Entity();
CC.prototype.constructor = CC;

CC.prototype.update = function () {
    this.x += this.game.clockTick * this.xSpeed;
    if (this.x > 800) this.x = -32;
    this.y += this.game.clockTick * this.ySpeed;
    if (this.y > 700) this.y = -32;
    Entity.prototype.update.call(this);
}

CC.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Glitch(game, spritesheet) {
    this.animation = new Animation(spritesheet, 43, 43, 43, 86, 8, .15, 8, true, 2);
    this.xSpeed = 128;
    this.ySpeed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 100, 100);
}

Glitch.prototype = new Entity();
Glitch.prototype.constructor = Glitch;

Glitch.prototype.update = function () {
    this.x += this.game.clockTick * this.xSpeed;
    if (this.x > 800) this.x = -32;
    this.y += this.game.clockTick * this.ySpeed;
    if (this.y > 700) this.y = -32;
    Entity.prototype.update.call(this);
}

Glitch.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


AM.queueDownload("./img/glitch.png");
AM.queueDownload("./img/cc.png");
AM.queueDownload("./img/sprite.png");
AM.queueDownload("./img/transistorBG.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/transistorBG.jpg")));
    gameEngine.addEntity(new Sprite(gameEngine, AM.getAsset("./img/sprite.png")));
    gameEngine.addEntity(new CC(gameEngine, AM.getAsset("./img/cc.png")));
    gameEngine.addEntity(new Glitch(gameEngine, AM.getAsset("./img/glitch.png")));

    console.log("All Done!");
});