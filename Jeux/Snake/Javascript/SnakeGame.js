function SnakeGame(coeffWidth, coeffHeight, size, speed, pointsImg, borders) {
    this.snakes = [];

    this.size = size;
    this.coeffWidth = coeffWidth;
    this.coeffHeight = coeffHeight;
    this.pointsImg = pointsImg;
    this.width = coeffWidth * this.size * 13 - this.size;
    this.height = coeffHeight * this.size * 13 - this.size;
    this.speed = speed;
    this.borders = borders;
    this.state = "starting";
    this.ready = 0;
    this.pause = false;
    this.scores = [];
    this.apples = [];

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
SnakeGame.prototype.pointsHandler = function() {
    /* First time */
    if (this.apples.length == 0) {
        var randomX = Math.floor((Math.random() * this.coeffWidth) + 1) * this.size * 13 + this.size * 12/2;
        var randomY = Math.floor((Math.random() * this.coeffHeight) + 1) * this.size * 13 + this.size * 12/2;

        this.apples.push(new createjs.Bitmap(this.pointsImg));

        TweenLite.set(this.apples[0], {
            x:randomX, y:randomY,
            scaleX:this.size, scaleY:this.size,
            regX:6, regY:6,
            alpha:1
        });

        this.stage.addChild(this.apples[0]);
    }
    else {
        var c = 0;

        for (var i = 0; i < this.apples.length; i++) {
            if (this.apples[i].alpha == 1) {
                c++;
            }
        }

        if (c == 0) {
            var randomX = Math.floor((Math.random() * this.coeffWidth) + 1) * this.size * 13 + this.size * 12/2;
            var randomY = Math.floor((Math.random() * this.coeffHeight) + 1) * this.size * 13 + this.size * 12/2;

            this.apples.push(new createjs.Bitmap(this.pointsImg));

            TweenLite.set(this.apples[this.apples.length - 1], {
                x:randomX, y:randomY,
                scaleX:this.size, scaleY:this.size,
                regX:6, regY:6,
                alpha:1
            });

            this.stage.addChild(this.apples[this.apples.length - 1]);
        }
    }
}
SnakeGame.prototype.pointsCollision = function(snake) {
    for (var i = 0; i < this.apples.length; i++) {
        if (snake.frontCell.x == this.apples[i].x &&
            snake.frontCell.y == this.apples[i].y) {

            snake.grow(this, true);

            this.apples[i].alpha = 0;
            if (snake.length == 6) {
                mAchievements.get(2, 3000);
            }

            snake.length += 1;
        }
    }
}
SnakeGame.prototype.borderCollision = function(snake) {
    if (this.borders) {
        if (snake.frontCell.x + snake.f_x <= (-snake.size * 12)/2 || snake.frontCell.x + snake.f_x >= (this.width + (snake.size * 12)/2) ||
            snake.frontCell.y + snake.f_y <= (-snake.size * 12)/2 || snake.frontCell.y + snake.f_y >= (this.height + (snake.size * 12)/2)) {
            snake.die(this, "border", true);
        }
    }
    else {
        var coeff = (snake.size * 12)/2;

        if (snake.frontCell.x + snake.f_x == (this.width + coeff + snake.size)) {
            /* Adding the index of the first cell that should be animated */

            var animEnum = {
                INDEX : snake.snake_array.length-1,
                MOVETOX : (this.width + coeff + snake.size),
                MOVETOY : snake.frontCell.y
            };
            snake.borderEffectOut.push(animEnum);

            animEnum = {
                INDEX : snake.snake_array.length,
                TPTOX : -coeff,
                TPTOY : snake.frontCell.y,
                MOVETOX : coeff,
                MOVETOY : snake.frontCell.y
            };
            snake.borderEffectIn.push(animEnum);
        }
        else if (snake.frontCell.x + snake.f_x == (-coeff - snake.size)) {
            var animEnum = {
                INDEX : snake.snake_array.length-1,
                MOVETOX : (-coeff - snake.size),
                MOVETOY : snake.frontCell.y
            };
            snake.borderEffectOut.push(animEnum);

            animEnum = {
                INDEX : snake.snake_array.length,
                TPTOX : this.width + coeff,
                TPTOY : snake.frontCell.y,
                MOVETOX : this.width - coeff,
                MOVETOY : snake.frontCell.y
            };
            snake.borderEffectIn.push(animEnum);
        }
        else if (snake.frontCell.y + snake.f_y == (this.height + coeff + snake.size)) {
            var animEnum = {
                INDEX : snake.snake_array.length-1,
                MOVETOX : snake.frontCell.x,
                MOVETOY : (this.height + coeff + snake.size)
            };
            snake.borderEffectOut.push(animEnum);

            animEnum = {
                INDEX : snake.snake_array.length,
                TPTOX : snake.frontCell.x,
                TPTOY : -coeff,
                MOVETOX : snake.frontCell.x,
                MOVETOY : coeff
            };
            snake.borderEffectIn.push(animEnum);
        }
        else if (snake.frontCell.y + snake.f_y == (-coeff - snake.size)) {
            var animEnum = {
                INDEX : snake.snake_array.length-1,
                MOVETOX : snake.frontCell.x,
                MOVETOY : (-coeff - snake.size)
            };
            snake.borderEffectOut.push(animEnum);

            animEnum = {
                INDEX : snake.snake_array.length,
                TPTOX : snake.frontCell.x,
                TPTOY : this.height + coeff,
                MOVETOX : snake.frontCell.x,
                MOVETOY : this.height - coeff
            };
            snake.borderEffectIn.push(animEnum);
        }
    }
}
SnakeGame.prototype.pauseGame = function() {
    this.pause = true;
}
SnakeGame.prototype.unpauseGame = function() {
    this.pause = false;
}
SnakeGame.prototype.destroy = function() {
    for (var i = 0; i < this.snakes.length; i++) {
        this.snakes[i].die(this, "destroyed", true);
    }
}
SnakeGame.prototype.handleTick = function() {
    if (!this.pause) {
        if (this.state == "playing") {
            this.update();
        }
        else if (this.state == "gameOver") {
            this.snakes[0].replay.showButtons();
        }
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

            /* Snakes collisions */
            this.snakes[i].snakesCollision(this, i);

            /* Snake points check */
            this.pointsCollision(this.snakes[i]);

            /* Animation */
            this.snakes[i].animate(this.stage, this.speed);
        }
    }

    this.pointsHandler();

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
