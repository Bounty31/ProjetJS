
// initvar
var canvas ;
var ctx ;
var s_perso;
var currentFrame;
var cursorAnimation = 0;
var frames;
var vitesseAnimation = 6;
var realcontext;
var stars;
var starsColors;
var gameSize;
var spaceCtx;
var space_rendered ;


function init(){
	gameSize = 900;
	//frame actuelle
	starsColors = [];
	initColors();
	frames = 0;
	currentFrame = 0;
	stars = [];
	space_rendered = false;
	//creation canvas
	canvas = document.createElement('canvas');
	canvas.style.border = "solid orange 5px";
	canvas.style.background="black";
	canvas.width = gameSize;
	canvas.height = gameSize;
	canvas.id = "flappy";

	//prerendering canvas
	p_canvas = document.createElement('canvas');
	p_canvas.width = gameSize;
	p_canvas.height = gameSize;

	s_canvas = document.createElement('canvas');
	s_canvas.width = gameSize;
	s_canvas.height = gameSize;

	//création perso
	s_perso = new Sprite(personnage[0].img,personnage[0].ximg,personnage[0].yimg,personnage[0].width,personnage[0].height);
	s_perso.posx = (canvas.width-s_perso.width/8)/2;
	s_perso.posy = (canvas.height-s_perso.height/8);
	enemies = new Enemies();

	ctx = p_canvas.getContext("2d");
	spaceCtx = s_canvas.getContext("2d");
	realcontext = canvas.getContext("2d");
	document.body.appendChild(canvas);
	document.getElementById('game').appendChild(canvas);	
	run();
}

function initColors(){
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
}
function displayunicode(e){
	var unicode=e.keyCode? e.keyCode : e.charCode;
	key_pressed = unicode;
}


function update(){
	changeFrame();
	enemies.update();	
	s_perso.update();
}

function changeFrame(){
	frames++;
	if(frames>=vitesseAnimation && s_perso.state=="m_right" && cursorAnimation<2){
		frames = 0;
		cursorAnimation++;
		frames++;
		currentFrame = cursorAnimation;
	}
	if(frames>=vitesseAnimation && s_perso.state=="m_left" && cursorAnimation<2){
		frames = 0;
		currentFrame = (cursorAnimation-1)+5;
		cursorAnimation++;	
		frames++;
	}
	if(s_perso.state=="idle"){
		cursorAnimation = 0
		currentFrame = 0;
	}
	s_perso.nextFrame(currentFrame);

}
function render(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	enemies.render();
	s_perso.render();

}


function run(){
	var loop = function(){
		realcontext.clearRect(0, 0, canvas.width, canvas.height);
		realcontext.drawImage(s_canvas,0,0);
		realcontext.beginPath();
		update();
		render();
		realcontext.drawImage(p_canvas,0,0);
		realcontext.beginPath();
		window.requestAnimationFrame(loop,canvas);
	}
	window.requestAnimationFrame(loop,canvas);
}

init();

//AUTRES FONCTIONS
function randInt ( max) {
	return Math.floor(Math.random() * (max + 1));
}