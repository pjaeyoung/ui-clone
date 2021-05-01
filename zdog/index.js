// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: ".zdog-canvas",
  zoom: 10,
  dragRotate: true,
});

const head = new Zdog.Shape({
  addTo: illo,
  stroke: 12,
  color: "#FADB6A",
});

const eyeBrow = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 1, // semi-circle
  translate: { x: -2, y: -2, z: 4.5 },
  // rotate semi-circle to point up
  rotate: { z: -Zdog.TAU / 8 },
  color: "#ECA72D",
  stroke: 0.5,
  // hide when front-side is facing back
  backface: false,
});

eyeBrow.copy({
  translate: { x: 2, y: -2, z: 4.5 },
});

const eye = new Zdog.Ellipse({
  addTo: head,
  translate: { x: -2, y: -1, z: 4.5 },
  width: 0.5,
  height: 1,
  stroke: 1.2,
  color: "#363D63",
});

eye.copy({
  translate: { x: 2, y: -1, z: 4.5 },
});

const mouse = new Zdog.Ellipse({
  addTo: head,
  translate: { x: 0, y: 2.5, z: 4.5 },
  width: 2,
  height: 2,
  stroke: 2,
  color: "#713110",
});

let operator = 1;

function animate() {
  if (illo.rotate.x <= -0.5) {
    illo.rotate.x += 0.01;
    operator = 1;
  }

  if (illo.rotate.x >= 1) {
    illo.rotate.x -= 0.01;
    operator = -1;
  }

  if (illo.rotate.x > -0.5 && illo.rotate.x < 1) {
    illo.rotate.x = illo.rotate.x + 0.01 * operator;
  }

  if (illo.rotate.y <= -0.5) {
    illo.rotate.y += 0.01;
  }

  if (illo.rotate.y >= 0.2) {
    illo.rotate.y -= 0.01;
  }

  if (illo.rotate.y > -0.5 && illo.rotate.y < 0.2) {
    illo.rotate.y = illo.rotate.y + 0.01 * operator;
  }

  console.log(illo.rotate.x);
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
animate();
