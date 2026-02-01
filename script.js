const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

// ===== MUSIC =====
const music = document.getElementById("bgMusic");
let musicStarted = false;

document.addEventListener("click", () => {
  if (!musicStarted) {
    music.volume = 0.4;

    music.play()
      .then(() => {
        music.currentTime = 37;
        console.log("Music started");
      })
      .catch(err => {
        console.log("Music error:", err);
      });

    musicStarted = true;
  }
});

// ===== RESIZE CANVAS =====
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===== DOTS =====
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

// ===== MESSAGES =====
const messages = [
  "Hey AMU 🤍",
  "I know today feels heavy 🤍",
  "Batao, tumhe utha kar le aau kya?",
  "Kuch khaane ka mann ho raha hai,\nDinkar65 khila du kya? 😄🍫",
  "Netflix, blanket, snacks….bas tum bolo,\nmain arrange kar dunga 🎬🛋️🍿",
  "Aur agar sirf thoda sa rest chahiye,\nsaath baith kar chup-chaap reh lu kya? 🌸",
  "Mood swings aaye toh aane do,\nmain handle kar lunga 🤍",
  "If love could reduce cramps,\nyou’d be pain-free 💕"
];


let msgIndex = 0;
let textAlpha = 0;
let fadeIn = true;

// Change message every 4 seconds
setInterval(() => {
  msgIndex = (msgIndex + 1) % messages.length;
  textAlpha = 0;
  fadeIn = true;
}, 4000);

// ===== DRAW DOTS =====
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

// ===== DRAW TEXT =====
function drawText() {
  const fontSize = window.innerWidth < 600 ? 22 : 28;
  ctx.font = `${fontSize}px Comic Sans MS`;
  ctx.textAlign = "center";
  ctx.fillStyle = `rgba(255,182,193,${textAlpha})`;
  ctx.shadowColor = "#ffb6c1";
  ctx.shadowBlur = 20;

  const lines = messages[msgIndex].split("\n");
  const lineHeight = fontSize + 6;
  const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;

  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      canvas.width / 2,
      startY + i * lineHeight
    );
  });

  if (fadeIn) {
    textAlpha += 0.01;
    if (textAlpha >= 1) fadeIn = false;
  }
}

// ===== ANIMATION LOOP =====
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  drawText();
  requestAnimationFrame(animate);
}

animate();
