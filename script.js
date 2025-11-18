// ----- SLOT MACHINE -----
const slotOverlay = document.getElementById("slot-overlay");
const lever = document.getElementById("slot-lever");
const leverStick = document.getElementById("lever-stick");
const leverBall = document.getElementById("lever-ball");

const wheels = [
    document.querySelector("#wheel1 .symbols-wrapper"),
    document.querySelector("#wheel2 .symbols-wrapper"),
    document.querySelector("#wheel3 .symbols-wrapper")
];

const symbols = ["7", "🍋", "🍒", "❤️", "💍"];
const finalSymbols = ["❤️", "❤️", "💍"]; // Winning symbols

let spinning = false;

lever.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    // Animate lever down
    leverStick.style.transform = "rotate(45deg)";
    leverBall.style.transform = "translateY(50px)";

    // Reset lever after 0.5s
    setTimeout(() => {
        leverStick.style.transform = "rotate(0deg)";
        leverBall.style.transform = "translateY(0)";
    }, 500);

    // Spin each wheel sequentially
    spinWheel(wheels[0], finalSymbols[0], 0);
});

function spinWheel(wheel, finalSymbol, index) {
    const wrapper = wheel;
    let spinCount = 0;
    const totalSpins = 20 + Math.floor(Math.random() * 10); // Randomized spins
    const spinInterval = setInterval(() => {
        // Rotate symbols
        wrapper.appendChild(wrapper.firstElementChild);
        spinCount++;
        if (spinCount >= totalSpins) {
            clearInterval(spinInterval);
            // Set final symbol
            wrapper.innerHTML = "";
            const finalDiv = document.createElement("div");
            finalDiv.className = "symbol";
            finalDiv.textContent = finalSymbol;
            wrapper.appendChild(finalDiv);

            // Spin next wheel
            if (index < wheels.length - 1) {
                spinWheel(wheels[index + 1], finalSymbols[index + 1], index + 1);
            } else {
                // All wheels done, hide overlay after short delay
                setTimeout(() => {
                    slotOverlay.style.opacity = "0";
                    setTimeout(() => {
                        slotOverlay.style.display = "none";
                        spinning = false;
                    }, 500);
                }, 1000);
            }
        }
    }, 100);
}

// ----- ENGAGEMENT SLIDESHOW -----
const track = document.querySelector(".slideshow-track");
const slides = Array.from(track.children);
let currentSlide = 0;

function showSlide(index) {
    const width = track.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

document.querySelector(".arrow-left").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

document.querySelector(".arrow-right").addEventListener("click", () => {
    nextSlide();
});

// Auto-advance every 6 seconds
setInterval(nextSlide, 6000);

// ----- FORM HANDLING (Wedding RSVPs) -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", e => {
    e.preventDefault();
    weddingMessage.textContent = "Submitting...";
    const formData = new FormData(weddingForm);
    fetch("https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec", {
        method: "POST",
        body: formData
    }).then(() => {
        weddingMessage.textContent = "Thank you! Your RSVP has been received.";
        weddingForm.reset();
    }).catch(() => {
        weddingMessage.textContent = "Error submitting form. Please try again.";
    });
});

// ----- FORM HANDLING (Buffet RSVPs) -----
const buffetForm = document.getElementById("buffetForm");
const buffetMessage = document.getElementById("buffetMessage");

buffetForm.addEventListener("submit", e => {
    e.preventDefault();
    buffetMessage.textContent = "Submitting...";
    const formData = new FormData(buffetForm);
    fetch("https://script.google.com/macros/s/AKfycbxcgsO_6g6j-2U-eY-fS4OFnYDiOeRc8k4pTmSV21HLmAK0PqkYSI60WtIZfQv7mq9k/exec", {
        method: "POST",
        body: formData
    }).then(() => {
        buffetMessage.textContent = "Buffet RSVP received!";
        buffetForm.reset();
    }).catch(() => {
        buffetMessage.textContent = "Submission error. Please try again.";
    });
});
