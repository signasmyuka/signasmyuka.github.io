(() => {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openLetterBtn");
  const modalEl = document.getElementById("letterModal");
  const letterStage = document.getElementById("letterStage");
  const closeModalBtn = document.getElementById("closeModalBtn");
  if (!envelope || !modalEl || !letterStage) return;

  const bsModal = new bootstrap.Modal(modalEl, { backdrop: true, keyboard: true });

  function openLetter() {
    envelope.classList.remove("bouncy");
    bsModal.show();
    setTimeout(() => {
      letterStage.classList.add("revealed");
      const carousel = bootstrap.Carousel.getInstance(document.querySelector("#photoCarousel"));
      carousel?.pause?.();
    }, 120);
  }

  function closeLetter() {
    letterStage.classList.remove("revealed");
    bsModal.hide();
    setTimeout(() => envelope.classList.add("bouncy"), 380);

    const carouselEl = document.querySelector("#photoCarousel");
    if (carouselEl) {
      const car =
        bootstrap.Carousel.getInstance(carouselEl) ||
        new bootstrap.Carousel(carouselEl, { ride: false });
      car?.cycle?.();
    }
  }

  envelope.addEventListener("click", openLetter);
  openBtn?.addEventListener("click", openLetter);
  closeModalBtn?.addEventListener("click", closeLetter);

  modalEl.addEventListener("hidden.bs.modal", () => {
    letterStage.classList.remove("revealed");
    setTimeout(() => envelope.classList.add("bouncy"), 380);
  });

  envelope.tabIndex = 0;
  envelope.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLetter();
    }
  });
})();
