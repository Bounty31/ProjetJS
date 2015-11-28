
function Bullet(x,y) {
	this.x = x;
	this.y = y;
	this.vitesse = 10;
	this.dead = false;
};

Bullet.prototype.update = function(){
	this.y-=this.vitesse;
}


Bullet.prototype.render = function(ctx){
	ctx.fillStyle  = "white";
	ctx.fillRect(this.x,this.y,3,10);	
}

// AJOUTER DIFFERENTS TYPES DE BULLET 
/* transpercante 
explosive
suiveuse
etc..*/