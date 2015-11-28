var starsColors = []
for (var i = 0; i < 50; i++) {
	starsColors.push("lightyellow");
};
starsColors.push("orange");
starsColors.push("green");
starsColors.push("yellow");
starsColors.push("Bisque");
starsColors.push("FireBrick");
starsColors.push("GreenYellow");
starsColors.push("Lime");
starsColors.push("Magenta");
starsColors.push("Turquoise");
starsColors.push("SlateBlue");
starsColors.push("PowderBlue");
starsColors.push("LightPink");


// CLASS STAR
function Star (x,y) {
	this.pos = new Point(x,y);
	this.alpha = Math.random();
	this.c = starsColors[randInt(starsColors.length-1)];
	this.taille = Math.random()*2;
}

Star.prototype.setAlpha = function(alpha) {
	this.alpha = alpha;
};
Star.prototype.getAlpha = function() {
	return this.alpha ;
};

Star.prototype.setColor = function(color) {
	this.c = color;
};
Star.prototype.getColor = function() {
	return this.c ;
};