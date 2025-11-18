// ----- FORM HANDLING (Wedding RSVPs) -----
const weddingForm = document.getElementById("weddingForm");
const weddingMessage = document.getElementById("weddingMessage");

weddingForm.addEventListener("submit", async e => {
    e.preventDefault();

    weddingMessage.textContent = "Submitting...";

    const formData = new FormData(weddingForm);
    const data = Object.fromEntries(formData);

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
