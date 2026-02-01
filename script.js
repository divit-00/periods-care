const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Soft floating dots
const dots = [];
for (let i = 0; i < 120; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    a: Math.random(),
    s: Math.random() * 0.3 + 0.1
  });
}

// Comforting messages
const messages = [
  "Hey love 🤍",
  "I know today feels heavy",
  "Your body is doing its best",
  "You don’t need to be strong right now",
  "Rest… I’m right here 🌸"
];

let currentMessage = 0;
let alpha = 0;

// Change message every 3 seconds
setInterval(() => {
  if (currentMessage < messages.length - 1) {
    currentMessage++;
    alpha = 0;
  }
}, 3000);

// Draw dots
function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let d of dots) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${d.a})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

    d.a += d.s * 0.01;
    if (d.a > 1 || d.a < 0.2) d.s *= -1;
  }
}

// Draw text
function drawText() {
  ctx.font = "28px Comic Sans MS";
  ctx.textAlign = "center";
  ctx.fillStyle = `rgba(255,182,193,${alpha})`;
  ctx.shadowColor = "#ffb6c1";
  ctx.shadowBlur = 20;

  ctx.fillText(
    messages[currentMessage],
    canvas.width / 2,
    canvas.height / 2
  );

  if (alpha < 1) alpha += 0.01;
}

// Animation loop
function animate() {
  drawDots();
  drawText();
  requestAnimationFrame(animate);
}

animate();
