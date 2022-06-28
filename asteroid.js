function Asteroid(pos, r, lvl, url) {

    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(width), random(height));
    }

    if (r) {
        this.r = r / 2;
    } else {
        this.r = random(15, 50);
    }

    if(lvl) {
        this.vel = p5.Vector.random2D().mult(lvl);
    } else {
        this.vel = p5.Vector.random2D();
    }

    this.total = floor(random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.total; i++){
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5)
    }
    
    this.update = function() {
        this.pos.add(this.vel);
    }

    this.breakup = function(lvl){
        var newA = [];
        console.log(lvl);
        newA[0] = new Asteroid(this.pos, this.r, lvl);
        newA[1] = new Asteroid(this.pos, this.r, lvl);
        return newA;
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
          this.pos.x = -this.r; 
        } else if (this.pos.x < -this.r) {
          this.pos.x = width + this.r;
        }
    
        if (this.pos.y > height + this.r) {
          this.pos.y = -this.r; 
        } else if (this.pos.y < -this.r) {
          this.pos.y = height + this.r;
        }
    }

    this.render = function() {
        if(!url){
            push();
            stroke(255);
            noFill();
            translate(this.pos.x, this.pos.y); 
            beginShape();
            for (var i = 0; i < this.total; i++){
                var angle = map(i, 0, this.total, 0, TWO_PI);
                var r = this.r + this.offset[i];
                var x = r * cos(angle);
                var y = r * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);
            
            pop();
        }
    }
}