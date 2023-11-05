"use strict";

const canvas = document.querySelector("#myCanvas");
const c = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const ballRadius = 10;

//paddle properties
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// brick property

const brickRowCount = 1;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 3;

const bricks = [];
for (let col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[col][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[col][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert(`YOU WIN, CONGRATULATIONS! your score is: ${score}`);
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI * 2);
  c.fillStyle = "#0095DD";
  c.fill();
  c.closePath();
}

function drawPaddle() {
  c.beginPath();
  c.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  c.fillStyle = "#0095DD";
  c.fill();
  c.closePath();
}

function drawBricks() {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[col][r].status === 1) {
        const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[col][r].x = brickX;
        bricks[col][r].y = brickY;
        c.beginPath();
        c.rect(brickX, brickY, brickWidth, brickHeight);
        c.fillStyle = "#0095DD";
        c.fill();
        c.closePath();
      }
    }
  }
}
function drawScore() {
  c.font = "16px Arial";
  c.fillStyle = "#0095DD";
  c.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  c.font = "16px Arial";
  c.fillStyle = "#0095DD";
  c.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
draw();

/*c.beginPath();
c.rect(20, 40, 50, 100);
c.fillStyle = "red";
c.fill();
c.closepath();
*/

/*c.beginPath();
c.arc(240, 160, 20, 0, Math.PI * 2, false);
c.fillStyle = "green";
c.fill();
c.closePath();
*/

/*c.beginPath();
c.rect(160, 10, 100, 40);
c.strokeStyle = "rgba(0,0,255,0.5)";
c.stroke();
c.fillStyle = "red";
c.fill();
c.closepath();
*/

//console.log(canvas);
