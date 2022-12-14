let a = 0;
let b = 0;
let keys = [];

keyPressed = function () {
  keys[keyCode] = true;
};

keyReleased = function () {
  keys[keyCode] = false;
};

let Dad = function (x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.xVel = 0;
  this.yVel = 0;
  this.glide = 0.5;
  this.maxGlide = 5;
  this.jump = 9;
  this.gravity = 0.4;
  this.maxGravity = 12;
  this.falling = true;
};

Dad.prototype.collide = function (xvel, yvel, platforms) {
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    if (
      this.x + this.w / 2 > p.x - p.w / 2 &&
      this.x - this.w / 2 < p.x + p.w / 2 &&
      this.y + this.h / 2 > p.y - p.h / 2 &&
      this.y - this.h / 2 < p.y + p.h / 2
    ) {
      if (xvel > 0) {
        this.xVel = 0;
        this.x = p.x - p.w / 2 - this.w / 2;
      }

      if (xvel < 0) {
        this.xVel = 0;
        this.x = p.x + p.w / 2 + this.w / 2;
      }

      if (yvel > 0) {
        this.yVel = 0;
        this.falling = false;
        this.y = p.y - p.h / 2 - this.h / 2;
      }

      if (yvel < 0) {
        this.yVel = 0;
        this.falling = true;
        this.y = p.y + p.h / 2 + this.h / 2;
      }
    }
  }
};

Dad.prototype.update = function (platforms) {
  if (keys[37]) {
    this.xVel -= 0.5;
  } else if (keys[65]) {
    this.xVel -= 0.5;
  }

  if (keys[39]) {
    this.xVel += 0.5;
  } else if (keys[68]) {
    this.xVel += 0.5;
  }

  if (!keys[37] && !keys[65] && this.xVel < 0) {
    this.xVel += this.glide;
  } else if (!keys[39] && !keys[68] && this.xVel > 0) {
    this.xVel -= this.glide;
  }

  if (keys[38] && !this.falling) {
    this.yVel -= this.jump;
  } else if (keys[87] && !this.falling) {
    this.yVel -= this.jump;
  }

  this.falling = true;

  if (this.xVel > this.maxGlide) {
    this.xVel = this.maxGlide;
  } else if (this.xVel < -this.maxGlide) {
    this.xVel = -this.maxGlide;
  }

  if (this.yVel > this.maxGravity) {
    this.yVel = this.maxGravity;
  }

  this.x += this.xVel;

  this.collide(this.xVel, 0, platforms);

  this.y += this.yVel;

  this.collide(0, this.yVel, platforms);

  this.yVel += this.gravity;

  if (this.xVel < 0) {
    a = this.w / 6;
  }
  if (this.xVel > 0) {
    a = -this.w / 6;
  }
  if (this.xVel === 0) {
    a = 0;
  }
  if (this.falling === true) {
    b = this.h / 1.75;
  } else {
    b = 0;
  }
};

Dad.prototype.draw = function () {
  noStroke();

  fill(220, 170, 152);

  quad(
    this.x - this.w / 4,
    this.y - this.h / 6,
    this.x - this.w / 4 + this.w / 4 - this.w / 22.4,
    this.y - this.h / 6,
    this.x - this.w / 2 + this.w / 4 - this.w / 22.4,
    this.y + this.h / 10 - b,
    this.x - this.w / 2,
    this.y + this.h / 10 - b
  );

  quad(
    this.x - this.w / 4 + this.w / 2 - this.w / 4 + this.w / 22.4,
    this.y - this.h / 6,
    this.x - this.w / 4 + this.w / 2,
    this.y - this.h / 6,
    this.x + this.w / 2,
    this.y + this.h / 10 - b,
    this.x + this.w / 2 - this.w / 4 + this.w / 22.4,
    this.y + this.h / 10 - b
  );

  fill(0, 0, 170);

  quad(
    this.x - this.w / 4,
    this.y - this.h / 6,
    this.x - this.w / 4 + this.w / 4 - this.w / 22.4,
    this.y - this.h / 6,
    (this.x -
      this.w / 4 +
      this.w / 4 -
      this.w / 22.4 +
      (this.x - this.w / 2 + this.w / 4 - this.w / 22.4)) /
      2,
    (this.y - this.h / 6 + (this.y + this.h / 10)) / 2 - b / 2,
    (this.x - this.w / 2 + (this.x - this.w / 4)) / 2,
    (this.y + this.h / 10 + (this.y - this.h / 6)) / 2 - b / 2
  );

  quad(
    this.x - this.w / 4 + this.w / 2 - this.w / 4 + this.w / 22.4,
    this.y - this.h / 6,
    this.x - this.w / 4 + this.w / 2,
    this.y - this.h / 6,
    (this.x + this.w / 2 + (this.x - this.w / 4 + this.w / 2)) / 2,
    (this.y + this.h / 10 + (this.y - this.h / 6)) / 2 - b / 2,
    (this.x +
      this.w / 2 -
      this.w / 4 +
      this.w / 22.4 +
      (this.x - this.w / 4 + this.w / 2 - this.w / 4 + this.w / 22.4)) /
      2,
    (this.y + this.h / 10 + (this.y - this.h / 6)) / 2 - b / 2
  );
  fill(255, 255, 255);
  fill(21, 96, 189);
  quad(
    this.x - this.w / 4,
    this.y + this.h / 5,
    this.x - this.w / 4 + this.w / 4 - this.w / 22.4,
    this.y + this.h / 5,
    this.x - this.w / 4 + this.w / 4 - this.w / 22.4 + a,
    this.y + this.h / 2,
    this.x - this.w / 4 + a,
    this.y + this.h / 2
  );

  quad(
    this.x - this.w / 4 + this.w / 2 - this.w / 4 + this.w / 22.4,
    this.y + this.h / 5,
    this.x - this.w / 4 + this.w / 2,
    this.y + this.h / 5,
    this.x - this.w / 4 + this.w / 2 + a,
    this.y + this.h / 2,
    this.x - this.w / 4 + this.w / 2 - this.w / 4 + this.w / 22.4 + a,
    this.y + this.h / 2
  );
  fill(0, 0, 170);
  rect(this.x, this.y, this.w / 2, this.h / 2.5);
  fill(232, 190, 172);
  rect(this.x, this.y - this.h / 3, this.w / 1.5, this.h / 3);
  fill(0, 0, 0);
  rect(this.x, this.y - this.h / 2.25, this.w / 1.5, this.h / 9);
  fill(232, 190, 172);
  rect(this.x, this.y - this.h / 2.5, this.w / 1.75, this.h / 18);
  rect(
    this.x,
    this.y - this.h / 2.5 + this.h / 4.5,
    this.w / 1.75,
    this.h / 18
  );

  stroke(0, 0, 0);
  strokeWeight(this.w / 20);
  point(this.x - this.w / 5, this.y - this.h / 3.5);
  point(this.x + this.w / 5, this.y - this.h / 3.5);
  noStroke();
};

let dad = new Dad(250, 250, 150, 250, 255);

let Platform = function (x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Platform.prototype.draw = function () {
  fill(37.5, 37.5, 37.5);
  rectMode(CENTER);
  rect(this.x, this.y, this.w, this.h, 5);
};

let platforms = [];

platforms.add = function (x, y, w, h) {
  platforms.push(new Platform(x, y, w, h));
};

platforms.draw = function () {
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
};

platforms.add(0, 300, 22.5, 600);

platforms.add(600, 300, 22.5, 600);

platforms.add(300, 0, 600, 22.5);

platforms.add(300, 600, 600, 22.5);

function draw() {
  createCanvas(window.innerWidth - 10, window.innerHeight - 10);

  background(0, 175, 25);

  dad.draw();

  dad.update(platforms);

  platforms.draw();
}
