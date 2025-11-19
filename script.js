// script.js

document.addEventListener("DOMContentLoaded", () => {

  /***********************************/
/***  ✨ VEGAS INTRO (IFRAME)     ***/
/***********************************/
const introOverlay = document.getElementById("introOverlay");
const introFrame = document.getElementById("introFrame");

function closeIntro() {
    introOverlay.classList.add("hidden");
    setTimeout(() => introOverlay.remove(), 800);
}

// Listen for messages coming **from inside the iframe**
window.addEventListener("message", (event) => {
    if (event.data === "close-intro") {
        closeIntro();
    }
});


    /***********************************/
    /***  📸 SLIDESHOW                ***/
    /***********************************/
    const track = document.querySelector(".slideshow-track");
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector(".arrow-right");
    const prevButton = document.querySelector(".arrow-left");

    if (track && slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;

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

        nextButton?.addEventListener("click", () => moveToSlide(currentIndex + 1));
        prevButton?.addEventListener("click", () => moveToSlide(currentIndex - 1));

        setInterval(() => moveToSlide(currentIndex + 1), 5000);
    }


    /***********************************/
    /***  📝 FORMS                    ***/
    /***********************************/
    const weddingForm = document.getElementById("weddingForm");
    const buffetForm = document.getElementById("buffetForm");
    const weddingMessage = document.getElementById("weddingMessage");
    const buffetMessage = document.getElementById("buffetMessage");

    const handleFormSubmit = (form, messageEl) => {
        if (!form || !messageEl) return;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            messageEl.textContent = `Thank you, ${data.name || "Guest"}! Your RSVP has been recorded.`;
            messageEl.style.opacity = 1;
            form.reset();
            setTimeout(() => (messageEl.style.opacity = 0), 5000);
        });
    };

    handleFormSubmit(weddingForm, weddingMessage);
    handleFormSubmit(buffetForm, buffetMessage);
});

