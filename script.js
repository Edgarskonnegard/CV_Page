/*
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        //loop: true,
        slidesPerView: "auto",
        spaceBetween: 0,
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

*/

let cvData = null;

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

async function loadCVData() {
    try{
        const response = await fetch('./cv.json');
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
const cvModal = document.getElementById("cv-modal");
const cvButton = document.getElementById("cv-button");
cvButton.addEventListener('click', showCVModal);
function showCVModal() {
    if(!cvData){
        loadCVData();
    }
    cvModal.classList.remove("hidden");
    console.log("click")
}
function closeCVModal() {
    cvModal.classList.add("hidden");
}
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
    fetchGitHubRepos();
    updateSlidesPerView();
};

const username = "Edgarskonnegard";
const swiperWrapper = document.querySelector(".swiper-wrapper");
swiperWrapper.innerHTML = `<div class="loading-spinner"></div>`;
async function fetchGitHubRepos() {
    try {
        const [reposResponse, projectsResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}/repos`),
            fetch('./myRepos.json')
        ]);

        if (!reposResponse.ok || !projectsResponse.ok) {
            throw new Error("Kunde inte hämta data");
        }

        const allRepos = await reposResponse.json();
        const { repos: projects } = await projectsResponse.json(); // din JSON-struktur

        const projectNames = projects.map(p => p.name);
        const filteredRepos = allRepos.filter(repo => projectNames.includes(repo.name));

        // Matcha ihop varje repo med extra info från din json
        const finalRepos = filteredRepos.map(repo => {
            const extra = projects.find(p => p.name === repo.name);
            return {
                ...repo,
                iconIMG: extra.iconIMG,
                backgroundIMG: extra.backgroundIMG,
                hasPage: extra.hasPage
            };
        });

        console.log("Matchade projekt:", finalRepos);

        swiperWrapper.innerHTML = finalRepos.map(repo => `
            <div class="swiper-slide" 
                data-name="${repo.name}" 
                data-description="${repo.description || 'Ingen beskrivning'}" 
                data-img="${repo.backgroundIMG || 'vbg.jpg'}"
                data-has-page="${repo.hasPage}"
            >
                <div class="project-container">
                    <img src="${repo.iconIMG || 'vbg.jpg'}" alt="${repo.name}">
                </div>
            </div>
        `).join("");

        initSwiper();
    } catch (error) {
        console.error(error);
        swiperWrapper.innerHTML = `<div class="swiper-slide"> <p>Kunde inte ladda projekt.</p> </div>`;
    }
}


function initSwiper() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        //loop: true,
        slidesPerView: "3",
        centeredSlides: true,
        slideToClickedSlide: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
        freeMode: false,
        mousewheel: true,
        touchEventsTarget: 'container', // Gör att touch funkar på hela Swiper
        simulateTouch: true, // Simulerar touch för enhetlighet
        grabCursor: true,
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                // Försök hitta aktiv slide, ell
                const activeSlide = this.slides[this.activeIndex]; // Använd Swipers interna activeIndex
                updateSlideInfo(activeSlide);
            },
            slideChange: function () {
                const activeSlide = this.slides[this.activeIndex];
                updateSlideInfo(activeSlide);
            },
        },
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
    });
}

async function updateSlideInfo(activeSlide) {
    const slideInfo = document.querySelector('.slide-info');
    if (activeSlide) {
        const name = activeSlide.dataset.name;
        const description = activeSlide.dataset.description;
        //const backgroundIMG = activeSlide.dataset.backgroundIMG;
        const hasPage = activeSlide.dataset.hasPage === "true";
        //slideInfo.style.backgroundImage = `url(${backgroundIMG || 'vbg.jpg'})`;
        if(hasPage){
            slideInfo.innerHTML = `
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="slide-buttons">
                    <button id="slide-button">
                    <a href="https://${username}.github.io/${name}/"> gh pages </a></button>
                    <button id="slide-button">
                    <a href="https://github.com/${username}/${name}"> view repo </a></button>
                </div>
            `;
        }
        else{
            slideInfo.innerHTML = `
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="slide-buttons">
                    <button id="slide-button">
                    <a href="https://github.com/${username}/${name}"> view repo </a></button>
                </div>
                `;

        }
    } else {
        console.warn("Ingen aktiv slide hittad");
        slideInfo.innerHTML = `
            <h3>Inget projekt valt</h3>
            <p>Välj ett projekt i karusellen</p>
        `;
    }
}
function updateSlidesPerView() {
    const smallScreen = window.matchMedia("(max-width: 768px)"); // Mobil
    const mediumScreen = window.matchMedia("(min-width: 769px) and (max-width: 1024px)"); // Surfplatta
    const largeScreen = window.matchMedia("(min-width: 1025px)"); // Desktop

    if (smallScreen.matches) {
        swiper.params.slidesPerView = 3; // 1 slide för små skärmar
    } else if (mediumScreen.matches) {
        swiper.params.slidesPerView = 5; // 2 slides för mellanstora skärmar
    } else if (largeScreen.matches) {
        swiper.params.slidesPerView = 5; // 3 slides för stora skärmar
    }

    swiper.update(); // Uppdaterar Swiper med nya parametrar
}