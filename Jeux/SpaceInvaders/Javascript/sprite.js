//personnage
var img_perso = new Image();
img_perso.src = "spaceship_spritesheet.png";
var personnage = 
[
new Sprite(img_perso,0,0,512,img_perso.height/2),
new Sprite(img_perso,512,0,512,img_perso.height/2),
new Sprite(img_perso,1024,0,512,img_perso.height/2),
new Sprite(img_perso,0,512,512,img_perso.height/2),
new Sprite(img_perso,512,512,512,img_perso.height/2),
new Sprite(img_perso,1024,512,512,img_perso.height/2)
];


function Sprite(img, x, y, width, height) {
	this.bullet_array = [];
	this.scale = 0.125;
	this.fireRate = 4;
	this.shootTiming = 1000/this.fireRate;
	this.previousShootTime = 0;
	this.state = "idle";
	this.img = img;
	this.posx = 0;
	this.posy = 0;
	this.ximg = x;
	this.yimg = y;
	this.width = width;
	this.height = height;
	this.animation = new Animation(50,50,"blabla");
};

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.ximg, this.yimg, this.width, this.height,
		this.posx, this.posy, this.width*this.scale, this.height*this.scale);
};

Sprite.prototype.deplacer = function(){
	if(key_space){
		this.tirer();
	}
	if(key_right){
		if(this.state!="m_right")
			cursorAnimation = 0;
		this.state="m_right";
		this.posx +=3;
	}
	if(key_left){
		if(this.state!="m_left")
			cursorAnimation = 0;
		this.posx -=3;
		this.state="m_left";
	}
	if((key_right && key_left) || (!key_right && !key_left) ){
		this.state = "idle";
	}
}
Sprite.prototype.tirer = function(){
	pewTime = (new Date()).getTime();
	if(pewTime - this.previousShootTime >= this.shootTiming){
		this.bullet_array.push(new Bullet(this.posx+this.width/16,this.posy));
		this.previousShootTime = pewTime;
	}
	this.animation.start(true);	
}
Sprite.prototype.update = function(){
	this.deplacer();
	this.animation.update();
	for (var i = this.bullet_array.length- 1; i >= 0; i--) {
		this.bullet_array[i].update();
	};
}

Sprite.prototype.render = function(ctx){
	this.draw(ctx,this.posx,this.posy);
	for (var i = this.bullet_array.length- 1; i >= 0; i--) {
		this.bullet_array[i].render(ctx);
	};
	this.animation.render();
}

Sprite.prototype.nextFrame = function(n){
	this.ximg = personnage[n].ximg;
	this.yimg = personnage[n].yimg; 
}

