	var password;
	function testIfExists (){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			x=xmlhttp.responseXML.getElementsByTagName ("login");
			for (i=0;i<x.length;i++){
				if(x[i].hasChildNodes()){
					password = x[i].getElementsByTagName("password")[0].nodeValue;
					xx=x[i].getElementsByTagName("password")[0];
					txt=xx.childNodes[0].nodeValue;
					password = txt
					document.getElementById('validationPseudo').innerHTML = "Existe";
				}
				else{
					password = "";
					setCookie("connected",false);
					document.getElementById('validationPseudo').innerHTML = "N'éxiste pas";
				}
			}
		}
	}

	function validatePseudo(){
		var pseudo = document.getElementById("login").value;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","Javascript/fonctions.php?q=validation&pseudo="+pseudo,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = testIfExists;
	}

	function validatePassword(){
		var passwordDiv = document.getElementById("password").value;
		if(password!="" && passwordDiv == password ){
			connexion();
		}
		else{
			setCookie("connected",false);
			alert("cookie : connected = "+getCookie("connected"));

		}
	}

	function setCookie(name,value) {
		document.cookie = name + "=" + value;
	}

	function getCookie(name) {
		var tableauSplit = document.cookie.split(';');
		for(var i=0; i<tableauSplit.length; i++) {
			var nCookie = tableauSplit[i].split("=")[0];
			if(nCookie==name){
				return tableauSplit[i].split("=")[1];
			}
		}

	}
	function connexion(){
		setCookie("connected",true);
		alert("cookie : connected = "+getCookie("connected"));
	}
