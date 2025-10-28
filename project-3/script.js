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
    this.image.src = "enemy1.png";
    this.speed = Math.random() * 4 - 2; // generate random number between -2 -- 2
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 4 + 1); // generate random number between 1 to 4
  }

  update() {
    this.x += Math.random() * 15 - 7.5;
    this.y += Math.random() * 10 - 5;
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
