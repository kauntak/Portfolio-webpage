let userName = prompt("whats your name");
let roomName = prompt("room name");
let ID = "";
var socket = io();
socket.emit("Join Room", {userName:userName, roomName: roomName});

socket.on("Send Data", data => {
    ID = data.id;
    console.log("My Id: ", ID);
});

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