

resize();

function resize(){
// menu
var menu = document.getElementById("menuBar");
var mWidth = menu.offsetWidth;
var mHeight = menu.offsetHeight;


// cercle milieu
var c2 = document.getElementById("rond2");
// cercle droite et gauche
var c1 = document.getElementById("rond1");
var c3 = document.getElementById("rond3");
//cercle connexion
var c4 = document.getElementById("butConnexion");

//style rond milieu
c2.style.width = mWidth/4+"px";
c2.style.height = mWidth/4+"px";
c2.style.backgroundColor = "white";
c2.style.position = "absolute";
c2.style.left = (mWidth/2 - mWidth/8) + "px";
c2.style.top =(mHeight - mWidth/8) + "px";

//style rond connexion
c4.style.width = mWidth/16+"px";
c4.style.height = mWidth/16+"px";
c4.style.position = "absolute";
c4.style.left = (mWidth/2 - mWidth/32) + "px";
c4.style.top =(mHeight + mWidth/8) + "px";


//style rond  gauche
c1.style.width = mWidth/8+"px";
c1.style.height = mWidth/8+"px";
c1.style.backgroundColor = "white";
c1.style.position = "absolute";
c1.style.left = (mWidth/6 - mWidth/16) + "px";
c1.style.top =(mHeight - mWidth/16) + "px";

//style rond droite
c3.style.width = mWidth/8+"px";
c3.style.height = mWidth/8+"px";
c3.style.backgroundColor = "white";
c3.style.position = "absolute";
c3.style.left = (5*mWidth/6 - mWidth/16) + "px";
c3.style.top =(mHeight - mWidth/16) + "px";
}

function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while(element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return { x: xPosition, y: yPosition };
}
window.onresize = function(){
	resize();}

function setConnexionPan () {
	document.getElementById("mainLogo").style.display = "none";
	document.getElementById("connexionPan").style.display = "block";
	var connexionPan = document.getElementById("rond2");
}