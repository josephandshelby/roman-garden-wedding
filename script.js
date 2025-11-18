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

// Reels and symbols
const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

const symbols = ["🍒","🍋","🔔","💖","💍"];
const targetSymbols = ["💖","💖","💍"]; // heart, heart, wedding bands

const spinButton = document.getElementById("spinButton");
const overlay = document.getElementById("slotOverlay");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Confetti
function createConfetti(){
    const particles = [];
    for(let i=0;i<150;i++){
        particles.push({
            x: Math.random()*window.innerWidth,
            y: Math.random()*-50,
            vx: (Math.random()-0.5)*6,
            vy: Math.random()*6+3,
            size: Math.random()*8+4,
            color: ["#ff69b4","#ffd700","#ff1493","#e74c3c","#ffffff"][Math.floor(Math.random()*5)]
        });
    }
    return particles;
}

function animateConfetti(particles){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    particles.forEach((p,i)=>{
        ctx.fillStyle=p.color;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if(p.y>window.innerHeight||p.x<0||p.x>window.innerWidth) particles.splice(i,1);
    });
    if(particles.length>0) requestAnimationFrame(()=>animateConfetti(particles));
}

// Spin one reel
function spinReel(reel,target,duration){
    return new Promise(resolve=>{
        reel.innerHTML="";
        let sequence = [];
        for(let i=0;i<20;i++){
            sequence.push(symbols[Math.floor(Math.random()*symbols.length)]);
        }
        sequence.push(target); // last symbol is target
        const start = performance.now();
        function animate(time){
            const elapsed = time-start;
            const progress = Math.min(elapsed/duration,1);
            const index = Math.floor(progress * sequence.length);
            reel.innerHTML="";
            for(let i=index;i<index+3;i++){
                const sym = document.createElement("div");
                sym.className="symbol";
                sym.textContent=sequence[i%sequence.length];
                reel.appendChild(sym);
            }
            if(progress<1) requestAnimationFrame(animate);
            else{
                reel.innerHTML="";
                const final = document.createElement("div");
                final.className="symbol";
                final.textContent=target;
                reel.appendChild(final);
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

// Spin all reels sequentially
async function spinAll(){
    spinButton.disabled=true;
    reels.forEach(r=> r.innerHTML="❓");

    for(let i=0;i<reels.length;i++){
        await spinReel(reels[i],targetSymbols[i],1500 + i*500);
    }

    const confetti=createConfetti();
    animateConfetti(confetti);

    setTimeout(()=>overlay.style.display="none",2500);
}

// Ensure it works on click/tap
spinButton.addEventListener("click",spinAll);

