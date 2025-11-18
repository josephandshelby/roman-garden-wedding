// ----- FORM HANDLING (Wedding RSVPs) -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", async e => {
    e.preventDefault();

    weddingMessage.textContent = "Submitting...";

    const formData = new FormData(weddingForm);

    // Replace with YOUR Google Script URL
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

    // Replace with YOUR Google Script URL
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
const slides = document.querySelectorAll(".slideshow-track img");
const nextButton = document.querySelector(".arrow-right");
const prevButton = document.querySelector(".arrow-left");

let currentIndex = 0;
const slideInterval = 6000; // 6 seconds
let autoplay;

// Show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

// Start autoplay
function startAutoplay() {
    autoplay = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, slideInterval);
}

// Stop autoplay
function stopAutoplay() {
    clearInterval(autoplay);
}

// Initialize slideshow
showSlide(currentIndex);
startAutoplay();

// ----- ARROW NAVIGATION -----
nextButton.addEventListener("click", () => {
    stopAutoplay();
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    startAutoplay();
});

prevButton.addEventListener("click", () => {
    stopAutoplay();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    startAutoplay();
});

// ----- SWIPE SUPPORT -----
let startX = 0;
let endX = 0;
const threshold = 50; // minimum swipe distance in px
const slideshow = document.querySelector(".slideshow-section");

slideshow.addEventListener("touchstart", (e) => {
    stopAutoplay();
    startX = e.touches[0].clientX;
});

slideshow.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

slideshow.addEventListener("touchend", () => {
    const distance = endX - startX;
    if (distance > threshold) {
        // Swipe right → previous slide
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    } else if (distance < -threshold) {
        // Swipe left → next slide
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    startAutoplay();
});
