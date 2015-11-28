function Replay(snakeGame) {
	var self = this;
	this.snakeGame = snakeGame;

	this.timeline = new TimelineMax({
		onUpdate:function() {self.updateSlider();}, paused: true
	});
}

Replay.prototype.showButtons = function() {
	$("#progressSlider").show();
	$("#playBtn").show();
	$("#pauseBtn").show();
	$("#reverseBtn").show();
}

Replay.prototype.play = function(){
	this.timeline.play();
}

Replay.prototype.addAnimation = function(animation) {
	this.timeline.add(animation);
}
Replay.prototype.getTimeline = function() {
	return this.timeline;
}
Replay.prototype.updateSlider = function() {
	$("#progressSlider").slider("value", this.timeline.progress());
}