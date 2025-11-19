// script.js

document.addEventListener("DOMContentLoaded", () => {

    /***********************************/
    /***  ✨ VEGAS INTRO OVERLAY     ***/
    /***********************************/
    const introOverlay = document.getElementById("introOverlay");

    const closeIntro = () => {
        if (!introOverlay) return;
        introOverlay.classList.add("hidden");

        // remove overlay after fade animation
        setTimeout(() => {
            if (introOverlay) introOverlay.remove();
        }, 1200);
    };

    // Close on ANY click
    document.addEventListener("click", (e) => {
        // Prevent clicks through intro from triggering elements below
        if (introOverlay && !introOverlay.classList.contains("hidden")) {
            e.stopPropagation();
            e.preventDefault();
            closeIntro();
        }
    }, true);



    /***********************************/
    /***  📸 SLIDESHOW                ***/
    /***********************************/
    const track = document.querySelector(".slideshow-track");
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector(".arrow-right");
    const prevButton = document.querySelector(".arrow-left");

    if (track && slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Position slides side-by-side
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

        // Arrow navigation
        nextButton?.addEventListener("click", () => moveToSlide(currentIndex + 1));
        prevButton?.addEventListener("click", () => moveToSlide(currentIndex - 1));

        // Auto-sliding every 5 seconds
        setInterval(() => moveToSlide(currentIndex + 1), 5000);
    }



    /***********************************/
    /***  📝 RSVP FORMS              ***/
    /***********************************/
    const weddingForm = document.getElementById("weddingForm");
    const buffetForm = document.getElementById("buffetForm");
    const weddingMessage = document.getElementById("weddingMessage");
    const buffetMessage = document.getElementById("buffetMessage");

    const handleFormSubmit = (form, messageEl) => {
        if (!form || !messageEl) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            messageEl.textContent =
                "Thank you, " + (data.name || "Guest") + "! Your RSVP has been recorded.";

            messageEl.style.opacity = 1;
            form.reset();

            setTimeout(() => {
                messageEl.style.opacity = 0;
            }, 5000);
        });
    };

    handleFormSubmit(weddingForm, weddingMessage);
    handleFormSubmit(buffetForm, buffetMessage);
});
