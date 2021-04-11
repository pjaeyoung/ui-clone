class Circle {
  constructor({ x, y, radius, fillStyle, ctx }) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._fillStyle = fillStyle;
    this._ctx = ctx;
    this.draw();
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }

  set x(number) {
    this._x = number;
  }

  set y(number) {
    this._y = number;
  }

  set fillStyle(string) {
    this._fillStyle = string;
  }

  draw() {
    this._ctx.fillStyle = this._fillStyle;
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
    this._ctx.fill();
  }
}

function init() {
  const $canvas = document.querySelector("#canvas1");
  $canvas.height = window.innerHeight;
  $canvas.width = window.innerWidth;

  const ctx = $canvas.getContext("2d");
  const pointer = new Circle({
    x: null,
    y: null,
    radius: 50,
    ctx,
    fillStyle: "black",
  });
  const target = new Circle({
    x: $canvas.width / 2,
    y: $canvas.height / 2,
    radius: 100,
    ctx,
    fillStyle: "black",
  });

  window.addEventListener("mousemove", (e) => {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    pointer.x = e.x;
    pointer.y = e.y;

    const dx = target.x - pointer.x;
    const dy = target.y - pointer.y;
    target.fillStyle = "black";
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pointer.radius + target.radius) {
      target.fillStyle = "tomato";
    }

    target.draw();
    pointer.draw();
  });
}

init();
