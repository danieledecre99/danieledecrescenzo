const header = document.querySelector("header");

window.addEventListener ("scroll", function () {
header.classList.toggle ("sticky", window.scrollY > 200)
})


let menu = document.querySelector ('#menu-icon');
let navlist= document.querySelector ('.navlist');

menu.onclick = () => {
    menu.classList.toggle ('bx-x');
    navlist.classList.toggle ('open');
}

window.onscroll = () => {
    menu.classList.remove ('bx-x');
    navlist.classList.remove ('open');
}

const sr = ScrollReveal ({
    distance: '40px',
    duration: 2050,
    delay: 200,
    reset: true
})

sr.reveal('.hero-text', {origin: 'top'});
sr.reveal('.box, .about-text', {origin: 'bottom'});
sr.reveal('.about-text, .title, .contact-form h2', {origin: 'top'});
sr.reveal('.contact-form', {origin: 'left'});
sr.reveal('.hero-cv-text, .portfolio-cv-text', {origin: 'top'});
sr.reveal('.about-cv-text', {origin: 'bottom'});
sr.reveal('.hero-project-text, .portfolio-project-text', {origin: 'top'});
sr.reveal('.about-project-text', {origin: 'bottom'});

//GALLERY PHOTO

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener ("mousedown", (e) => {
        const startX = e.clientX; 
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; 

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition; 
        }

        const handleMouseUp = () => {
            document.removeEventListener ("mousemove", handleMouseMove);
            document.removeEventListener ("mouseup", handleMouseUp);
        }

        document.addEventListener ("mousemove", handleMouseMove);
        document.addEventListener ("mouseup", handleMouseUp);
    })

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"})
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }


    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`; 
    }


    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}


window.addEventListener('load', initSlider);

//CONTACT FORM EMAILJS

function SendMail() {

    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init("whq-QrWdL5QVlPrWb");
    })();
    
    // Ottieni i valori dei campi
    var nameField = document.getElementById('yourName');
    var emailField = document.getElementById('email_id');
    var messageField = document.getElementById('message');

    var name = nameField.value.trim();
    var email = emailField.value.trim();
    var message = messageField.value.trim();

    var isFormValid = true;

    // Reset delle classi invalid
    nameField.classList.remove('invalid');
    emailField.classList.remove('invalid');
    messageField.classList.remove('invalid');

    // Controllo del nome
    if (name === "") {
        alert("Il campo nome è obbligatorio. Inserisci il tuo nome.");
        nameField.classList.add('invalid');
        isFormValid = false;
    }

    // Controllo dell'email
    if (email === "") {
        alert("Il campo email è obbligatorio. Inserisci un'email valida.");
        emailField.classList.add('invalid');
        isFormValid = false;
    } else if (!isValidEmail(email)) {
        alert("L'indirizzo email inserito non è valido. Inserisci un'email corretta.");
        emailField.classList.add('invalid');
        isFormValid = false;
    }

    // Controllo del messaggio
    if (message === "") {
        alert("Il campo messaggio è obbligatorio. Scrivi un messaggio.");
        messageField.classList.add('invalid');
        isFormValid = false;
    }

    // Interrompi l'invio se il form non è valido
    if (!isFormValid) {
        return;
    }

    // Parametri per EmailJS
    var params = {
    
        from_name: name,   // Nome del mittente
        email_id: email,   // Email del mittente
        message: message   // Messaggio
    };

  
    // Invia l'email tramite EmailJS
    emailjs.send("service_ta250tj", "template_2887edg", params)
        .then(function (res) {
            console.log("Email inviata con successo! Stato:", res.status);
            alert("Email inviata con successo!");
        })
        .catch(function (err) {
            console.error("Errore durante l'invio dell'email:", err);
            alert("Errore durante l'invio dell'email. Riprova più tardi.");
        });
}

// Funzione per validare l'email
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

