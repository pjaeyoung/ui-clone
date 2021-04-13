class CustomCursor {
  constructor({ $target }) {
    this._$target = $target;
    this._radius = $target.clientHeight / 2;
    this._pos = {
      x: null,
      y: null,
    };
    this.collisonEvent = [];
  }

  get pos() {
    return { ...this._pos };
  }

  set pos(newPos) {
    this._pos = newPos;
    this._$target.style.top = `${newPos.y - this.radius}px`;
    this._$target.style.left = `${newPos.x - this.radius}px`;

    this.collisonEvent.forEach((event) => {
      if (this.checkCursorCollision(event.target)) {
        event.activate();
      } else {
        event.inactviate();
      }
    });
  }

  get radius() {
    return this._radius;
  }

  get $target() {
    return this._$target;
  }

  registerCollisionEvent({ target, activateFn, inactivateFn }) {
    this.collisonEvent.push({
      target,
      activate: activateFn,
      inactviate: inactivateFn,
    });
  }

  checkCursorCollision(rect) {
    return (
      this._pos.x + this._radius > rect.x &&
      this._pos.x - this._radius < rect.x + rect.width &&
      this._pos.y + this._radius > rect.y &&
      this._pos.y - this._radius < rect.y + rect.height
    );
  }
}

const customCursor = new CustomCursor({
  $target: document.querySelector(".cursor-wrapper"),
});

const $cursorTail = document.querySelector(".cursor-tail");
customCursor.registerCollisionEvent({
  target: document.querySelector(".img-container").getBoundingClientRect(),
  activateFn: () => {
    customCursor._$target.classList.add("active");
    $cursorTail.classList.remove("active");
  },
  inactivateFn: () => {
    customCursor._$target.classList.remove("active");
    $cursorTail.classList.add("active");
  },
});

const $btnMenu = document.querySelector("#btn-menu");
customCursor.registerCollisionEvent({
  target: $btnMenu.getBoundingClientRect(),
  activateFn: () => {
    $btnMenu.classList.add("active");
  },
  inactivateFn: () => {
    $btnMenu.classList.remove("active");
  },
});

window.addEventListener("mousemove", (e) => {
  customCursor.pos = { x: e.x, y: e.y };
});

function createFollowCursor({ $cursorTail, smooth = 10 }) {
  if (!($cursorTail instanceof HTMLElement)) {
    throw new Error(
      "$cursorTail은 필수 인자로 HTMLElement의 인스턴스여야 합니다"
    );
  }

  return function followCursor() {
    const tail_x = parseInt($cursorTail.style.left.replace("px", "")) || 0;
    const tail_y = parseInt($cursorTail.style.top.replace("px", "")) || 0;
    $cursorTail.style.top = `${Math.round(
      tail_y +
        (customCursor.pos.y - $cursorTail.clientHeight / 2 - tail_y) / smooth
    )}px`;
    $cursorTail.style.left = `${Math.round(
      tail_x +
        (customCursor.pos.x - $cursorTail.clientWidth / 2 - tail_x) / smooth
    )}px`;
    requestAnimationFrame(followCursor);
  };
}

requestAnimationFrame(createFollowCursor({ $cursorTail }));
