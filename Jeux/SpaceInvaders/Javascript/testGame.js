
//var initialisation
var width = 900;
var height = 900;
var game = new Game(900,900);
game.run();


/****UTILS FUNCTIONS *****/
function displayunicode(e){
	var unicode=e.keyCode? e.keyCode : e.charCode;
	key_pressed = unicode;
	
}
function randInt ( max) {
	return Math.floor(Math.random() * (max + 1));
}