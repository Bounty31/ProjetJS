<?php
if(isset($_GET['q']))
	choixFonction($_GET['q']);

function connexionBDD(){
	$link = mysqli_connect("localhost",'root','',"bddjs");
	return $link;
}

//choix de l'action
function choixFonction($query){
	if($query=="undefined")
		return;
	if($query=="validation")
		validation();	
}

function validation(){
	$pseudo = $_GET["pseudo"];
	XMLValidatePseudo($pseudo);
}

function XMLValidatePseudo($pseudo){

//connexion à la base de données
	$con = connexionBDD();
//Lancer la requête
	$result = mysqli_query($con, "SELECT *  FROM user where login_user=\"".$pseudo.'"');
// créer un nouveau document XML
	$doc = new DomDocument('1.0');
// créer la racine «Articles» et l'ajouter au document XML
	$root = $doc->createElement('logins');
	$root = $doc->appendChild($root);

/* Pour chaque nom d'article, créer un élément XML «Article» et ajouter
 le à la racine «Articles» puis un élément texte qui contient le nom 
 de l'article et ajouter le à l'article*/
 $xml = new SimpleXMLElement('<xml/>');
 $login = $xml->addChild('login');

 while($row = mysqli_fetch_array($result)){
 	$login->addChild('password', $row['password_user']);
 }

 $xml_string = $doc->saveXML();
 Header('Content-type: text/xml');
 print($xml->asXML());
 mysqli_close($con);


}

function XMLValidatePassword($pseudo,$password){

//connexion à la base de données
	$con = connexionBDD();
//Lancer la requête
	$result = mysqli_query($con, "SELECT *  FROM user where login_user=\"".$pseudo.'"');
// créer un nouveau document XML
	$doc = new DomDocument('1.0');
// créer la racine «Articles» et l'ajouter au document XML
	$root = $doc->createElement('logins');
	$root = $doc->appendChild($root);

/* Pour chaque nom d'article, créer un élément XML «Article» et ajouter
 le à la racine «Articles» puis un élément texte qui contient le nom 
 de l'article et ajouter le à l'article*/
 $xml = new SimpleXMLElement('<xml/>');
 $login = $xml->addChild('login');

 while($row = mysqli_fetch_array($result)){
 	$login->addChild('password', $row['password_user']);
 }

 $xml_string = $doc->saveXML();
 Header('Content-type: text/xml');
 print($xml->asXML());
 mysqli_close($con);


}



?>  

