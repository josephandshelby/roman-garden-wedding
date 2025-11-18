// ----- FORM HANDLING (Wedding RSVPs) -----
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

// ----- FORM HANDLING (Buffet RSVPs) -----
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

// ----- ENGAGEMENT SLIDESHOW -----
const track = document.querySelector(".slideshow-track");
const slides = Array.from(track.children);
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

let currentIndex = 0;

// Function to show slide at currentIndex
function updateSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Event listeners for arrows
leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlide();
});

rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlide();
});

// Automatic slideshow rotation every 6 seconds
setInterval(() => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlide();
}, 6000);

// Optional: Adjust on window resize
window.addEventListener("resize", updateSlide);
