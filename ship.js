function Ship(pos, controllable) {
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;

  if (pos) {
    this.pos = createVector(width * (30 - pos) / 30, height / 10);
    rotate(this.heading + PI / 2);
    this.r = 15;
  } else {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    if (!pos) {
      rotate(this.heading + PI / 2);
    }
    
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }
  
  if(controllable){
    this.boosting = function(b) {
      this.isBoosting = b;
    }
  
    this.update = function() {
      if (this.isBoosting) {
        this.boost();
      }
      this.pos.add(this.vel);
      this.vel.mult(0.985);
    }
  
    this.boost = function() {
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(0.2)
      this.vel.add(force);
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            this.pos = createVector(width / 2, height / 2);
            return true;
        } else {
            return false;
        }
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
  
    this.setRotation = function(a){
      this.rotation = a;
    }
    
    this.turn = function(rotation) {
      this.heading += this.rotation;
    }
  }
}
    