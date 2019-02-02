/*
const bodyCanvas = document.getElementById("sky");
const ctx = bodyCanvas.getContext("2d");
bodyCanvas.width = window.innerWidth;
bodyCanvas.height = window.innerHeight;

// CIRCLE
let x = 200;
let y = 0;

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2, false);
  ctx.fillStyle = "white";
  ctx.fill();

  y += 10;
}

animateCircle();
*/
drawing = () => {
  const c = document.getElementById("sky");
  const ctx = c.getContext("2d");
  const xMax = (c.width = window.screen.availWidth);
  const yMax = (c.height = window.screen.availHeight);

  const hmTimes = Math.round(xMax + yMax);

  for (let i = 0; i <= hmTimes; i++) {
    const randomX = Math.floor(Math.random() * xMax + 1);
    const randomY = Math.floor(Math.random() * yMax + 1);
    const randomSize = Math.floor(Math.random() * 2 + 1);
    const randomOpacityOne = Math.floor(Math.random() * 9 + 1);
    const randomOpacityTwo = Math.floor(Math.random() * 9 + 1);
    const randomHue = Math.floor(Math.random() * 360 + 1);
    if (randomSize > 1) {
      ctx.shadowBlur = Math.floor(Math.random() * 15 + 5);
      ctx.shadowColor = "white";
    }
    ctx.fillStyle =
      "hsla(" +
      randomHue +
      ", 30%, 80%, ." +
      randomOpacityOne +
      randomOpacityTwo +
      ")";
    ctx.fillRect(randomX, randomY, randomSize, randomSize);
  }
};
drawing();
