/* ===========================================================
   SLOT MACHINE LOGIC
=========================================================== */

const spinButton = document.getElementById("spin-button");
const slotOverlay = document.getElementById("slot-overlay");
const mainContent = document.getElementById("main-content");

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const handle = document.querySelector(".slot-handle");

/* Hearts that will spin */
const symbols = ["❤️", "❤️", "❤️"]; // always hearts for all spins

function populateReel(reel) {
  reel.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.textContent = symbols[i % symbols.length];
    div.style.height = "60px";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    reel.appendChild(div);
  }
}

/* Fill each reel initially */
populateReel(reel1);
populateReel(reel2);
populateReel(reel3);

/* Confetti function */
function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.left = Math.random() * 100 + "vw";
    c.style.setProperty("--hue", Math.floor(Math.random() * 360));
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 2500);
  }
}

spinButton.addEventListener("click", () => {

  /* Animate handle pull */
  handle.classList.add("handle-animate");
  setTimeout(() => handle.classList.remove("handle-animate"), 450);

  /* Add spinning animation to reels */
  reel1.style.animation = "spin 1s ease-out";
  reel2.style.animation = "spin 1.3s ease-out";
  reel3.style.animation = "spin 1.6s ease-out";

  /* After animation finishes, freeze all reels on ❤️ */
  setTimeout(() => {
    reel1.style.animation = "none";
    reel2.style.animation = "none";
    reel3.style.animation = "none";

    populateReel(reel1);
    populateReel(reel2);
    populateReel(reel3);

    launchConfetti(); // small confetti burst

    /* Fade out overlay and reveal site */
    setTimeout(() => {
      slotOverlay.style.transition = "opacity 1s";
      slotOverlay.style.opacity = "0";

      setTimeout(() => {
        slotOverlay.style.display = "none";
        mainContent.style.opacity = "1";
      }, 1000);

    }, 400);

  }, 1600);
});

/* ===========================================================
   ENGAGEMENT PHOTO SLIDER (ONE AT A TIME)
=========================================================== */

let slideIndex = 0;
const slides = document.querySelectorAll(".engagement-slide");

function showSlides() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");

  slideIndex++;
  if (slideIndex >= slides.length) slideIndex = 0;

  setTimeout(showSlides, 3500);
}

/* Start slider only if engagement slides exist */
if (slides.length > 0) {
  showSlides();
}

/* ===========================================================
   GOOGLE FORM RSVP SUBMISSION
=========================================================== */

const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const scriptURL = "https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec";

    const formData = new FormData(rsvpForm);

    try {
      await fetch(scriptURL, { method: "POST", body: formData });
      alert("Thank you! Your RSVP has been submitted.");
      rsvpForm.reset();
    } catch (error) {
      alert("There was an error submitting your RSVP.");
    }
  });
}
