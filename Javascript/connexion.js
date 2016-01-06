var password;
var id_user;
function testIfExists() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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

                document.getElementById('validationPseudo').innerHTML = "Existe";
            }
            else {
                password = "";
                setCookie("connected", false);
                document.getElementById('validationPseudo').innerHTML = "N'éxiste pas";
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
    }
    else if (getCookie("connected") != "true") {
        setCookie("connected", false);
        alert("cookie : connected = " + getCookie("connected"));
    }


}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function getCookie(name) {
    var tableauSplit = document.cookie.split(';');
    for (var i = 0; i < tableauSplit.length; i++) {
        var nCookie = tableauSplit[i].split("=")[0];
        if (nCookie == name) {
            return tableauSplit[i].split("=")[1];
        }
    }

}

function newScore(idjeu, score) {
    xmlhttp = new XMLHttpRequest();
    if (id_user == undefined)
        id_user = 0;
    xmlhttp.open("GET", "../../Javascript/fonctions.php?q=score&score=" + score + "&jeu=" + idjeu + "&joueur=" + id_user, true);
    xmlhttp.send();
}

function connexion() {
    if (!(getCookie("connected") == "true")) {

        setCookie("connected", "true");

        setCookie("iduser", id_user);
        alert(id_user);
        alert("cookie : connected =" + getCookie("connected"));
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
