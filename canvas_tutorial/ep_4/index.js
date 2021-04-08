class Particle {
  constructor({
    x,
    y,
    dx,
    dy,
    radius,
    fillStyle,
    ctx,
    canvasHeight,
    canvasWidth,
  }) {
    this._x = x;
    this._y = y;
    this._initRadius = radius;
    this._radius = radius;
    this._dx = dx;
    this._dy = dy;
    this._ctx = ctx;
    this._fillStyle = fillStyle;
    this._canvasHeight = canvasHeight;
    this._canvasWidth = canvasWidth;
    this._mouse = {};
  }

  set mouse(newMouse) {
    this._mouse = newMouse;
  }

  get radius() {
    if (
      this._mouse.x - this._x < 25 &&
      this._mouse.x - this._x > -25 &&
      this._mouse.y - this._y < 25 &&
      this._mouse.y - this._y > -25 &&
      this._radius < 20
    ) {
      this._radius += 1;
    } else if (this._radius > this._initRadius) {
      this._radius -= 1;
    }

    return this._radius;
  }

  set radius(number) {
    if (number > 20) return;
    this._radius = number;
  }

  initRadius() {
    this.radius = this._initRadius;
  }

  get dx() {
    if (
      this._x + this._radius > this._canvasWidth ||
      this._x - this._radius < 0
    ) {
      this._dx *= -1;
    }
    return this._dx;
  }

  get dy() {
    if (
      this._y + this._radius > this._canvasHeight ||
      this._y - this._radius < 0
    ) {
      this._dy *= -1;
    }
    return this._dy;
  }

  update() {
    this._x += this.dx;
    this._y += this.dy;
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = this._fillStyle;
    this._ctx.arc(this._x, this._y, this.radius, 0, 2 * Math.PI);
    this._ctx.fill();
  }

  animate() {
    this.update();
    this.draw();
  }
}

class ParticleController {
  constructor({ ctx, $canvas, colors, count }) {
    this._ctx = ctx;
    this._canvasHeight = $canvas.height;
    this._canvasWidth = $canvas.width;
    this._colors = colors;
    this._count = count;
    this._createAParticle = this._createAParticle.bind(this);
    this._particles = this._createParticles();
    this._animate = this._animate.bind(this);

    requestAnimationFrame(this._animate);
  }

  _createAParticle() {
    const radius = Math.floor(Math.random() * 3);
    const diameter = radius * 2;
    const x = Math.random() * (this._canvasWidth - diameter) + diameter;
    const y = Math.random() * (this._canvasHeight - diameter) + diameter;
    const dx = Math.random() * 1 - 0.5;
    const dy = Math.random() * 1 - 0.5;
    const color = this._colors[Math.floor(Math.random() * this._colors.length)];

    return new Particle({
      x,
      y,
      dx,
      dy,
      radius,
      fillStyle: color,
      ctx: this._ctx,
      canvasHeight: this._canvasHeight,
      canvasWidth: this._canvasWidth,
    });
  }

  _createParticles() {
    return new Array(this._count).fill().map(this._createAParticle);
  }

  _clearCanvas() {
    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  }

  _animate() {
    this._clearCanvas();
    this._particles.forEach((p) => p.animate());
    requestAnimationFrame(this._animate);
  }

  setMouse(mouse) {
    this._particles.forEach((p) => {
      p.mouse = mouse;
    });
  }
}

function init() {
  const $canvas = document.querySelector("#canvas1");
  const ctx = $canvas.getContext("2d");
  $canvas.setAttribute("width", window.innerWidth);
  $canvas.setAttribute("height", window.innerHeight);

  const colors = ["#9EBCCE", "#E84925", "#CBD8E0", "#262E31"];
  let particleController = new ParticleController({
    ctx,
    $canvas,
    colors,
    count: 300,
  });

  window.addEventListener("mousemove", (e) => {
    particleController.setMouse({
      x: e.x,
      y: e.y,
    });
  });
}

init();
