var key_left = false;
var key_right = false;
var key_down = false;
var key_up = false;
var key_space = false;


window.addEventListener('keydown', handleKeyDown, true);
window.addEventListener('keyup', handleKeyUp, true);

function handleKeyDown(event)
{
	if (event.keyCode == 37) 
		key_left = true;
	else if (event.keyCode == 39)
		key_right = true;
	else if (event.keyCode == 38) 
		key_up = true;
	else if (event.keyCode == 40)
		key_down = true;
	else if (event.keyCode == 32)
		key_space = true;
}

function handleKeyUp(event)
{
	if (event.keyCode == 37) 
		key_left = false;
	else if (event.keyCode == 39)
		key_right = false;
	else if (event.keyCode == 38) 
		key_up = false;
	else if (event.keyCode == 40)
		key_down = false;
	else if (event.keyCode == 32)
		key_space = false;
}