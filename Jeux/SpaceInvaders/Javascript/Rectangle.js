function Rectangle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.p1 = new Point(x,y);
	this.p2 = new Point(x,y+height);
	this.p3 = new Point(x+width,y+height);
	this.p4 = new Point(x+width,y);
}

Rectangle.prototype.contains = function(pt) {
	if(pt.x<=this.x+this.width &&pt.x>=this.x && pt.y<=this.y+this.height &&pt.y>=this.y) 
		return true;                                               
	return false;	
}
Rectangle.prototype.checkCollision= function(r) {
	if(this.contains(r.p1) || this.contains(r.p2) || this.contains(r.p3) || this.contains(r.p4))
		return true;
	return false;
}