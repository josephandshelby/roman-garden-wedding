// ----- SLOT MACHINE -----
const leverBall = document.getElementById("lever-ball");
const leverStick = document.getElementById("lever-stick");
const overlay = document.getElementById("slot-overlay");

const wheels = [
  document.getElementById("wheel1"),
  document.getElementById("wheel2"),
  document.getElementById("wheel3")
];

let spinning = false;

// Spin sequence function
function spinWheels() {
  if (spinning) return; // Prevent multiple clicks
  spinning = true;

  // Animate lever
  leverStick.style.transform = "rotate(30deg)";
  leverBall.style.transform = "translateY(15px)";
  setTimeout(() => {
    leverStick.style.transform = "rotate(0deg)";
    leverBall.style.transform = "translateY(0px)";
  }, 300);

  // Sequential wheel spinning
  spinWheel(0);
}

function spinWheel(index) {
  if (index >= wheels.length) {
    // All wheels spun, hide overlay
    setTimeout(() => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);
    }, 500);
    return;
  }

  const wheel = wheels[index];
  wheel.style.transition = "transform 1s ease-out";
  
  // Simulate spin with extra rotations
  wheel.style.transform = "translateY(-200%)"; 

  // Stop at correct symbol
  setTimeout(() => {
    wheel.style.transition = "transform 0.5s ease-out";
    if (index === 0) wheel.style.transform = "translateY(-300%)"; // ❤️
    if (index === 1) wheel.style.transform = "translateY(-300%)"; // ❤️
    if (index === 2) wheel.style.transform = "translateY(-400%)"; // 💍
    setTimeout(() => {
      spinWheel(index + 1); // Next wheel
    }, 600);
  }, 1000);
}

// Attach click event
leverBall.addEventListener("click", spinWheels);
leverStick.addEventListener("click", spinWheels);

// ----- SLIDESHOW -----
const track = document.querySelector(".slideshow-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".arrow-right");
const prevBtn = document.querySelector(".arrow-left");
let slideIndex = 0;

function showSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

prevBtn.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

// Auto rotate every 6 seconds
setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}, 6000);

// ----- WEDDING FORM -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", async e => {
  e.preventDefault();
  weddingMessage.textContent = "Submitting...";
  const formData = new FormData(weddingForm);
  const scriptURL = "https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec";

  fetch(scriptURL, { method: "POST", body: formData })
    .then(() => {
      weddingMessage.textContent = "Thank you! Your RSVP has been received.";
      weddingForm.reset();
    })
    .catch(() => {
      weddingMessage.textContent = "Error submitting form. Please try again.";
    });
});

// ----- BUFFET FORM -----
const buffetForm = document.getElementById("buffetForm");
const buffetMessage = document.getElementById("buffetMessage");

buffetForm.addEventListener("submit", async e => {
  e.preventDefault();
  buffetMessage.textContent = "Submitting...";
  const formData = new FormData(buffetForm);

  const scriptURL = "https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec";

  fetch(scriptURL, { method: "POST", body: formData })
    .then(() => {
      buffetMessage.textContent = "Buffet RSVP received!";
      buffetForm.reset();
    })
    .catch(() => {
      buffetMessage.textContent = "Submission error. Please try again.";
    });
});
