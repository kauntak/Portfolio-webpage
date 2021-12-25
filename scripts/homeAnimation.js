var nameSentenceElement = document.getElementById("name-sentence");//.addEventListener("animationstart", typeFullName(), false);
var nickNameSentenceElement = document.getElementById("nick-name-sentence");//.addEventListener("animationstart", changeFullNameToNickName(), false);
var titleSentenceElement = document.getElementById("title-sentence");//.addEventListener("animationstart", typeTitle(), false);
var smallScreenInfo = document.getElementById("small-screen-info");


nameSentenceElement.onanimationend = typeFullName;
nickNameSentenceElement.onanimationend = changeFullNameToNickName;
titleSentenceElement.onanimationend = typeTitle;
let fullName = document.getElementById("full-name").innerHTML;
let nickName = document.getElementById("nick-name").innerHTML;
var typeWriterSpeed = 50;
var text;
var i;
var id;
var untilIndex;
function addText() {
    if (i < text.length && window.innerWidth >= 1100) {
        document.getElementById(id).innerHTML += text.charAt(i);
        i++;
        setTimeout(addText, typeWriterSpeed);
    } else if(window.innerWidth >= 1100){
        document.getElementById(id).innerHTML = text;
    }
}

function typeNickname(){
    if(text.length > untilIndex && window.innerWidth >= 1100){
        text = text.slice(0,-1);
        document.getElementById(id).innerHTML = text;
        setTimeout(typeNickname, typeWriterSpeed);
    } else if(window.innerWidth < 1100){
        document.getElementById(id).innerHTML = nickName;
    }else{
        text = nickName;
        addText();
    }
}
function typeFullName(){
    i = 0;
    text = fullName;
    id = "name-to-edit";
    document.getElementById(id).innerHTML = "";
    addText();
}

function changeFullNameToNickName(){
    i = 0;
    while(i < nickName.length && i < fullName.length){
        if(fullName[i] != nickName[i])
            break;
        i++;
    }
    untilIndex = i;
    id = "name-to-edit";
    text = fullName;
    document.getElementById(id).innerHTML = "";
    typeNickname();
}

function typeTitle(){
    text = document.getElementById("title").innerHTML;
    id = "title-to-edit";
    i = 0;
    document.getElementById(id).innerHTML = "";
    addText();
    setTimeout(condenseIn, 2000);
}

function animateSkillOrb(){
    if(window.innerWidth < 1100)
        var timeout = 2000;
    else
        timeout = 15000;
    setTimeout(condenseIn, 2000);
}
function condenseIn(){
    let id = null;
    const element = document.getElementById("myCanvasContainer");
    let opacity = 0;
    let scale = 2;
    clearInterval(id);
    id = setInterval(frame, 5);

    function frame(){
        if(scale <= 1 && opacity >= 1 ){
            clearInterval(id);
        } else {
            if(opacity < 1){
                opacity += 0.01;
                element.style.opacity = opacity;
            } 
            if(scale >= 1) {
                scale -= 0.01;
                element.style.transform = `scale3d(${scale},${scale},${scale})`;
            } 
            console.log(scale, opacity);
        }
    }
}