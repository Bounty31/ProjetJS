/*achievement  = document.getElementById("achievement");
console.log(achievement);*/
"use strict";
class Achievements {
    constructor() {
        $.getJSON("../Achievements/achievements.json", function(json) {
			this.achievements = json;
			//regarde là on est dans le callback/success, j'attribue json à this.achievements
			//et là, j'log json, tout en étant dans le success, ce qui va fonctionner
			console.log("On est dans le sucess, je log le json");
			console.log(json);
		});;
    }
}

function RiseAchievementViaButton() {
//	TweenMax.fromTo(achievement,0.4,{y:0},{y:-65});
var achiev = new Achievements();
console.log("On est apres le success dans le code, j'log le json");
console.log(achiev.achievements);
};
// à noter, regarde le log pour comprendre, ce qui est dans success se fait apres