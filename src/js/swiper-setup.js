(() => {
  document.querySelectorAll(".swiper-slide img").forEach(img => {
    img.addEventListener("error", () => {
      img.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='720'><rect width='100%' height='100%' fill='#fff4f8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#d39fb0' font-size='28'>File is missing.</text></svg>`,
        );
    });
  });

  const bgImages = [
    "url('../assets/images/prinzkuning.jpg')",
    "url('../assets/images/us1.jpg')",
    "url('../assets/images/us2.jpg')",
    "url('../assets/images/us3.jpg')",
    "url('../assets/images/us4.jpg')",
  ];
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 1200,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "creative",
    creativeEffect: {
      prev: { translate: ["-102%", 0, 0], scale: 1.02, shadow: true },
      next: { translate: ["80%", 0, -10], scale: 1, shadow: true },
    },
    easing: "power2.out",
    parallax: true,
    grabCursor: true,
    on: {
      slideChange(swiper) {
        const newBg = bgImages[swiper.realIndex];
        document.documentElement.style.setProperty("--swiper-bg", newBg);

        gsap.to(swiper.slides, {
          filter: "blur(5px) brightness(0.9)",
          duration: 1.5,
          ease: "power1.out",
        });
        gsap.to(swiper.slides[swiper.activeIndex], {
          filter: "blur(0px) brightness(1)",
          duration: 1.5,
          ease: "power1.out",
        });
      },

      slideChangeTransitionEnd(swiper) {
        document.querySelectorAll(".swiper-slide img").forEach(resetKenBurns);
        const activeImg = swiper.slides[swiper.activeIndex]?.querySelector("img");
        if (activeImg) applyKenBurns(activeImg);
      },
    },
  });

  const applyKenBurns = img => {
    const maxTranslate = 20;
    const randomX = (Math.random() - 0.5) * maxTranslate * 2;
    const randomY = (Math.random() - 0.5) * maxTranslate * 2;
    const randomScale = 1.05 + Math.random() * 0.15;
    img.style.transform = `scale(${randomScale}) translate(${randomX}px, ${randomY}px)`;
  };

  const resetKenBurns = img => (img.style.transform = "scale(1) translate(0,0)");

  const firstSlideImg = document.querySelector(".swiper-slide-active img");
  if (firstSlideImg) applyKenBurns(firstSlideImg);
})();
