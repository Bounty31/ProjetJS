var queue;
var themes = ["rouge", "bleu", "vert"];

for (var i = 0; i < themes.length; i++) {
	themes[i] = "images/" + themes[i] + ".png";
}



/* ###### SNAKE GAME ###### */
function SnakeGame(coeffWidth, coeffHeight, size, speed, borders, theme, window) {
	this.snakes = [];

	this.size = size;
	this.width = coeffWidth * this.size * 13 - this.size;
	this.height = coeffHeight * this.size * 13 - this.size;
	this.speed = speed;
	this.borders = borders;
	this.state = "starting";
	this.theme = theme;
	this.ready = 0;
	
	this.stage = new createjs.Stage("snake_canvas");
	$("#snake_canvas").width(this.width);
	$("#snake_canvas").height(this.height);
	this.stage.canvas.width = this.width;
	this.stage.canvas.height = this.height;

	var self = this;
	createjs.Ticker.addEventListener("tick", function() {
		self.handleTick();
	});
	createjs.Ticker.setInterval(speed);
}
SnakeGame.prototype.addSnake = function(snake) {
	for (var i = 0; i < snake.snake_array.length; i++) {
		this.stage.addChild(snake.snake_array[i]);
	}
	this.snakes.push(snake);
}
SnakeGame.prototype.borderCollision = function(snake) {
	if (this.borders) {
		if (snake.frontCell.x + snake.f_x <= (-snake.size * 12)/2 || snake.frontCell.x + snake.f_x >= (this.width + (snake.size * 12)/2) ||
			snake.frontCell.y + snake.f_y <= (-snake.size * 12)/2 || snake.frontCell.y + snake.f_y >= (this.height + (snake.size * 12)/2)) {
			snake.die(this, "border", true);
		}
	}
	else {
		if (snake.frontCell.x + snake.f_x == (this.width + (snake.size * 12)/2 + snake.size)) {
			/* Adding the index of the first cell that should be animated */

			var animEnum = {
				INDEX : snake.snake_array.length-1,
				MOVETOX : (this.width + (snake.size * 12)/2 + snake.size),
				MOVETOY : snake.frontCell.y
			};
			snake.borderEffectOut.push(animEnum);

			animEnum = {
				INDEX : snake.snake_array.length,
				TPTOX : -(snake.size * 12)/2,
				TPTOY : snake.frontCell.y,
				MOVETOX : (snake.size * 12)/2,
				MOVETOY : snake.frontCell.y
			};
			snake.borderEffectIn.push(animEnum);
		}
		else if (snake.frontCell.x + snake.f_x <= (-snake.size * 12)/2) {
			console.log('pass');
			// snake.frontCell.x = this.width + (snake.size * 12)/2 + snake.size;
		}
		/*else if (snake.frontCell.y >= (this.height + (snake.size * 12)/2)) {
			snake.frontCell.y = - snake.size * 12 / 2 - snake.size;
			// snake.borderEffectIn.push(snake.length);
		}
		else if (snake.frontCell.y <= (-snake.size * 12)/2) {
			snake.frontCell.y = this.height + (snake.size * 12)/2 + snake.size;
			// snake.borderEffectIn.push(snake.length);
		}*/
	}
}
SnakeGame.prototype.handleTick = function() {
	if (this.state == "playing") {
		this.update();
	}
	else if (this.state == "gameOver") {
		this.snakes[0].replay.showButtons();
	}
	this.render();
}
SnakeGame.prototype.update = function() {
	for (var i = 0; i < this.snakes.length; i++) {
		if (!this.snakes[i].dead) {
			/* Controls */
			this.snakes[i].update();

			/* Snake self collision */
			this.snakes[i].selfCollision(this);

			/* Border collision */
			this.borderCollision(this.snakes[i]);

			/* Animation */
			this.snakes[i].animate(this.stage, this.speed);
		}
	}
	var c = 0;
	for (var i = 0; i < this.snakes.length; i++) {
		if (this.snakes[i].showReplay) {
			c++;
		}
	}
	if (c == this.snakes.length) {
		this.state = "gameOver";
	}
}
SnakeGame.prototype.render = function() {
	this.stage.update();
}


/* SNAKE */
function Snake(name, init_length, init_direction, x_offset, y_offset, control_keys) {
	this.name = name;
	this.length = init_length;
	this.init_direction = init_direction;
	this.x_offset = x_offset;
	this.y_offset = y_offset;
	this.control_keys = control_keys;
	this.f_x = 0;
	this.f_y = 0;
	this.size = 0;

	this.animation = null;
	this.replay = null;

	this.snake_array = [];
	this.frontCell = null;
	this.borderEffectOut = []
	this.borderEffectIn = [];
	this.dead = false;
	this.showReplay = false;
	this.themeImage = null;
}
Snake.prototype.create = function(themeImage, snakeGame, debug) {
	this.size = snakeGame.size;
	this.themeImage = themeImage;
	this.animation = new Animation(snakeGame);
	this.replay = new Replay();

	for (var i = 0; i < this.length; i++) {
		this.snake_array.push(new createjs.Bitmap(this.themeImage));
	}

	this.frontCell = this.snake_array[this.snake_array.length - 1];
	this.animation.create(this);
	
	if (debug) {
		console.log("Created : " + this.name);
	}
}
Snake.prototype.update = function() {
	this.f_x = 0;
	this.f_y = 0;

	if (this.control_keys == "directionnal_keys") {
		key_codes = 0;
	}
	else if (this.control_keys == "zqsd_keys") {
		key_codes = 1;
	}

	if (key_names[key_codes] == "s_right") {
		this.f_x = this.size * 13;
	}
	else if (key_names[key_codes] == "s_left") {
		this.f_x = -this.size * 13;
	}
	else if (key_names[key_codes] == "s_up") {
		this.f_y = -this.size * 13;
	}
	else if (key_names[key_codes] == "s_down") {
		this.f_y = this.size * 13;
	}

}
Snake.prototype.animate = function(stage, speed) {
	if (!this.dead) {
		this.animation.move(this, speed);
	}

	// , ease:Elastic.easeInOut.config(1, 1) bezier:{type:"soft", values:[{scaleX:1, scaleY:1}, {scaleX:0.5, scaleY:0.5}, {scaleX:1, scaleY:1}], autoRotate:true}
	// bezier:{type:"soft", values:[{alpha:1}, {alpha:0}, {alpha:1}], autoRotate:true},
}
Snake.prototype.selfCollision = function(snakeGame) {
	var oneTime = false;	
	
	if (!this.dead) {
		for (var i = this.snake_array.length - 2; i >= 0 ; i--) {
			if (this.frontCell.x + this.f_x == this.snake_array[i].x && this.frontCell.y + this.f_y == this.snake_array[i].y
			 && !oneTime) {
				this.die(snakeGame, "self1", true);
				oneTime = true;
			}
		}
	}
}
Snake.prototype.die = function(snakeGame, animation, debug) {
	this.animation.die(this, animation);

	this.dead = true;

	if (debug) {
		if (animation == "self1") {
			console.log("Died (self collision) : " + this.name);
		}
		else if (animation == "border") {
			console.log("Died (border collision) : " + this.name);
		}
	}
}


function printObjectNow(object, detailed) {
	if (detailed) {
		console.log(JSON.stringify(object));
	}
	else {
		console.log($.extend({}, object));
	}
}




function startLoading() {
	queue = new createjs.LoadQueue();
	
	console.log("Loading " + themes.length + " elements:");
	for (var i = 0; i < themes.length; i++) {
		console.log("   " + themes[i]);
		queue.loadFile(themes[i]);
	}
	queue.on("complete", gameStart, this, false);
}

function gameStart(event) {
	var themeImages = [];

	for (var i = 0; i < themes.length; i++) {
		themeImages.push(queue.getResult(themes[i]));
	}

 	var snake_game = new SnakeGame(30, 15, 2, 2000, false, this); //Creation du terrain de jeu

	var joueur1 = new Snake("Abrakadabra", 10, "x", 10, 0, "directionnal_keys"); // Creation du joueur
	var joueur2 = new Snake("Jean Mi du 13", 20, "x", 0, 5, "zqsd_keys"); // Creation du joueur
	var joueur3 = new Snake("Dylan la kalash", 5, "x", 3, 10, "directionnal_keys"); // Creation du joueur
	joueur1.create(themeImages[2], snake_game, true);
	joueur2.create(themeImages[1], snake_game, true);
	joueur3.create(themeImages[0], snake_game, true);

	snake_game.addSnake(joueur1);
	// snake_game.addSnake(joueur2);
	// snake_game.addSnake(joueur3);

	$("#playBtn").on("click", function() {
		joueur1.dead = true;
		joueur1.replay.getTimeline().play();
	});

	$("#pauseBtn").on("click", function() {
		joueur1.dead = true;
		joueur1.replay.getTimeline().pause();
	});

	$("#reverseBtn").on("click", function() {
		joueur1.dead = true;
		joueur1.replay.getTimeline().reverse();
	});
	$("#flashback").on("click", function() {
		joueur1.flashback();
	});

	$("#progressSlider").slider({
		range: false,
		min: 0,
		max: 1,
		step:.001,
		slide: function (event, ui) {
			joueur1.replay.getTimeline().progress( ui.value ).pause();
		}
	});

	$("#playBtn").hide();
	$("#pauseBtn").hide();
	$("#reverseBtn").hide();
	$("#progressSlider").hide();
}

$(document).ready(function() {
	startLoading();
});