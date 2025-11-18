// script.js

document.addEventListener("DOMContentLoaded", () => {
    /*** SLIDESHOW ***/
    const track = document.querySelector(".slideshow-track");
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".arrow-right");
    const prevButton = document.querySelector(".arrow-left");
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + "px";
    });

    let currentIndex = 0;

    const moveToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
    };

    nextButton.addEventListener("click", () => moveToSlide(currentIndex + 1));
    prevButton.addEventListener("click", () => moveToSlide(currentIndex - 1));

    // Optional: auto-slide every 5 seconds
    setInterval(() => moveToSlide(currentIndex + 1), 5000);

    /*** RSVP FORM HANDLING ***/
    const weddingForm = document.getElementById("weddingForm");
    const buffetForm = document.getElementById("buffetForm");
    const weddingMessage = document.getElementById("weddingMessage");
    const buffetMessage = document.getElementById("buffetMessage");

    const handleFormSubmit = (form, messageEl) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simple feedback, replace with real backend call if needed
            messageEl.textContent = "Thank you, " + (data.name || "Guest") + "! Your RSVP has been recorded.";
            messageEl.style.opacity = 1;
            form.reset();

            setTimeout(() => {
                messageEl.style.opacity = 0;
            }, 5000);
        });
    };

    handleFormSubmit(weddingForm, weddingMessage);
    handleFormSubmit(buffetForm, buffetMessage);


// Vegas-style slot machine overlay
const wheels = [
    document.getElementById("wheel1"),
    document.getElementById("wheel2"),
    document.getElementById("wheel3")
];

const spinButton = document.getElementById("spinButton");
const overlay = document.getElementById("slotOverlay");

const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Symbols (use emojis or swap with images)
const symbols = ["🍒","🍋","🔔","💖","💍"];
const targetSymbols = ["💖","💖","💍"]; // hearts, hearts, ring

// Confetti
let confettiParticles = [];
function createConfetti(){
    confettiParticles = [];
    for(let i=0;i<150;i++){
        confettiParticles.push({
            x: Math.random()*window.innerWidth,
            y: Math.random()*-50,
            vx: (Math.random()-0.5)*6,
            vy: Math.random()*6+3,
            size: Math.random()*8+4,
            color: ["#ff69b4","#ffd700","#ff1493","#e74c3c","#ffffff"][Math.floor(Math.random()*5)]
        });
    }
}
function animateConfetti(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettiParticles.forEach((p,i)=>{
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if(p.y>window.innerHeight || p.x<0 || p.x>window.innerWidth) confettiParticles.splice(i,1);
    });
    if(confettiParticles.length>0) requestAnimationFrame(animateConfetti);
}

// Spin wheel in place
function spinWheel(wheel, target, duration){
    return new Promise(resolve=>{
        let start = null;
        const spins = 10; // number of full rotations
        function animate(time){
            if(!start) start=time;
            let progress = Math.min((time-start)/duration,1);
            let angle = spins*360*progress;
            wheel.style.transform = `rotate(${angle}deg)`;
            if(progress<1) requestAnimationFrame(animate);
            else {
                wheel.textContent = target;
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

// Sequential spin
async function spinAll(){
    spinButton.disabled = true;
    wheels.forEach(w=> w.textContent="❓");

    await spinWheel(wheels[0], targetSymbols[0], 1500);
    await spinWheel(wheels[1], targetSymbols[1], 2000);
    await spinWheel(wheels[2], targetSymbols[2], 2500);

    createConfetti();
    animateConfetti();

    setTimeout(()=> overlay.style.display="none", 2500);
}

spinButton.addEventListener("click", spinAll);
