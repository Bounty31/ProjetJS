var password;
var id_user;

function testIfExists() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseXML);
        x = xmlhttp.responseXML.getElementsByTagName("login");
        for (i = 0; i < x.length; i++) {
            if (x[i].hasChildNodes()) {
                xx = x[i].getElementsByTagName("password")[0];
                txt = xx.childNodes[0].nodeValue;
                password = txt

                //enregistrement de l'id du joueur
                xx = x[i].getElementsByTagName("iduser")[0];
                txt = xx.childNodes[0].nodeValue;
                id_user = txt;
                setCookie("iduser", id_user);
                document.getElementById('login').style.color = "green";
            }
            else {
                password = "";
                setCookie("connected", false);
                document.getElementById('login').style.color= "red";
            }
        }
    }
}

function validatePseudo() {
    var pseudo = document.getElementById("login").value;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=validation&pseudo=" + pseudo, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = testIfExists;
}

function validatePassword() {

    var passwordDiv = document.getElementById("password").value;
    if (password != "" && passwordDiv == password) {
        connexion();
        document.getElementById("password").style.background = "green";
        document.getElementById("messageConnexion").innerHTML = "Vous êtes connecté en tant que <b style=\"font-size:22px;\"\">"+document.getElementById("login").value+"</b>, des cookies vont etre enregistrés sur votre ordinateur";
        TweenMax.to($('#messageBienvenue'),1,{y:+50});
    }
    else if (getCookie("connected") != "true") {
        setCookie("connected", false);
        document.getElementById("password").style.background = "red";
    }


}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function getCookie(name) {
    var tableauSplit = document.cookie.split('; ');
    for (var i = 0; i < tableauSplit.length; i++) {
        var nCookie = tableauSplit[i].split("=")[0];
        if (nCookie == name) {
            return tableauSplit[i].split("=")[1];
        }
    }

}
function addAchievement(id){
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    x = xmlhttp.responseXML.getElementsByTagName("achievement");
    for (i = 0; i < x.length; i++) {
        if (!(x[i].hasChildNodes())) {
            unlockAchievement(id);
        }
    }
};
}


function isSet(id){
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    x = xmlhttp.responseXML.getElementsByTagName("achievement");
    for (i = 0; i < x.length; i++) {
        if (!(x[i].hasChildNodes())) {
            return true;
        }
    }
    return false;
};
}


function unlock(id){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=achievement&achievement=" + id+"&joueur="+getCookie("iduser"), true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){ addAchievement(id); }
}

function testAchiev(id){
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=achievement&achievement=" + id+"&joueur="+getCookie("iduser"), true);
   xmlhttp.send();
   xmlhttp.onreadystatechange = function(){ isSet(id); }
}
function unlockAchievement(id){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=unlock&achievement=" + id+"&joueur="+getCookie("iduser"), true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
        mAchievements.get(id);
    };
}

function newScore(idjeu, score) {
    xmlhttp = new XMLHttpRequest();
    if (id_user == undefined)
        id_user = 3;
    if (getCookie("iduser") == "1" || getCookie("iduser") == "2") {
        id_user = getCookie("iduser");
    }

    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=score&score=" + score + "&jeu=" + idjeu + "&joueur=" + id_user, true);
    xmlhttp.send();
}

function connexion() {
    if (!(getCookie("connected") == "true")) {

        setCookie("connected", "true");

        setCookie("iduser", id_user);
        //alert("cookie : connected =" + getCookie("connected"));
    }
    else
        alert("Vous êtes déjà connecté")
}


function newAchievement(achievement) {
    xmlhttp = new XMLHttpRequest();
    if (id_user == undefined)
        id_user = 0;
    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=achievement&achievement=" + achievement + "&joueur=" + id_user, true);
    xmlhttp.send();
}

function supprimeCookie(){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=deco");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
     document.location.href = "//localhost/ProjetJS";
 };
}


function displayScores(id){
 xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", "//localhost/ProjetJS/Javascript/fonctions.php?q=getscores&jeu="+id, true);
 xmlhttp.send();
 xmlhttp.onreadystatechange = function(){
    createHtmlScores();
};
}


function createHtmlScores(){
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    table ='<table class="rwd-table" ><tr><th>Classement</th><th>Score</th></tr>';
    x = xmlhttp.responseXML.getElementsByTagName("score");
    for (i = 0; i < x.length; i++) {
        console.log(x[i]);
        if (x[i].hasChildNodes()) {
            xx = x[i].getElementsByTagName("scoret")[0];
            txt = xx.childNodes[0].nodeValue;
            score = txt;

             xx = x[i].getElementsByTagName("classement")[0];
            txt = xx.childNodes[0].nodeValue;
            classement = txt;

            table +='<tr><td>'+classement+'</td><td>'+score+'</td></tr>';
        }
    }
    document.getElementById("scores").innerHTML =table+'</table>';

}
}