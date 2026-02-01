const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

/* ===== MUSIC CODE START ===== */
const music = document.getElementById("bgMusic");
let musicStarted = false;

document.addEventListener("click", () => {
  if (!musicStarted) {
    music.volume = 0.4;

    music.play().then(() => {
      music.currentTime = 37; // start from 37s AFTER play
    }).catch(err => {
      console.log("Music error:", err);
    });

    musicStarted = true;
  }
});



// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Dots
const dots = [];
const DOTS_COUNT = 120;

for (let i = 0; i < DOTS_COUNT; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    a: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.2 + 0.05
  });
}

// Messages (period care)
const messages = [
  "Hey AMU 🤍.",
  "I know today feels heavy.",
  "You are also strong enough.",
  "your body is working hard....Rest.",
  "you should rest.",
  "If you need anything or...",
  " or wan to talk don't forget",
  "I’m right here with you🌸."
];

let msgIndex = 0;
let textAlpha = 0;

// Change message every 3 seconds
setInterval(() => {
  if (msgIndex < messages.length - 1) {
    msgIndex++;
    textAlpha = 0;
  }
}, 3000);

// Draw dots
function drawDots() {
  for (let d of dots) {
    d.y += d.speed;
    if (d.y > canvas.height) {
      d.y = -10;
      d.x = Math.random() * canvas.width;
    }

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
  ctx.fillStyle = `rgba(255,182,193,${textAlpha})`;
  ctx.shadowColor = "#ffb6c1";
  ctx.shadowBlur = 20;

  ctx.fillText(
    messages[msgIndex],
    canvas.width / 2,
    canvas.height / 2
  );

  if (textAlpha < 1) textAlpha += 0.01;
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  drawText();
  requestAnimationFrame(animate);
}

animate();


