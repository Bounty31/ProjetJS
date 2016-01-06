// Classe Achievements : 
//Permet de récuperer la liste des achievements depuis un fichier json.
/* description d'un achievement en json : 
-id
-description
-icon (nom de class representant l'icone dans fontAwesome)
*/

function Achievements() { 
    var self = this;
    this.div = document.getElementById("achievement");
    this.text = document.getElementById("textAchievement");
    this.icon = document.getElementById("iconAchievement");
    //à revoir pour la gestion des chemins
    $.getJSON("http://localhost/ProjetJS/Achievements/achievements.json").done(function(json) {
        self.achievements_list = json.achievements;
        console.log(json.achievements);
    });
};

//Recupere l'achievement correspondant dans le tableau json
Achievements.prototype.get = function(index, temps) {
    this.currentAchievement = this.achievements_list[index];
    this.text.innerHTML = this.currentAchievement["name"];
    this.icon.className = this.currentAchievement["icon"];
    this.rise(temps);
};

//Animation du cadre achievement
Achievements.prototype.rise = function(temps) {
    var self = this;
    TweenMax.fromTo(self.div,0.85,{y:0},{y:-65,ease:Elastic.easeOut.config(1, 0.6)});
    setTimeout(function(){
        TweenMax.fromTo(self.div,0.9,{y:-65},{y:0,ease:Elastic.easeIn.config(1, 1)})
    }, temps);
    //idée : faire un overshoot lors de l'apparition, ensuite même chose pour disparaitre
};

//****************à supprimer lors de l'implementation des achievements***************
//Fonction test lancé lorsque l'on appuie sur le bouton Achivement en remplissant 
//l'input correspondant
function RiseAchievementViaButton(temps) {
    var index = document.getElementById("inputTestIndex").value;
    mAchievements.get(index, temps);
}
// à declarer en tout debut de document
var mAchievements = new Achievements();
