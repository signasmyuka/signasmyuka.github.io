(() => {
  const audio = document.getElementById("bgAudio");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  if (!audio || !playBtn || !pauseBtn) return;

  playBtn.addEventListener("click", async () => {
    try {
      await audio.play();
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline-block";
    } catch {
      alert("Autoplay blocked. Click again or allow audio playback.");
    }
  });

  pauseBtn.addEventListener("click", () => {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
  });
})();
