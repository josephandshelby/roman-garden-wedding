// ----- SLIDESHOW -----
const track = document.querySelector(".slideshow-track");
const slides = Array.from(track.children);
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

let currentIndex = 0;
let slideWidth = track.getBoundingClientRect().width;

// Update slideWidth on window resize
window.addEventListener('resize', () => {
    slideWidth = track.getBoundingClientRect().width;
    moveToSlide(currentIndex);
});

// Move to a specific slide
function moveToSlide(index) {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
}

// Arrow navigation
leftArrow.addEventListener("click", () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    moveToSlide(prevIndex);
});

rightArrow.addEventListener("click", () => {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    moveToSlide(nextIndex);
});

// Auto-rotate every 6 seconds
setInterval(() => {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    moveToSlide(nextIndex);
}, 6000);

// ----- Swipe Support for Mobile -----
let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
    if (startX - endX > 50) {
        // Swipe left
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        moveToSlide(nextIndex);
    } else if (endX - startX > 50) {
        // Swipe right
        const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        moveToSlide(prevIndex);
    }
});

// ----- FORM HANDLING (Wedding RSVPs) -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", async e => {
    e.preventDefault();
    weddingMessage.textContent = "Submitting...";

    const formData = new FormData(weddingForm);
    const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

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
    const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

    fetch(scriptURL, { method: "POST", body: formData })
        .then(() => {
            buffetMessage.textContent = "Buffet RSVP received!";
            buffetForm.reset();
        })
        .catch(() => {
            buffetMessage.textContent = "Submission error. Please try again.";
        });
});
