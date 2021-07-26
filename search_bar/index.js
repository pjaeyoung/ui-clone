(function () {
  const $searchBarForm = document.querySelector("#search-bar__form");
  const $btnClose = document.querySelector("#btn-close");
  $searchBarForm.addEventListener("click", () => {
    $searchBarForm.classList.add("open");
    $btnClose.classList.add("show");
  });

  $btnClose.addEventListener("click", (e) => {
    e.stopPropagation();
    $searchBarForm.classList.remove("open");
    $btnClose.classList.remove("show");
  });
})();
