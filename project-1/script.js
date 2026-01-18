// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
const music = document.getElementById("bgMusic");
  const toggle = document.getElementById("musicToggle");

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play()
        .then(() => {
          toggle.textContent = "🔊 Playing";
          toggle.setAttribute("aria-pressed", "true");
        })
        .catch(err => {
          console.log("Playback blocked:", err);
          alert("Click again or interact with the page first to enable sound.");
        });
    } else {
      music.pause();
      toggle.textContent = "🔈 Paused";
      toggle.setAttribute("aria-pressed", "false");
    }
  });
  