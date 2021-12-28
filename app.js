const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const users = require('./users');

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    console.log(req.headers);
    res.sendFile(__dirname + "/public/index.html");
});
let thisRoom = "";

io.on("connection", socket => {
    console.log("Connected");
    
    socket.on("Join Room", data =>{
        let newUser = users.addUser(socket.id, data.userName, data.roomName);
        socket.emit('Send Data', {id: socket.id, userName:newUser.userName, roomName:newUser.roomName})
        thisRoom = newUser.roomName;
        console.log(newUser);
        socket.join(newUser.roomName);
        socket.emit("Send Data", {id:socket.id, userName:newUser.userName, roomName:newUser.roomName});
        thisRoom = newUser.roomName;
        socket.join(newUser.roomName);
    });

    socket.on("Chat Message", data => {
        console.log("Msg received", data)
        io.to(thisRoom).emit("Chat Message", {data:data, id:socket.id});
    });

    socket.on("disconnect", () => {
        const user = users.removeUser(socket.id);
        if(user)
            console.log(user.userName + " has left.");
            console.log("disconnected");
    });

});



http.listen(3000, () => {
    console.log('Server started');
});