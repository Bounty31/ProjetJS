<?php include('../menu.html'); ?>
<div class="boxContainer">
	
</div>
</body>
<script type="text/javascript">

	$.getJSON("http://localhost/ProjetJS/Achievements/achievements.json").done(function(json) {
		self.achievements_list = json.achievements;
		for (var i = json.achievements.length - 1; i >= 0; i--) {
			var style = "";
			document.getElementsByClassName('boxContainer')[0].innerHTML += '<div '+style+'class="boxAchievement"><i class="'+json.achievements[i]['icon']+'"></i><p>'+json.achievements[i]['name']+'</p></div>';
		};
	});
</script>
</html> 