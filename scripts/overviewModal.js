const sambaOverview = document.getElementById("samba-overview");
const sambaAction = document.getElementById("samba-project-link");
const sambaCloseSpan = document.getElementById("samba-close");

const menuOverview = document.getElementById("menu-overview");
const menuAction = document.getElementById("menu-design-link");
const menuCloseSpan = document.getElementById("menu-close");

const cardOverview = document.getElementById("card-overview");
const cardAction = document.getElementById("card-design-link");
const cardCloseSpan = document.getElementById("card-close");

const jinrouOverview = document.getElementById("jinrou-overview");
const jinrouAction = document.getElementById("jinrou-project-link");
const jinrouCloseSpan = document.getElementById("jinrou-close");

jinrouOverview.addEventListener("click", () => jinrouOverview.style.display = "none");
sambaOverview.addEventListener("click", () => sambaOverview.style.display = "none");
cardOverview.addEventListener("click", () => cardOverview.style.display = "none");
menuOverview.addEventListener("click", () => menuOverview.style.display = "none");

sambaAction.onclick = () => {
    sambaOverview.style.display = "block";
    return false;
};
sambaCloseSpan.onclick = () => {
    sambaOverview.style.display = "none";
};

menuAction.onclick = () => {
    menuOverview.style.display = "block";
    return false;
};
menuCloseSpan.onclick = () => {
    menuOverview.style.display = "none";
};

cardAction.onclick = () => {
    cardOverview.style.display = "block";
    return false;
};
cardCloseSpan.onclick = () => {
    cardOverview.style.display = "none";
};

jinrouAction.onclick = () => {
    console.log("Jinrou Clicked");
    jinrouOverview.style.display = "block";
    return false;
};
jinrouCloseSpan.onclick = () => {
    jinrouOverview.style.display = "none";
};

const slideIndex = [1, 1];
const slideId = ["menu-gallery", "card-gallery"];
const dotId = ["menu-dot", "card-dot"];
showSlides(1, 0);
showSlides(1, 1);
function plusSlides(n, no) {
    showSlides((slideIndex[no] += n), no);
}

function currentSlide(n, no) {
    showSlides((slideIndex[no] = n), no);
}

function showSlides(n, no) {
    const slides = document.getElementsByClassName(slideId[no]);
    if (n > slides.length) {
        slideIndex[no] = 1;
    }
    if (n < 1) {
        slideIndex[no] = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex[no] - 1].style.display = "block";

    var dots = document.getElementsByClassName(dotId[no]);
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex[no] - 1].className += " active";
}