/* ================================
   SLOT MACHINE FUNCTIONALITY
================================ */

const slotOverlay = document.getElementById("slot-overlay");
const handleBall = document.getElementById("handle-ball");
const handleStick = document.getElementById("handle-stick");

let spinning = false;

function spinReels() {
    if (spinning) return;
    spinning = true;

    // Pull handle animation
    handleBall.classList.add("pulled");
    handleStick.classList.add("pulled");

    setTimeout(() => {
        handleBall.classList.remove("pulled");
        handleStick.classList.remove("pulled");
    }, 500);

    // Spin animation for each reel
    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];

    reels.forEach((reel, i) => {
        reel.style.transition = "transform 1s ease";
        reel.style.transform = "translateY(-300px)";
    });

    // After animation ends → reset + show hearts
    setTimeout(() => {
        reels.forEach(reel => {
            reel.style.transition = "none";
            reel.style.transform = "translateY(-300px)";
        });

        // Fade out slot overlay
        slotOverlay.classList.add("fade-out");

        setTimeout(() => {
            slotOverlay.style.display = "none";
        }, 1200);

    }, 1100);
}

handleBall.addEventListener("click", spinReels);
handleStick.addEventListener("click", spinReels);



/* ================================
   ENGAGEMENT SLIDESHOW
================================ */

let slideIndex = 0;
const track = document.querySelector(".slideshow-track");
const slides = document.querySelectorAll(".slideshow-track img");

function updateSlidePosition() {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

document.querySelector(".arrow-left").addEventListener("click", () => {
    slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
    updateSlidePosition();
});

document.querySelector(".arrow-right").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlidePosition();
});

// Auto-rotate every 5 seconds
setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlidePosition();
}, 5000);



/* ================================
   WEDDING RSVP FORM
================================ */

document.getElementById("weddingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const message = document.getElementById("weddingMessage");

    message.textContent = "Submitting...";

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec",
            { method: "POST", body: formData }
        );

        if (response.ok) {
            message.textContent = "Thank you! Your RSVP has been submitted.";
            form.reset();
        } else {
            message.textContent = "There was an error submitting. Try again.";
        }
    } catch (error) {
        message.textContent = "Network error. Please try again.";
    }
});



/* ================================
   BUFFET RSVP FORM
================================ */

document.getElementById("buffetForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const message = document.getElementById("buffetMessage");

    message.textContent = "Submitting...";

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec",
            { method: "POST", body: formData }
        );

        if (response.ok) {
            message.textContent = "Thank you! Your buffet RSVP has been submitted.";
            form.reset();
        } else {
            message.textContent = "There was an error submitting. Try again.";
        }
    } catch (error) {
        message.textContent = "Network error. Please try again.";
    }
});
