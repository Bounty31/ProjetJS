function Enemies(){
	this.wave = [];	
	this.size = 40;
	this.ligne = 5;
	this.collone = 5;
	this.init();
}

Enemies.prototype.init = function(){
	var r;
	for (var j = 0; j < this.ligne; j++) {
		for (var i = 0; i < this.collone; i++) {
			r = new Rectangle(randInt(game.width-this.size),(game.height/2/this.ligne)*j,this.size,this.size);
			while(this.checkCollision(r)){
				r = new Rectangle(randInt(game.width-this.size),(game.height/2/this.ligne)*j,this.size,this.size);
			}
			this.wave.push(new Enemy(r.x,r.y,r.width,r.height));
		}
	}
}


Enemies.prototype.render = function(ctx){
	for (var i = this.wave.length - 1; i >= 0; i--) {
		if(!this.wave[i].dead)
			this.wave[i].render(ctx);
	}
}

Enemies.prototype.update = function(){
	for (var i = this.wave.length - 1; i >= 0; i--) {
		if(this.wave[i].x>0)
			this.wave[i].update();
	}
}

Enemies.prototype.checkCollision=function(r){
	cpt = 0;
	for (var i = 0; i < this.wave.length; i++) {
		if(r.checkCollision(this.wave[i].bound))
			cpt++;
	}
	if(cpt>0)
		return true;
	return false;
}

