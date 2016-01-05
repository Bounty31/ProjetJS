var queue;
var themes = ["rouge", "bleu", "vert", "violet"];

for (var i = 0; i < themes.length; i++) {
    themes[i] = "images/" + themes[i] + ".png";
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
	console.log("Starting Snake game...");
	queue = new createjs.LoadQueue();

	console.log("Loading " + themes.length + " elements:");
	for (var i = 0; i < themes.length; i++) {
		console.log("   " + themes[i]);
		queue.loadFile(themes[i]);
	}
	queue.on("complete", gameStart, this, false);
}

function gameStart() {
	var themeImages = [];

	for (var i = 0; i < themes.length; i++) {
		themeImages.push(queue.getResult(themes[i]));
	}

	var snake_game = new SnakeGame(30, 15, 2, 250, false); //Creation du terrain de jeu

	var joueur1 = new Snake("Abrakadabra", 15, "x", 10, 0, "directionnal_keys"); // Creation du joueur
	var joueur2 = new Snake("Jean Mi du 13", 10, "x", 0, 5, "zqsd_keys"); // Creation du joueur
	var joueur3 = new Snake("Dylan la kalash", 14, "x", 3, 10, "directionnal_keys"); // Creation du joueur
	joueur1.create(themeImages[3], snake_game, true);
	//joueur2.create(themeImages[1], snake_game, true);
	//joueur3.create(themeImages[0], snake_game, true);

	snake_game.addSnake(joueur1);
	//snake_game.addSnake(joueur2);
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
}

//startLoading();




