"use strict";

const canvas = document.querySelector("#myCanvas");
const c = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const ballRadius = 10;

function drawBall() {
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI * 2);
  c.fillStyle = "#0095DD";
  c.fill();
  c.closePath();
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
}
setInterval(draw, 10);

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
