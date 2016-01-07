var queue;
var themes = ["rouge", "bleu", "vert", "violet", "point"];
var snake_game;
var players_list = [];

for (var i = 0; i < themes.length; i++) {
    themes[i] = "images/" + themes[i] + ".png";
}

function startLoading() {
	queue = new createjs.LoadQueue();

    for (var i = 0; i < themes.length; i++) {
		queue.loadFile(themes[i]);
	}
	queue.on("complete", gameStartCallback, this, false);
}

function gameStartCallback() {
    console.log("# Loaded images.");
    unlock(0);
    gameStart(4, [0, 1, 2, 3], ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4"], 30, 20);
}


TweenLite.set($("#snake_menu"), {y:"-1000px"});
showMenu();
var menu = true;

function showMenu() {
    TweenMax.to($("#snake_menu"), 0.3, {y:"0px"});
}
function hideMenu() {
    TweenMax.to($("#snake_menu"), 0.3, {y:"-1000px"});
}

$(document).keyup(function(e) {
	var key = e.which;
    e.preventDefault();

    // Space (pause)
	if (key == "32") {
		if (menu) {
            hideMenu();
            snake_game.unpauseGame();
		}
		else {
			showMenu();
            if (snake_game != null)
                snake_game.pauseGame();
		}
		menu = !menu;
	}
    // Esc (Exit)
    if (key == "27") {
        snake_game.destroy();
        snake_game = null;
        players_list = [];
    }
})

function gameStart(players, color_list, players_names, border, sizeX, sizeY) {
	var themeImages = [];
    var snake_speed = 250;
    var start_position = ["x", "y", "x", "y"];
    var start_coords = [{x:0, y:0}, {x:28, y:0}, {x:18, y:18}, {x:0, y:2}];
    var default_mapping = ["directionnal_keys", "zqsd_keys", "uhjk_keys", "5123_keys"];
    key_names = ["s_right", "s_down", "s_right", "s_down"];

    if (players == 2) {
        unlock(1);
    }

	for (var i = 0; i < themes.length; i++) {
		themeImages.push(queue.getResult(themes[i]));
	}

    var isTrueSet = (border === 'true');

	snake_game = new SnakeGame(sizeX, sizeY, 2, snake_speed, themeImages[4], isTrueSet); //Creation du terrain de jeu

    for (var i = 0; i < players; i++) {
        players_list.push(new Snake(players_names[i], 4, start_position[i], start_coords[i].x, start_coords[i].y, default_mapping[i]));
        players_list[i].create(themeImages[color_list[i]], snake_game, true);
        snake_game.addSnake(players_list[i]);
    }

	$("#playBtn").on("click", function() {
        for (var i = 0; i < players_list.length; i++) {
            players_list[i].replay.getTimeline().play();
        }
	});

	$("#pauseBtn").on("click", function() {
        for (var i = 0; i < players_list.length; i++) {
            players_list[i].replay.getTimeline().pause();
        }
	});

	$("#reverseBtn").on("click", function() {
        for (var i = 0; i < players_list.length; i++) {
            players_list[i].replay.getTimeline().reverse();
        }
	});

	$("#progressSlider").slider({
		range: false,
		min: 0,
		max: 1,
		step:.001,
		slide: function (event, ui) {
            for (var i = 0; i < players_list.length; i++) {
                players_list[i].replay.getTimeline().progress(ui.value).pause();
            }
        }
	});
}

startLoading();