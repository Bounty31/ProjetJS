
<html lang="fr">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>test</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="http://localhost/ProjetJS/Javascript/Libraries/JQuery/jquery-2.1.4.min.js"></script>
  <script src="http://localhost/ProjetJS/Javascript/Libraries/JQueryUI/jquery-ui.min.js" type="text/javascript" ></script>




</head>
<body>
  <div class="wrapper">
  <div class="container">
    <h1>Welcome</h1>
    
    <form class="form">
      <input type="text" placeholder="Username">
      <input type="password" placeholder="Password">
      <button type="submit" id="login-button">Login</button>
    </form>
  </div>
  
  <ul class="bg-bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
 <script type="text/javascript">

   $("#login-button").click(function(event){
     event.preventDefault();

     $('form').fadeOut(500);
     $('.wrapper').addClass('form-success');
   });

 </script>
</body>
</html>