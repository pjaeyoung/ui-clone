(function () {
  function createCircleCell($target) {
    $target.innerHTML = $target.textContent
      .split("")
      .map(
        (aWord, index) =>
          `<div class="circle__cell" style="--i:${index}" >${aWord}</div>`
      )
      .join("");
  }

  const $circle = document.querySelector(".circle");

  createCircleCell($circle);

  window.addEventListener("mousemove", (event) => {
    $circle.style.transform = `rotateY(${event.pageX / 4}deg) rotateX(${
      (event.pageY / 4) * 0.2
    }deg)`;
  });
})();
