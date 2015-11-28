function Enemy(x,y,w,h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.bound = new Rectangle(x,y,w,h);
	this.dead = false;
}

Enemy.prototype.render = function(ctx){
	try{
		ctx.fillStyle  = "white";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	catch(err) {
	}
}

Enemy.prototype.update = function(){
}