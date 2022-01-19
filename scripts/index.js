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


const formInfoContainer = document.getElementById("form-inputs");
const formError = document.getElementById("send-error");

var form_id_js = "form";

var data_js = {
    access_token: "wxnzo8kijxotq2yhmurn1fta",
};

function js_onSuccess() {
    let check = document.querySelector(".check");
    check.classList.add("sent");
    sendButton.style.opacity = 0;
    sendingIcon.style.opacity = 0;
    changeEmailSentence();
    setTimeout(()=>check.style.opacity = 0, 2000);
}

function js_onError(error) {
    sendingIcon.style.opacity = "";
    if(error == "text is required.") error = "message is required."
    formError.innerHTML = "Something went wrong. Please Try again.<br/>Error: " + error;
    formError.style.display = "";
    formInfoContainer.style.maxHeight = "228px";
    sendButton.disabled = false;
    sendButton.value = "Send"
}

const sendButton = document.getElementById("js_send");
const sendingIcon = document.getElementById("sending-icon");
function js_send() {
    formInfoContainer.style.maxHeight = "0px";
    sendingIcon.style.opacity = 1; 
    sendButton.value = "Sending…";
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else if (request.readyState == 4) {
            js_onError(request.response);
        }
    };

    let name = document.querySelector(
        "#" + form_id_js + " [name='contact-name']"
    ).value;
    let email = document.querySelector(
        "#" + form_id_js + " [name='contact-email']"
    ).value;
    var message = document.querySelector(
        "#" + form_id_js + " [name='contact-text']"
    ).value;
    data_js["subject"] = "Contact form from:" + name + " : " + email;
    data_js["text"] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key])
        );
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

let emailSentence = document.getElementById("email-sentence");
async function changeEmailSentence(emailIntervalCount = 0) {
    if (emailIntervalCount >= 19) {
        return;
    }
    let text = emailSentence.innerText;
    emailSentence.innerText = text.substring(0, text.length - 5) + " to:";
    emailIntervalCount++;
    await new Promise((resolve) => setTimeout(() => resolve(), 80));
    changeEmailSentence(emailIntervalCount);
    // }, 100)
}

window.onclick = (event) => {
    if (event.target == sambaOverview) {
        sambaOverview.style.display = "none";
    } else if (event.target == cardOverview) {
        cardOverview.style.display = "none";
    } else if (event.target == menuOverview) {
        menuOverview.style.display = "none";
    } else if (event.target == jinrouOverview) {
        jinrouOverview.style.display = "none";
    }
};

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


let menuLinks = document.getElementsByClassName("menu-link");
for(let i = 0; i < menuLinks.length; i++){
    menuLinks[i].addEventListener('click', (event) => {
        console.log(event.target)
        if(window.innerWidth > 1100) return true;
        event.preventDefault();
        document.querySelector(event.target.parentElement.hash).scrollIntoView({
            behavior: 'smooth'
        });
    });
}