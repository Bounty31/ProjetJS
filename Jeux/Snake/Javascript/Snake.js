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
    this.score = 0;
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
        console.log("+ Created : " + this.name);
    }
}
Snake.prototype.grow = function(snakeGame, debug) {
    this.snake_array.unshift(new createjs.Bitmap(this.themeImage));
    snakeGame.stage.addChild(this.snake_array[0]);

    this.animation.grow(this);

    if (debug) {
        console.log("+ Grow : " + this.name);
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
    else if (this.control_keys == "uhjk_keys") {
        key_codes = 2;
    }
    else if (this.control_keys == "5123_keys") {
        key_codes = 3;
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
}
Snake.prototype.selfCollision = function(snakeGame) {
    var oneTime = false;

    for (var i = this.snake_array.length - 2; i >= 0 ; i--) {
        if (this.frontCell.x + this.f_x == this.snake_array[i].x && this.frontCell.y + this.f_y == this.snake_array[i].y
            && !oneTime) {
            this.die(snakeGame, "self1", true);
            oneTime = true;
        }
    }
}
Snake.prototype.snakesCollision = function(snakeGame, index) {
    var collision = false;
    var collision_index = null;

    for (var i = 0; i < snakeGame.snakes.length ; i++) {
        if (i != index && !collision) {
            for (var j = snakeGame.snakes[i].snake_array.length - 1; j > 0 ; j--) {
                if (j == snakeGame.snakes[i].snake_array.length - 1) {
                    if (this.frontCell.x + this.f_x == snakeGame.snakes[i].snake_array[j].x + snakeGame.snakes[i].f_x
                        && this.frontCell.y + this.f_y == snakeGame.snakes[i].snake_array[j].y + snakeGame.snakes[i].f_y) {
                        collision = true;
                        collision_index = i;
                    }
                }
                else {
                    if (this.frontCell.x + this.f_x == snakeGame.snakes[i].snake_array[j].x
                        && this.frontCell.y + this.f_y == snakeGame.snakes[i].snake_array[j].y) {
                        collision = true;
                        collision_index = i;
                    }
                }
            }
        }
    }

    if (collision && !snakeGame.snakes[collision_index].dead) {
        console.log("- " + this.name + " died (collision) " + snakeGame.snakes[collision_index].name);
        this.die(snakeGame, "s_collision", true);
    }
}
Snake.prototype.die = function(snakeGame, animation, debug) {
    this.animation.die(this, animation);
    this.dead = true;

    if (debug) {
        if (animation == "self1") {
            console.log("- Died (self collision) : " + this.name);
        }
        else if (animation == "border") {
            console.log("- Died (border collision) : " + this.name);
        }
        else if (animation == "destroyed") {
            console.log("- Died (destroyed) : " + this.name);
        }
    }
}