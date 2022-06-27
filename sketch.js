var ship;
var minAsteroids = 3;
var asteroids = [];
var lasers = [];
var level = 1;
var lvlMult = 1 + 0.1 * level;

const TEXT_SIZE = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newGame();
}

function newGame() {
  ship = new Ship();
  newLevel();
}

function newLevel() {
  var text = "Level " + level;
  lvlMult = 1 + 0.1 * level;
  createAsteroids(lvlMult);
}

function createAsteroids(lvlMult){
  for (var i = 0; i < minAsteroids + level; i++){
    console.log(lvlMult);
    asteroids.push(new Asteroid(0, 0, lvlMult));
  }
}

function draw() {
  background(0);

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])){
      console.log("xd");
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offScreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--){
        if(lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 20) {
            var newAsteroids = asteroids[j].breakup(lvlMult);
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);

          if(asteroids.length == 0) {
            level++;
            newLevel();
          }
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  if (keyIsDown(RIGHT_ARROW)) ship.setRotation(0.1);
  if (keyIsDown(LEFT_ARROW)) ship.setRotation(-0.1);
  if (keyIsDown(UP_ARROW)) ship.boosting(true);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  }
}

