// ----- FORM HANDLING (Wedding RSVPs) -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", async e => {
    e.preventDefault();
    weddingMessage.textContent = "Submitting...";
    const formData = new FormData(weddingForm);
    const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

    fetch(scriptURL, { method: "POST", body: formData })
        .then(() => {
            weddingMessage.textContent = "Thank you! Your RSVP has been received.";
            weddingForm.reset();
        })
        .catch(() => {
            weddingMessage.textContent = "Error submitting form. Please try again.";
        });
});

// ----- FORM HANDLING (Buffet RSVPs) -----
const buffetForm = document.getElementById("buffetForm");
const buffetMessage = document.getElementById("buffetMessage");

buffetForm.addEventListener("submit", async e => {
    e.preventDefault();
    buffetMessage.textContent = "Submitting...";
    const formData = new FormData(buffetForm);
    const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

    fetch(scriptURL, { method: "POST", body: formData })
        .then(() => {
            buffetMessage.textContent = "Buffet RSVP received!";
            buffetForm.reset();
        })
        .catch(() => {
            buffetMessage.textContent = "Submission error. Please try again.";
        });
});

// ----- SLIDESHOW -----
const track = document.querySelector(".slideshow-track");
const slides = Array.from(track.children);
const nextArrow = document.querySelector(".arrow-right");
const prevArrow = document.querySelector(".arrow-left");

let currentIndex = 0;
const slideCount = slides.length;

function updateSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
}

// Automatic rotation every 6 seconds
let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide(currentIndex);
}, 6000);

// Arrow navigation
nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide(currentIndex);
    resetInterval();
});

prevArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide(currentIndex);
    resetInterval();
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlide(currentIndex);
    }, 6000);
}
