class VerticalSlider {
  constructor({ $slideItems, observeOptions = {} }) {
    this.observer = new IntersectionObserver(this._observeCallback, {
      threshold: 0.01,
      ...observeOptions,
    });

    $slideItems.forEach(($slideItems, index) => {
      $slideItems.dataset.index = index;
      this.observer.observe($slideItems);
    });
  }

  _observeCallback = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      this._toggleActive(entry.target);
      this._moveScroll(
        window.innerHeight * parseInt(entry.target.dataset.index)
      );
    }
  };

  _toggleActive = ((prev = null) => {
    return (current) => {
      prev?.classList.remove("active");
      current.classList.add("active");
      prev = current;
    };
  })();

  _moveScroll = (toValue) => {
    window.scrollTo({
      top: toValue,
      left: 0,
      behavior: "smooth",
    });
  };
}

new VerticalSlider({
  $slideItems: document.querySelectorAll("section"),
  observeOptions: {
    threshold: 0.1,
  },
});
