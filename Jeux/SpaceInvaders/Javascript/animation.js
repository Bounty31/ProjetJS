function Animation (x,y,name) {
	this.x = x;
	this.y = y;
	this.name = name;
	this.tick = 0;
	this.frame = 0;
	this.img = new Image();
	this.img.src = "spaceship_msprite.png";
	this.play = false;
	this.animationframes = [];
	this.animationframes.push(new Point(0,0));
	this.animationframes.push(new Point(0,272));
	this.animationframes.push(new Point(0,544));
	this.animationframes.push(new Point(272,0));
	this.animationframes.push(new Point(272,272));
	this.animationframes.push(new Point(272,544));
	this.tAnim = (new Date()).getTime();

}



Animation.prototype.update = function() {
	if(this.play){
		this.tick++;
		this.tick = this.tick%6;
	}
}


Animation.prototype.render = function() {
	if(this.play){
		game.ctx.drawImage(this.img,this.animationframes[this.tick].x,this.animationframes[this.tick].y, 272, 272,
			this.x, this.y, 272/4, 272/4);
	}
}// faire un tick custom comme ça on peut avoir des animation au ralenti etc..
Animation.prototype.start = function(loop) {
	this.play = true;
}