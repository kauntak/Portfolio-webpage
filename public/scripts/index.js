var sambaOverview = document.getElementById("samba-overview");
var sambaAction = document.getElementById("samba-project-link");
var sambaCloseSpan = document.getElementById("samba-close");

var menuOverview = document.getElementById("menu-overview");
var menuAction = document.getElementById("menu-design-link");
var menuCloseSpan = document.getElementById("menu-close");

var cardOverview = document.getElementById("card-overview");
var cardAction = document.getElementById("card-design-link");
var cardCloseSpan = document.getElementById("card-close");

var jinrouOverview = document.getElementById("jinrou-overview");
var jinrouAction = document.getElementById("jinrou-project-link");
var jinrouCloseSpan = document.getElementById("jinrou-close");

window.onclick = (event) => {
    if(event.target == sambaOverview){
        sambaOverview.style.display = "none";
    } else if(event.target == cardOverview){
        cardOverview.style.display = "none";
    } else if(event.target == menuOverview){
        menuOverview.style.display = "none";
    } else if(event.target == jinrouOverview){
        jinrouOverview.style.display == "none";
    }
}


sambaAction.onclick = () => {
    sambaOverview.style.display = "block";
    return false;
}
sambaCloseSpan.onclick = () =>{
    sambaOverview.style.display = "none";
}

menuAction.onclick = () => {
    menuOverview.style.display = "block";
    return false;
}
menuCloseSpan.onclick = () =>{
    menuOverview.style.display = "none";
}

cardAction.onclick = () => {
    cardOverview.style.display = "block";
    return false;
}
cardCloseSpan.onclick = () =>{
    cardOverview.style.display = "none";
}

jinrouAction.onclick = () => {
    console.log("Jinrou Clicked");
    jinrouOverview.style.display = "block";
    return false;
}
jinrouCloseSpan.onclick = () =>{
    jinrouOverview.style.display = "none";
}


var slideIndex = [1,1];
var slideId = ["menu-gallery", "card-gallery"];
var dotId = ["menu-dot", "card-dot"];
showSlides(1, 0);
showSlides(1, 1);
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function currentSlide(n, no) {
    showSlides(slideIndex[no] = n, no);
  }


function showSlides(n, no) {
  var i;
  var slides = document.getElementsByClassName(slideId[no]);
  if (n > slides.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = slides.length}
  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }
  slides[slideIndex[no] - 1].style.display = "block";  

  var dots = document.getElementsByClassName(dotId[no]);
  for(i = 0; i < dots.length; i++){
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex[no] - 1].className += " active";
}