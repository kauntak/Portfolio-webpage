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


