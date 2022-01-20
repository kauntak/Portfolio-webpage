function openAbout(event, option) {
    if (event.target.className.search("active") != -1) return;
    let oppositeOption = "resume-content";
    let resumeLinkStyle = "";
    let resumeLinkDelay = 0;
    if (option == oppositeOption) {
        oppositeOption = "about-content";
        resumeLinkStyle = "300px";
        resumeLinkDelay = 250;
    }
    let element = document.getElementById(oppositeOption);
    let eventTriggered = false;
    element.style.maxHeight = "0px";
    element.addEventListener(
        "transitionend",
        () => {
            if (eventTriggered) return;
            eventTriggered = true;
            document.getElementById(option).style.maxHeight = "";
        },
        { once: true }
    );
    let oppositeButton = document.getElementById(oppositeOption + "-tab-button");
    oppositeButton.className = oppositeButton.className.replace(" active", "");
    document.getElementById(option + "-tab-button").className += " active";
    setTimeout(() => document.getElementById("resume-link").style.maxWidth = resumeLinkStyle, resumeLinkDelay);
}

const accordion = document.getElementsByClassName("accordion-button");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function() {
    this.classList.toggle("active");
    console.log(this);
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      content.style.maxHeight = "0px";
    } else {
      content.style.display = "block";
      content.style.maxHeight = "";
    }
  });
} 