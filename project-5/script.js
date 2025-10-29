/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

const numberOfEnemy = 10;
const enemies = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); // generate random number between 1 to 4
    this.angle = 0;
    this.angleSpeed = Math.random() * 2 + 0.5;
    this.curve = Math.random() * 200 + 50;
  }

  update() {
    this.x =
      (CANVAS_WIDTH / 2) * Math.sin(this.angle * (Math.PI / 90)) +
      (CANVAS_WIDTH / 2 - this.width / 2);

    this.y =
      (CANVAS_HEIGHT / 2) * Math.cos(this.angle * (Math.PI / 360)) +
      (CANVAS_HEIGHT / 2 - this.height / 2);

    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

for (let i = 0; i < numberOfEnemy; i++) {
  enemies.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
