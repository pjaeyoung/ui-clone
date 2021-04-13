const $cursor = document.querySelector(".custom-cursor");
const cursorHalfHeight = $cursor.clientHeight / 2;
const cursorHalfWidth = $cursor.clientWidth / 2;

const $cursorText = document.querySelector(".cursor-text");

const mouse = {
  x: null,
  y: null,
};

const $img = document.querySelector(".img-container");
let imgRect = $img.getBoundingClientRect();

const $btnMenu = document.querySelector("#btn-menu");
let btnRect = $btnMenu.getBoundingClientRect();

const $cursorTail = document.querySelector(".cursor-tail");

window.addEventListener("resize", () => {
  imgRect = $img.getBoundingClientRect();
  btnRect = $btnMenu.getBoundingClientRect();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  if (checkCursorCollision(imgRect)) {
    $cursor.classList.add("active");
    $cursorTail.classList.remove("active");
  } else {
    $cursor.classList.remove("active");
    $cursorTail.classList.add("active");
  }

  if (checkCursorCollision(btnRect)) {
    $btnMenu.classList.add("active");
  } else {
    $btnMenu.classList.remove("active");
  }

  $cursor.style.top = `${mouse.y - cursorHalfHeight}px`;
  $cursor.style.left = `${mouse.x - cursorHalfWidth}px`;
  $cursorText.style.top = `${mouse.y - $cursorText.clientHeight / 2}px`;
  $cursorText.style.left = `${mouse.x - $cursorText.clientWidth / 2}px`;
});

function checkCursorCollision(rect) {
  return (
    mouse.x + cursorHalfWidth > rect.x &&
    mouse.x - cursorHalfWidth < rect.x + rect.width &&
    mouse.y + cursorHalfHeight > rect.y &&
    mouse.y - cursorHalfWidth < rect.y + rect.height
  );
}

function followCursor() {
  const tail_x = parseInt($cursorTail.style.left.replace("px", "")) || 0;
  const tail_y = parseInt($cursorTail.style.top.replace("px", "")) || 0;
  $cursorTail.style.top = `${Math.round(
    tail_y + (mouse.y - $cursorTail.clientHeight / 2 - tail_y) / 10
  )}px`;
  $cursorTail.style.left = `${Math.round(
    tail_x + (mouse.x - $cursorTail.clientWidth / 2 - tail_x) / 10
  )}px`;
  requestAnimationFrame(followCursor);
}

requestAnimationFrame(followCursor);
