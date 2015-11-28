function Collisions (game,player,enemies) {
	this.game = game;
	this.player = player;
	this.enemies = enemies;
}


Collisions.prototype.checkMonsterKill= function(player,enemies){
	for (var j = 0; j < player.bullet_array.length; j++) {
		for (var i = 0; i < enemies.wave.length; i++) {
			if(enemies.wave[i].bound.contains(new Point(player.bullet_array[j].x,player.bullet_array[j].y))){
				enemies.wave[i].dead =  true;
			}
		}
	}
}

Collisions.prototype.checkPlayerBound = function(game,player){
	if(this.player.posx+this.player.width*this.player.scale>this.game.width)
		this.player.posx = this.game.width - this.player.width*this.player.scale;
	if(this.player.posx<0)
		this.player.posx = 0;
}

Collisions.prototype.checkBullet = function(game,player,enemies) {
	// body...
};
Collisions.prototype.update = function() {
	this.checkPlayerBound(this.player,this.game);
	this.checkMonsterKill(this.player,this.enemies);
};

