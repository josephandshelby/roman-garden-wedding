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

    /*** SLOT MACHINE INTRO OVERLAY ***/
    const symbols = ["heart.png", "ring.png", "cherry.png", "lemon.png", "bell.png"];
    const targetSymbols = ["heart.png", "heart.png", "ring.png"];

    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];

    const spinButton = document.getElementById("spinButton");
    const lever = document.getElementById("lever");
    const resultMessage = document.getElementById("resultMessage");
    const slotOverlay = document.getElementById("slotOverlay");

    const particlesCanvas = document.getElementById("particles");
    const ctx = particlesCanvas.getContext("2d");
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

    // Fill reels with symbols
    reels.forEach(reel => {
        symbols.forEach(sym => {
            const img = document.createElement("img");
            img.src = sym;
            reel.appendChild(img);
        });
    });

    function spinReel(reel, targetSymbol, duration) {
        return new Promise(resolve => {
            const totalSymbols = symbols.length;
            const start = performance.now();

            function animate(time) {
                let elapsed = time - start;
                let progress = elapsed / duration;
                if (progress > 1) progress = 1;

                const eased = 1 - Math.pow(1 - progress, 3);
                let symbolIndex = Math.floor((eased * totalSymbols * 10) % totalSymbols);
                reel.style.transform = `translateY(-${symbolIndex * 120}px)`;

                // glow hearts/rings
                if (targetSymbols.includes(symbols[symbolIndex])) {
                    reel.querySelectorAll('img').forEach(img => img.style.filter = "drop-shadow(0 0 10px #ff69b4) drop-shadow(0 0 15px #ffd700)");
                } else {
                    reel.querySelectorAll('img').forEach(img => img.style.filter = "drop-shadow(0 0 5px #fff)");
                }

                if (progress < 1) requestAnimationFrame(animate);
                else {
                    const finalIndex = symbols.indexOf(targetSymbol);
                    reel.style.transform = `translateY(-${finalIndex * 120}px)`;
                    resolve(finalIndex);
                }
            }

            requestAnimationFrame(animate);
        });
    }

    // Confetti particles
    let particles = [];
    function createParticles() {
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * -50,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 6 + 3,
                alpha: 1,
                size: Math.random() * 8 + 4,
                color: ["#ff69b4","#ffd700","#ff1493","#e74c3c","#ffffff"][Math.floor(Math.random()*5)]
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        particles.forEach((p,i) => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;

            if(p.alpha <= 0) particles.splice(i,1);
        });
        if (particles.length > 0) requestAnimationFrame(animateParticles);
    }

    function pullLever() {
        lever.style.transform = "rotate(30deg)";
        setTimeout(()=>lever.style.transform="rotate(0deg)",200);
    }

    async function spinSlotMachine() {
        spinButton.disabled = true;
        resultMessage.textContent = "";
        pullLever();

        await Promise.all([
            spinReel(reels[0], targetSymbols[0], 2000),
            spinReel(reels[1], targetSymbols[1], 2800),
            spinReel(reels[2], targetSymbols[2], 3600)
        ]);

        resultMessage.textContent = "💖 You got love & rings! 💍";
        createParticles();
        animateParticles();

        // After 2.5s, hide overlay and reveal site
        setTimeout(()=>{
            slotOverlay.style.display = "none";
            document.body.classList.add("reveal-site");
        },2500);
    }

    spinButton.addEventListener("click", spinSlotMachine);
    lever.addEventListener("click", spinSlotMachine);
});
