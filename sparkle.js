(() => {
  const canvas = document.getElementById("bgSparkle");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w = (canvas.width = innerWidth);
  let h = (canvas.height = innerHeight);
  const particles = [];
  const density = Math.round((w * h) / 120000);

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }

  function createParticles() {
    const count = Math.max(40, density);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 2.3),
        a: rand(0.12, 0.9),
        vy: rand(-0.12, -0.6),
        life: rand(80, 300),
      });
    }
  }

  function updateParticles() {
    for (const p of particles) {
      p.y += p.vy;
      p.life -= 0.4;
      if (p.life < 0 || p.y < -10) {
        p.x = Math.random() * w;
        p.y = h + 10;
        p.life = rand(80, 300);
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(107,86,67,${p.a * Math.max(0.1, p.life / 300)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  createParticles();
  animate();
})();
