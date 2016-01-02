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