function Links(txt, url) {
    this.txt = txt;
    this.url = url;
    this.r = 10;
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    
    this.update = function() {
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        textSize(40);
        fill(255);
        translate(this.pos.x, this.pos.y);
        textFont(loadFont('Hyperspace.ttf'));
        textAlign(CENTER);
        text(txt, this.pos.x, this.pos.y);
        pop();
    }

    this.edges = function() {
        if (this.pos.x > width) {
            this.pos.x = 0; 
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
    
        if (this.pos.y > height) {
            this.pos.y = 0; 
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    this.hits = function(laser) {
        var d = dist(this.pos.x, this.pos.y, laser.pos.x, laser.pos.y);
        if (d < this.r){
            return true;
        } return false;
    }
}