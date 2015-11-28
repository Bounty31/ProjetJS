function Game (w,h) {
	this.bg = null;
	this.width = w;
	this.height = h;
	this.canvas = document.createElement('canvas');
	this.player = [];
	this.enemies = null;
	this.ctx = this.canvas.getContext("2d");
	this.canvas.style.border = "solid orange 5px";
	this.canvas.style.background="black";
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.id = "spaceInvaders";
	document.body.appendChild(this.canvas);
	document.getElementById('game').appendChild(this.canvas);
	this.setBackground();
	this.collisions = [];
}

Game.prototype.init = function() {
	//game.addBg();
	this.addCollisions(
		this.addPlayer(),
		this.addEnemies(new Enemies())
		);
}

Game.prototype.addCollisions = function(player,enemies) {
	this.collisions.push(new Collisions(this,player,enemies));
};
Game.prototype.addPlayer = function() {
	p = new Sprite(
		personnage[0].img,
		personnage[0].ximg,
		personnage[0].yimg,
		personnage[0].width,
		personnage[0].height
		);	
	p.posx = (width-p.width*p.scale)/2;
	p.posy = height-p.height*p.scale;
	this.player.push(p);
	return p;
}

Game.prototype.addEnemies = function(e) {
	this.enemies = e;
	return e;
}

Game.prototype.setBackground = function() {
	stars = [];
	bg_canvas = document.createElement('canvas');
	bg_canvas.width = this.width;
	bg_canvas.height = this.height;
	bgCtx = bg_canvas.getContext("2d");
	nbEtoile = 4000;
	//remplissage tableau étoile aléatoirement placées
	for (var i = 0; i < nbEtoile; i++) 
		stars.push(new Star(
			randInt(this.width),
			randInt(this.height)-i/20
			));
	
	// dessin des étoiles 
	for (var i = 0; i < nbEtoile; i++) {
		bgCtx.fillStyle = stars[i].getColor();
		bgCtx.globalAlpha = stars[i].alpha;
		bgCtx.fillRect(stars[i].pos.x,stars[i].pos.y,stars[i].taille,stars[i].taille);
	}
	bgCtx.globalAlpha = 1;
	this.bg = bg_canvas;
}

Game.prototype.render = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.ctx.drawImage(this.bg,0,0);
	for (var i = 0; i < this.player.length; i++) 
		this.player[i].render(this.ctx);
	
	this.enemies.render(this.ctx);
}

Game.prototype.update = function() {
	for (var i = 0; i < this.player.length; i++) 
		this.player[i].update();	
	for (var i = 0; i < this.collisions.length; i++)
		this.collisions[i].update();	
	
	
	this.enemies.update();
}

Game.prototype.run = function() {
	this.init();
	myGame = this;
	var loop = function(){
		myGame.update();
		myGame.render();
		window.requestAnimationFrame(loop,this.canvas);
	}
	window.requestAnimationFrame(loop,this.canvas);
}