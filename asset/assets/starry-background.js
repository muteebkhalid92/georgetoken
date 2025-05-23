(() => {
  const canvas = document.getElementById('starry-background');
  const ctx = canvas.getContext('2d');

  let width, height;
  let stars = [];
  const numStars = 200;

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 1),
        alphaChange: randomRange(0.002, 0.01),
        direction: Math.random() < 0.5 ? 1 : -1,
        speed: randomRange(0.01, 0.05)
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
      star.alpha += star.alphaChange * star.direction;
      if (star.alpha <= 0.1) {
        star.direction = 1;
      } else if (star.alpha >= 1) {
        star.direction = -1;
      }
      star.x += star.speed;
      if (star.x > width) star.x = 0;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);

  resize();
  draw();
})();
