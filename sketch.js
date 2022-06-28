var ship;
var minAsteroids = 3;
var asteroids = [];
var lasers = [];
var linkAsteroids = [];
var livesVisual = [];
var level = 1;
var lvlMult = 1 + 0.1 * level;
var font;
var disableButton;
var retryButton;
var lives;
var gameDisabled = false;
var gameOver = false;

const GAME_LIVES = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  disableButton = createButton('Disable Game');
  disableButton.position(windowWidth / 30, windowHeight / 30);
  disableButton.mousePressed(disableGame);
  retryButton = createButton('Retry');
  retryButton.hide();
  ship = new Ship(0, true);
  linkAsteroids.push(new Links('Github', 'https://github.com/KKeySimon'));
  newGame();
}

function preload() {
  font = loadFont('Hyperspace.ttf');
}

function newGame() {
  lives = GAME_LIVES;
  newLevel();
}

function newLevel() {
  lvlMult = 1 + 0.1 * level;
  createAsteroids(lvlMult);
  createLives(lives);
}

function disableGame() {
  gameDisabled = true;
}

function retry() {
  retryButton.hide();
  gameOver = false;
  gameDisabled = false;
  for (var i = asteroids.length - 1; i >= 0; i--) {
    asteroids.splice(i, 1);
  }

  newGame();
  
}

function createAsteroids(lvlMult){
  for (var i = 0; i < minAsteroids + level; i++){
    asteroids.push(new Asteroid(0, 0, lvlMult));
  }
}

function createLives(lives){
  for (var i = 1; i <= lives; i++){
    livesVisual.push(new Ship(i, false));
  }
}

function draw() {
  background(0);
  if (gameOver) {
    retryButton.show();
    retryButton.position(windowWidth / 2, windowHeight / 2);
    retryButton.mousePressed(retry);
  }
  if (!gameDisabled) {
    retryButton.hide();
    textSize(25);
    fill(255);
    textAlign(CENTER);
    text("Lvl:" + level, windowWidth * 14 / 15, windowHeight / 15);

    for (var i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])){
        livesVisual.splice(lives - 1, 1);
        lives -= 1;
        if(lives == 0){
          gameOver = true;
          gameDisabled = true;
        }
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }

    for (var i = 0; i < livesVisual.length; i++){
      livesVisual[i].render();
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
        for(var j = linkAsteroids - 1; j >= 0; j--){
          if (linkAsteroids[j].hits(lasers[i])) {
            window.open(linkAsteroids[j].url);
          }
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

  //Name
  push();
  textSize(40);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  text("Simon KYE", windowWidth / 2, windowHeight / 15);
  pop();

  for (var i = 0; i < linkAsteroids.length; i++){
    linkAsteroids[i].render();
    linkAsteroids[i].update();
    linkAsteroids[i].edges();
  }
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

