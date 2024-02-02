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
    var params = {
        from_name : document.getElementById('yourName').value, 
        email_id : document.getElementById('email_id').value, 
        message : document.getElementById('message').value, 
    }

    emailjs.send("service_2vp2kfl", "template_mem7sgt", params).then(function (res) {
        alert("Success" + res.status);
    }) 
}