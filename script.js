document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        //loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
        freeMode: true,
        mousewheel: true,
        touchEventsTarget: 'container', // Gör att touch funkar på hela Swiper
        simulateTouch: true, // Simulerar touch för enhetlighet
        grabCursor: true,
        on: {
            // Körs när den aktiva sliden ändras
            slideChange: function () {
                // Återställ alla slides till standard
                this.slides.forEach((slide) => {
                    slide.style.transition = 'transform 0.5s ease-in-out';
                    slide.style.transform = 'scale(1)';
                    slide.style.opacity = '1';
                });
                // Skala upp den aktiva sliden
                const activeSlide = this.slides[this.activeIndex];
                activeSlide.style.transition = 'transform 0.5s ease-in-out';
                activeSlide.style.transform = 'scale(1.1)';
                activeSlide.style.opacity = '1';
            },
            // Körs vid initialisering för att sätta första aktiva slide
            init: function () {
                const activeSlide = this.slides[this.activeIndex];
                activeSlide.style.transition = 'transform 0.5s ease-in-out';
                activeSlide.style.transform = 'scale(1.1)';
                activeSlide.style.opacity = '1';
            }
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
});



let cvData = null;

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


async function togglePopup() {
    const popup = document.querySelector(".popup-container");
    const img = document.querySelector(".image-container");
    popup.style.display = 'flex';
    img.style.display = 'flex';
    popup.classList.toggle("open");
    img.classList.toggle("open");
    if(!cvData){
        await loadCVData();
    }
    if(!popup.classList.contains("open")){
        popup.addEventListener('transitionend', function handler() {
            popup.style.display = 'none';
            popup.removeEventListener('transitionend', handler);
        }, { once: true });

    }
    else{
        popup.style.display = 'flex';
    }
    if(img.classList.contains("open")){
        img.addEventListener('transitionend', function handler() {
            img.style.display = 'none';
            img.removeEventListener('transitionend', handler);
        }, { once: true });

    }
    else{
        img.style.display = 'flex';
    }
    
}


async function loadCVData() {
    try{
        const response = await fetch('/cv.json');
        if(response.ok){
            const cvData = await response.json();
            const educationList = document.querySelector("#education");
            const experienceList = document.querySelector("#cv-experience");

            educationList.innerHTML = '';
            experienceList.innerHTML = '';

            cvData.education.forEach(education => {
                const li = document.createElement('li');
                li.innerHTML = `
                <h2>${education.title}</h2>
                <h3>${education.school}</h3>
                <p>${education.year}</p>
                `;
                educationList.appendChild(li);
            });

            cvData.experience.forEach(experience => {
                const li = document.createElement('li');
                li.innerHTML = `
                <h2>${experience.title}</h2>
                <h3>${experience.company}</h3>
                <p>${experience.year}</p>
                `;
                experienceList.appendChild(li);
            });
        };

    }
    catch{

    }
}
const logo = document.querySelector(".logo");
logo.addEventListener("click", easterEgg1);

function easterEgg1() {
    const logo = document.querySelector(".logo");
    logo.classList.toggle("open");
    if(logo.classList.contains("open")){
        document.body.style.background = "lightblue";
    }
    else{
        document.body.style.background = "#FFFFFF";
    }
    
}

let keySequence = "";
document.addEventListener("keydown", function(event){
    keySequence += event.key;
    if(keySequence.length>4){
        keySequence = keySequence.slice(-4);

    }
    if(keySequence === "1337"){
        showModal();
        keySequence = "";
    }
});

function showModal() {
    const modal = document.getElementById("easter-egg-modal");
    modal.classList.remove("hidden");
    setTimeout(closeModal, 9000);
}

function closeModal() {
    const modal = document.getElementById("easter-egg-modal");
    modal.classList.add("hidden");
}

function openDemo() {
    window.open("https://github.com/Edgarskonnegard/LabbHTML.git", "_blank");
}
window.onload = (event) => {
    loadCVData();
    updateScrollCarousel();
};