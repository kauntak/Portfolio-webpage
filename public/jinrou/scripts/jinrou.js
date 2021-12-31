var selectedLanguage = document.getElementById("selected-language");

function selectLang(event, language){
    event.preventDefault();
    selectedLanguage.className = language + "-list selected-language";
    selectedLanguage.innerHTML = event.target.innerHTML;
    let languageList = document.getElementsByClassName("language");
    for(let i = 0; i < languageList.length; i++){
        if(languageList[i].classList.contains(language))
            languageList[i].style.display = "initial";
        else
            languageList[i].style.display = "none";
    }
}

let passwordCheckboxes = document.getElementsByClassName("require-password-checkbox");
for(let i = 0; i < passwordCheckboxes.length; i++){
    passwordCheckboxes[i].addEventListener("onchange", togglePassword);
}

function togglePassword(event){
    let passwordDiv = document.getElementsByClassName("password");
    for(let i = 0; i < passwordDiv.length; i++){
        if(event.currentTarget.checked == true){
            //passwordDiv[i].style.display = "block";
            passwordDiv[i].style.maxHeight = "25px";
        }
        else{
            //passwordDiv[i].style.display = "none";
            passwordDiv[i].style.maxHeight = "0px";
        }
    }
}



function changeHTML(id, innerHTML, option, en, ja){
    if(!en) en == innerHTML;
    if(!ja) ja == innerHTML;
    if(!option){
        document.getElementById(id + "-en").innerHTML = en;
        //document.getElementById(id + "-ja").innerHTML = ja;
    } else{
        document.getElementById(id + "-en")[option] = en;
        //document.getElementById(id + "-ja")[option] = ja;
    }
}
function addHTML(id, innerHTML, en, ja){
    if(!en) en == innerHTML;
    if(!ja) ja == innerHTML;
    document.getElementById(id + "-en").innerHTML += en;
    //document.getElementById(id + "-ja").innerHTML += ja;
}

function addToRoomList(data){
    let roomHtml1 = `<input label="${data.roomSize}`;
    let roomHtml2 = `${data.roomName}" type="radio" name="radio-roomName" class="radio-roomName ${data.roomName}" value="${data.roomName}" required><br/>`;

    addHTML("room-list-content", undefined, roomHtml1 + " players - " + roomHtml2, roomHtml1 + "人 - " + roomHtml2);
    changeHTML("select-room", false, "disabled");
}

function updateRoomList(data){
    let elements = document.getElementsByClassName(`radio-roomName ${data.roomName}`);
    for(let i in elements){
        if(elements[i].parentElement.id = "room-list-content-en")
            elements[i].label = `${data.roomSize} players - ${data.roomName}`;
        else if(elements[i].parentElement.id = "room-list-content-ja"){
            elements[i].label = `${data.roomSize}人 - ${data.roomName}`;
        }
    }
}

function removeRoom(data){
    let elements = document.getElementsByClassName(`radio-roomName ${data.roomName}`);
    for(let i = elements.length - 1; i >= 0; i--){
        elements[i].remove();
    }
}


function slidePanel(panelId){
    document.getElementById(panelId).style.marginLeft = "-150%";
}

let ID = "";
var createdRoom = false;
var currentRoom = "";
var currentRole = "";
var roomSize = 0;
var socket = io();
socket.on("initiate", data => {
    ID = data.id;
    for(let i in data.rooms){
        addToRoomList(data.rooms[i]);
    }
});



document.getElementById("welcome-form-en").addEventListener("submit", event =>{
    event.preventDefault();
    socket.emit("set name", new FormData(event.target).get("username"));
    slidePanel("welcome");
    return false;
});
document.getElementById("welcome-form-ja").addEventListener("submit", event =>{
    event.preventDefault();
    socket.emit("set name", new FormData(event.target).get("username"));
    slidePanel("welcome");
    return false;
});

function openSelectOrCreateRoom(event, option){
    if(event.target.className.search("active") != -1) return;
    let oppositeOption = "select-room"
    if(option == "select-room")
        oppositeOption = "create-room";
    let elements = document.getElementsByClassName(oppositeOption);
    elements[0].addEventListener("transitionend", () => {
        let optionElements = document.getElementsByClassName(option);
        for(let i = 0; i < optionElements.length; i++)
            optionElements[i].style.maxHeight = "50vh";
    }, {once:true});
    for(let i = 0; i < elements.length; i++){
        elements[i].style.maxHeight = "0px";
    }
    elements = document.getElementsByClassName(oppositeOption + "-tab-button");
    for(let i = 0; i < elements.length; i++){
        elements[i].className = elements[i].className.replace(" active", "");
    }
    elements = document.getElementsByClassName(option + "-tab-button");
    for(let i = 0; i < elements.length; i++){
        elements[i].className += " active";
    }
}


document.getElementById("room-creation-form-en").addEventListener("submit", event =>{
    event.preventDefault();
    console.log("Create room");
    let formData = new FormData(event.target);
    socket.emit("create room", {roomName:formData.get("new-room-name-en"), password:formData.get("new-room-password-en")});
    createdRoom = true;
    return false;
});
document.getElementById("room-creation-form-ja").addEventListener("submit", event =>{
    event.preventDefault();
    let formData = new FormData(event.target);
    socket.emit("create room", {roomName:formData.get("new-room-name-ja"), password:formData.get("new-room-password-ja")});
    createdRoom = true;
    return false;
});

socket.on("create failed", () => {
    if(selectedLanguage.innerHTML=="English")
        alert("Room Could not be created. Please try again.");
    else if(selectedLanguage.innerHTML=="日本語")
        alert("部屋の作成に失敗しました、また作成してください。");
    createdRoom = false;
});
//socket.emit("Join Room", {roomName: roomName});

socket.on("room created", roomName => {
    console.log("room created: ",roomName);
    if(createdRoom){
        console.log(`The room ${roomName} that you made was created.`);
        slidePanel("room");
        currentRoom = roomName;
        createdRoom = false;
    }
    addToRoomList({roomName:roomName, roomSize:1});
    updateCurrentRoomSize(1);
});

function updateCurrentRoomSize(newRoomSize){
    changeHTML("number-of-players", newRoomSize);
    roomSize = newRoomSize;
}
document.getElementById("room-selection-form-en").addEventListener("submit", event => {
    event.preventDefault();
    let formData = new FormData(event.target);
    socket.emit("join room", {roomName:formData.get("radio-roomName"), password:formData.get("room-password-en")});
});
document.getElementById("room-selection-form-ja").addEventListener("submit", event => {
    event.preventDefault();
    let formData = new FormData(event.target);
    socket.emit("join room", {roomName:formData.get("radio-roomName"), password:formData.get("room-password-ja")});
});

socket.on("join failed", () => {
    if(selectedLanguage.innerHTML=="English")
        alert("Could not join room. Please try again.");
    else if(selectedLanguage.innerHTML=="日本語")
        alert("部屋に入れませんでした。もう一度お願い致します。");
});

socket.on("room joined", roomName => {
    currentRoom = roomName;
    slidePanel("room");
});

socket.on("room size", (data) =>{
    console.log("room size: ", data);
    updateRoomList(data);
    if(currentRoom == data.roomName){
        updateCurrentRoomSize(data.roomSize);
    }
});

function startGame(){
    console.log("Start Game Button Pushed");
    if(roomSize < 4){
        if(selectedLanguage.innerHTML=="English")
            alert("Please wait for 4 players or more!");
        else if(selectedLanguage.innerHTML=="日本語")
            alert("４人集まるまで待って下さい。");
    } else {
        socket.emit("start game", currentRoom);
    }
}


socket.on("game started", role => {
    console.log(role);
    updateRole(role);
    document.getElementById("game-lobby").style.marginLeft = "-150%";
});

function updateRole(role){
    currentRole = role;
    let gameDiv = document.getElementById("game-content");

    gameDiv.innerHTML
}

function getRoleHTML(role){
    html = `
    <div class="language en">
        
    </div>`;
}

document.getElementById("m").focus()

document.getElementById("form").addEventListener("submit", event => {
    event.preventDefault();
    console.log("Msg: ", document.getElementById("m").value);
    socket.emit("Chat Message", {
        value: document.getElementById("m").value,
        user: userName
    });
    document.getElementById("m").value = "";
});

socket.on("Chat Message", data=>{
    console.log(data.data.user + " : " + data.id);
    displayMessage(data);
})

function displayMessage(data) {
    let authorClass = "";
    let divClass = "";
    if(data.ID == ID){
        console.log("This person has sent a message");
        authorClass = "me";
        divClass = "myDiv";
    } else {
        authorClass = "you";
        divClass = "yourDiv";
    }
    const div = document.createElement("div");
    div.className = divClass;
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.className = "time";
    p.className = "time";
    p.innerText = moment().format("hh:mm");
    div.innerHTML =
        '<p class="' +
        authorClass +
        '">' +
        data.data.user +
        "</p>" +
        '<p class="message"> ' +
        data.data.value +
        "</p>";
    div.appendChild(p);
    li.appendChild(div);

    document.getElementById("messages").appendChild(li);
    //scroll to the bottom
    window.scrollTo(0, document.body.scrollHeight);

}