document.addEventListener("DOMContentLoaded", () => {

    // ⭐ SCROLL DOWN WHEN INTRO CLICKED
    const intro = document.getElementById("introSection");

    intro.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });

    // ⭐ SLIDESHOW
    const track = document.querySelector(".slideshow-track");
    const slides = Array.from(track.children);
    let index = 0;

    const move = () => {
        const width = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${width * index}px)`;
    };

    document.querySelector(".arrow-right").onclick = () => {
        index = (index + 1) % slides.length;
        move();
    };

    document.querySelector(".arrow-left").onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        move();
    };

    setInterval(() => {
        index = (index + 1) % slides.length;
        move();
    }, 5000);
});
