var key_names = ["s_right", "s_right"];

$(document).keydown(function(e) {
	var key = e.which;

	for (var i = 0; i < key_names.length; i++) {
		if (i == 0) {
			var left = "37", up = "38", right = "39", down = "40";
		}
		else if (i == 1) {
			var left = "81", up = "90", right = "68", down = "83";
		}
		if (key == left) { // Left
			if (key_names[i] != "s_right") {
				key_names[i] = "s_left";
			}
			else if (key_names[i] == "s_right") {
				key_names[i] = "s_right";
			}
			else {
				key_names[i] = "left";
			}
		}
		else if (key == up) { // Up
			if (key_names[i] != "s_down") {
				key_names[i] = "s_up";
			}
			else if (key_names[i] == "s_down") {
				key_names[i] = "s_down";
			}
			else {
				key_names[i] = "up";
			}
		}
		else if (key == right) { // Right
			if (key_names[i] != "s_left") {
				key_names[i] = "s_right";
			}
			else if (key_names[i] == "s_left") {
				key_names[i] = "s_left";
			}
			else {
				key_names[i] = "right";
			}
		}
		else if (key == down) { // Down
			if (key_names[i] != "s_up") {
				key_names[i] = "s_down";
			}
			else if (key_names[i] == "s_up") {
				key_names[i] = "s_up";
			}
			else {
				key_names[i] = "down";
			}
		}
	}
})