(() => {
  window.addEventListener("load", () => {
    gsap.to(".loader", {
      y: -30,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
      stagger: { each: 0.2, repeat: -1, yoyo: true, ease: "power1.inOut" },
    });

    setTimeout(() => {
      gsap.to(".preloader", {
        opacity: 0,
        delay: 1.2,
        duration: 0.5,
        onComplete: () => {
          document.querySelector(".preloader").style.display = "none";
        },
      });
    }, 2000);
  });
})();
