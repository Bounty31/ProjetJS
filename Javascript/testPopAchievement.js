function Achievements() {
    this.achiev_liste = null;
    var self = this;
    $.getJSON("../Achievements/achievements.json", function(json) {
        self.achiev_liste = json;
        test = json;
        //regarde là on est dans le callback/success, j'attribue json à this.achievements
        //et là, j'log json, tout en étant dans le success, ce qui va fonctionner
        console.log("On est dans le sucess, je log le json");
        console.log(json);
    });;
}

//"use strict";
//class Achievements {
//    constructor() {
//        $.getJSON("../Achievements/achievements.json", function(json) {
//			this.achievements = json;
//			//regarde là on est dans le callback/success, j'attribue json à this.achievements
//			//et là, j'log json, tout en étant dans le success, ce qui va fonctionner
//			console.log("On est dans le sucess, je log le json");
//			console.log(json);
//		});;
//    }
//}

function RiseAchievementViaButton() {
	//	TweenMax.fromTo(achievement,0.4,{y:0},{y:-65});
	console.log(achiev.achiev_liste);
}

var achiev = new Achievements();