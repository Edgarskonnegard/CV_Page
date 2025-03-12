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
    
    popup.classList.toggle("open");
    img.classList.toggle("open");
    if(!cvData){
        await loadCVData();
    }
    
}

async function loadCVData() {
    try{
        const response = await fetch('cv.json');
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