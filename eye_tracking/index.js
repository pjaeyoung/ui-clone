const $title = document.querySelector(".title");

const titleContent = $title.textContent;
$title.innerHTML = titleContent
  .split("")
  .map(
    (aWord, index) => `<span style="--i:${index}" class="word">${aWord}</span>`
  )
  .join("");

const $pupils = document.querySelectorAll(".pupil");

document.body.addEventListener("mouseenter", () => {
  $pupils.forEach(($pupil) => {
    $pupil.style.top = "2px";
    $pupil.style.left = "2px";
  });
});

function calcRotateDegree(eye, event) {
  const rad = Math.atan2(event.x - eye.x, event.y - eye.y);
  const result = rad * (180 / Math.PI) * -1 + 220;
  return result;
}

class Eye {
  constructor({ $target }) {
    this._$target = $target;
    this._width = this._$target.clientWidth;
    this._height = this._$target.clientHeight;
    this._left = this._$target.getBoundingClientRect().left;
    this._top = this._$target.getBoundingClientRect().top;
  }

  get x() {
    return this._left + this._width / 2;
  }

  get y() {
    return this._top + this._height / 2;
  }

  set rotate(degree) {
    this._$target.style.transform = `rotate(${degree}deg)`;
  }
}

const eyes = [...document.querySelectorAll(".eye")].map(
  ($eye) => new Eye({ $target: $eye })
);

document.body.addEventListener("mousemove", (e) => {
  eyes.forEach((eye) => {
    eye.rotate = calcRotateDegree(eye, e);
  });
});
