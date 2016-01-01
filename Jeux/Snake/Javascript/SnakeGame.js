function SnakeGame(coeffWidth, coeffHeight, size, speed, borders) {
    this.snakes = [];

    this.size = size;
    this.width = coeffWidth * this.size * 13 - this.size;
    this.height = coeffHeight * this.size * 13 - this.size;
    this.speed = speed;
    this.borders = borders;
    this.state = "starting";
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
