function Animation(snakeGame) {
	this.snakeGame = snakeGame;
}

Animation.prototype.create = function(snake, wait) {
	var self = this;
	var tempX, tempY;

	for (var i = snake.length - 1; i >= 0; i--) {
		if (snake.init_direction == "x") { // Snake on x
			tempX = snake.x_offset * snake.size * 13 + i * snake.size * 13 + snake.size * snake.themeImage.width/2;
			tempY = snake.y_offset * snake.size * 13 + snake.size * snake.themeImage.height/2;
		}
		else if (snake.init_direction == "y") { // Snake on y
			tempX = snake.x_offset * snake.size * 13 + snake.size * snake.themeImage.width/2;
			tempY = snake.y_offset * snake.size * 13 + i * snake.size * 13 + snake.size * snake.themeImage.height/2;
		}

		TweenLite.set(snake.snake_array[i], {
			x:tempX, y:tempY,
			scaleX:snake.size, scaleY:snake.size,
			regX:snake.themeImage.width/2, regY:snake.themeImage.height/2,
			alpha:0
		});

		snake.replay.getTimeline().set(snake.snake_array[i], {
			x:tempX, y:tempY,
			scaleX:snake.size, scaleY:snake.size,
			regX:snake.themeImage.width/2, regY:snake.themeImage.height/2,
			alpha:0
		});
	}

	TweenMax.staggerTo(snake.snake_array, 0.8, 
		{alpha:1, onUpdate:function() { self.snakeGame.render(); }},
        -0.1, function() {
            self.snakeGame.ready++;
            if (self.snakeGame.ready == self.snakeGame.snakes.length) {
                self.snakeGame.state = "playing";
            }
        });

	snake.replay.getTimeline().staggerTo(snake.snake_array, 0.8,
		{alpha:1, onUpdate:function() { self.snakeGame.render(); }}, -0.1);
}

Animation.prototype.move = function(snake, speed) {
	var self = this;
	var nextX, nextY;
	var minTempsAnim = 0.18;
	var border = false;

	var total = snake.replay.getTimeline().totalDuration();
	// console.log('---------------------');

	for (var c = snake.snake_array.length - 1; c >= 0 ; c--) {
		if (c == snake.snake_array.length - 1) {
			nextX = snake.frontCell.x + snake.f_x;
			nextY = snake.frontCell.y + snake.f_y;
		}
		else {
			nextX = snake.snake_array[c+1].x;
			nextY = snake.snake_array[c+1].y;
		}

		var tempsAnim = speed/1000 - ((speed/1000 - minTempsAnim)/snake.snake_array.length) * (c % (snake.snake_array.length));
		
		/* Check if the current cell should be animated (border out animation) */
		var animated = false;
		for (var o = 0; o < snake.borderEffectOut.length; o++) {
			if (c == snake.borderEffectOut[o].INDEX) {
				// console.log("Out index : " + c);

				TweenLite.to(snake.snake_array[c], tempsAnim, {
					x:snake.borderEffectOut[o].MOVETOX, y:snake.borderEffectOut[o].MOVETOY, 
					scaleX:0, scaleY:0, alpha:0,
					onUpdate:function() { self.snakeGame.stage.update(); },
					roundProps:"x,y"}, total);

				snake.replay.getTimeline().to(snake.snake_array[c], tempsAnim, {
					x:snake.borderEffectOut[o].MOVETOX, y:snake.borderEffectOut[o].MOVETOY, 
					scaleX:0, scaleY:0,
					onUpdate:function() { self.snakeGame.stage.update(); },
					roundProps:"x,y"}, total);

				animated = true;
			}
		}

		/* Check if the current cell should be animated (border in and tp animation) */
		if (!animated) {
			for (var i = 0; i < snake.borderEffectIn.length; i++) {
				if (c == snake.borderEffectIn[i].INDEX) {
					console.log("In index : " + c);

					TweenLite.set(snake.snake_array[c], {
						x:snake.borderEffectIn[i].TPTOX, y:snake.borderEffectIn[i].TPTOY
					});

					TweenLite.to(snake.snake_array[c], tempsAnim, {
						x:snake.borderEffectIn[i].MOVETOX, y:snake.borderEffectIn[i].MOVETOY, 
						scaleX:snake.size, scaleY:snake.size, alpha:1,
						onUpdate:function() { self.snakeGame.stage.update(); }
						, roundProps:"x,y"});

					snake.replay.getTimeline().set(snake.snake_array[c], {
						x:snake.borderEffectIn[i].TPTOX, y:snake.borderEffectIn[i].TPTOY
					}, total);
					snake.replay.getTimeline().to(snake.snake_array[c], tempsAnim, {
						x:snake.borderEffectIn[i].MOVETOX, y:snake.borderEffectIn[i].MOVETOY, 
						scaleX:snake.size, scaleY:snake.size, alpha:1,
						onUpdate:function() { self.snakeGame.stage.update(); }
					, roundProps:"x,y"}, total);

                    animated = true;
				}
			}
		}

		/* Normal moving cell */
		if (!animated) {
			TweenLite.to(snake.snake_array[c], tempsAnim, 
			{x:nextX, y:nextY, scaleX:snake.size, scaleY:snake.size,
			onUpdate:function() { self.snakeGame.render(); }, roundProps:"x,y"});

			snake.replay.getTimeline().to(snake.snake_array[c], tempsAnim, 
			{x:nextX, y:nextY, scaleX:snake.size, scaleY:snake.size,
			onUpdate:function() { self.snakeGame.render(); }, roundProps:"x,y"}, total.toFixed(1));
		}	

	}

	for (var o = 0; o < snake.borderEffectOut.length; o++) {
		snake.borderEffectOut[o].INDEX--;
		if (snake.borderEffectOut[o].INDEX == -1) {
			snake.borderEffectOut.splice(o, 1);
		}
	}

	for (var i = 0; i < snake.borderEffectIn.length; i++) {
		snake.borderEffectIn[i].INDEX--;
		if (snake.borderEffectIn[i].INDEX == -1) {
			snake.borderEffectIn.splice(i, 1);
		}
	}
}

Animation.prototype.die = function(snake, animType) {
	var self = this;

	if (animType == "self1") {
		shuffle(snake.snake_array);

		TweenLite.to(snake.frontCell, 1, 
			{x:snake.frontCell.x + snake.f_x, y:snake.frontCell.y + snake.f_y, scaleX:0, scaleY:0, onUpdate:function() { self.snakeGame.render(); }, roundProps:"x,y"});

		TweenMax.staggerTo(snake.snake_array, 1, {
			alpha:0, onUpdate:function() { self.snakeGame.render(); },
			onComplete:function() { snake.showReplay = true; }}, 0.08);

		snake.replay.getTimeline().to(snake.frontCell, 1, 
			{x:snake.frontCell.x + snake.f_x, y:snake.frontCell.y + snake.f_y, scaleX:0, scaleY:0, onUpdate:function() { self.snakeGame.render(); }, roundProps:"x,y"});

		snake.replay.getTimeline().staggerTo(snake.snake_array, 1, {alpha:0, onUpdate:function() { self.snakeGame.render(); }}, 0.08);
	}
	else if (animType == "border") {
		TweenMax.staggerTo(snake.snake_array, 0.5, 
			{scaleX:snake.size*2, scaleY:snake.size*2, alpha:0, onUpdate:function() { self.snakeGame.render(); },
			onComplete:function() { snake.showReplay = true; }}, -0.08);

		snake.replay.getTimeline().staggerTo(snake.snake_array, 0.5, 
			{scaleX:snake.size*2, scaleY:snake.size*2, alpha:0, onUpdate:function() { self.snakeGame.render(); }}, -0.08);
	}
}

Animation.prototype.getTimeline = function() {
	return this.timeline;
}




function shuffle(array) {
	var tmp, current, top = array.length;

	if(top) while(--top) {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	}

	return array;
}