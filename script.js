const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Floating dots
const dots = [];
const DOT_COUNT = 120;

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    a: Math.random() * 0.8 + 0.2,
    fade: Math.random() * 0.005 + 0.002,
    speed: Math.random() * 0.2 + 0.05
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
    // Move dot DOWN slowly
    d.y += d.speed;

    // Reset to top when it goes off screen
    if (d.y > canvas.height) {
      d.y = -10;
      d.x = Math.random() * canvas.width;
    }

    // Fade in/out
    d.a += d.fade;
    if (d.a > 1 || d.a < 0.2) d.fade *= -1;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${d.a})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
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
  d

