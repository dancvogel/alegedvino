function Shape() {
    this.color = "rgba(" + Math.floor(Math.random() * 255) +
     ", " + Math.floor(Math.random() * 255) + "," + 
     Math.floor(Math.random() * 255) + ", 0.5)";
}

function Circle(x, y) {
    Shape.call(this);
    
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2;
    this.maxRadius= Math.random() * canvas.width / 2;
    this.inc = 1;    
}   
Circle.prototype = Object.create(Shape.prototype); 
Circle.prototype.update = function() {
    this.radius += this.inc;
    
    if(this.radius > this.maxRadius){
        this.inc = -3;
    }
    else if( this.radius < 5){
        this.inc = 1;
        if(this.radius < 0){
            this.radius = Math.random() * 2;
        }
    }
};
Circle.prototype.draw = function(context) {
    context.beginPath();
    context.fillStyle = this.color;
    
    context.arc(this.x,this.y,this.radius,0,2*Math.PI);
    
    context.fill();
    context.closePath();
};

function Blob(x, y){
    Shape.call(this);
    this.pts = [{x: x, y: y}];    
}
Blob.prototype = Object.create(Shape.prototype); 
Blob.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    
    context.moveTo(this.pts[0].x, this.pts[0].y); 
    for (var i = 1; i < this.pts.length - 2; i++) {
        var c = (this.pts[i].x + this.pts[i + 1].x) / 2;
        var d = (this.pts[i].y + this.pts[i + 1].y) / 2;
 
        context.quadraticCurveTo(this.pts[i].x, this.pts[i].y, c, d);
    }
     
    context.fill();
    context.closePath();
};
Blob.prototype.update = function(){
   var pointsToMove = Math.floor(Math.random() * this.pts.length);
   for(var i = 0; i < pointsToMove; i++){
      var pointIndex = Math.floor(Math.random() * this.pts.length);
      this.pts[pointIndex].x += Math.random() * 10 - 5;
      this.pts[pointIndex].y += Math.random() * 10 - 5;
   }
};
Blob.prototype.addPoint = function(x, y){
    this.pts.push({x: x, y: y});
};