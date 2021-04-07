class Particle {
  constructor({ x, y, dx, dy, radius, $canvas, ctx }) {
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
    this._radius = radius;
    this._$canvas = $canvas;
    this._ctx = ctx;

    this.animate = this.animate.bind(this);
  }

  get dx() {
    if (
      this._x + this._radius > this._$canvas.height ||
      this._x - this._radius < 0
    ) {
      this._dx *= -1;
    }
    return this._dx;
  }

  get dy() {
    if (
      this._y + this._radius > this._$canvas.height ||
      this._y - this._radius < 0
    ) {
      this._dy *= -1;
    }
    return this._dy;
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    this._ctx.stroke();
  }

  update() {
    this._x += this.dx;
    this._y += this.dy;
  }

  animate() {
    this.update();
    this.draw();
  }
}

const $canvas = document.querySelector("#canvas1");
const ctx = $canvas.getContext("2d");

const particles = new Array(80).fill().map(() => {
  const radius = Math.random() * 20 + 10;
  const x = (Math.random() * $canvas.width) / 1.2 + radius;
  const y = (Math.random() * $canvas.height) / 1.2 + radius;
  const dx = Math.random() * 1;
  const dy = Math.random() * 1;
  return new Particle({ x, y, dx, dy, radius, $canvas, ctx });
});

function animateParticles() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  particles.forEach((p) => p.animate());
  requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);
