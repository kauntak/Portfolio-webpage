const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const rooms = require("./rooms");
const jinrou = require("./jinrouGame");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    console.log(req.headers);
    res.sendFile(__dirname + "/public/index.html");
});

let connections = [];

io.on("connection", (socket) => {
    connections.push({ id: socket.id, socket: socket, roomName: "" });
    socket.emit("initiate", { id: socket.id, rooms:rooms.getRooms() });
    console.log("Connected", socket.id);

    socket.on("set name", (name) => {
        let index = getConnectionIndex(socket.id);
        if(index == -1) return;
        connections[index].name = name;
    });

    socket.on("create room", (data) => {
        console.log(data);
        let result = rooms.createRoom(data.roomName, socket.id, data.password);
        if (result === false) socket.emit("create failed");
        else {
            console.log("Room Created");
            io.emit("room created", data.roomName);
        }
    });

    socket.on("join room", (data) => {
        let result = rooms.joinRoom(data.roomName, socket.id, data.password);
        if (result === false) socket.emit("join failed");
        else {
            socket.join(data.roomName);
            socket.emit("room joined", data.roomName);
            let index = getConnectionIndex(socket.id);
            connections[index].roomName = data.roomName;
            io.emit("room size", {
                roomName: result.roomName,
                roomSize: result.roomSize,
            });
        }
    });

    socket.on("start game", roomName => {
        let players = connections.filter(connection => connection.roomName == roomName);
        console.log("start game: " + roomName);
        console.log(players);
        jinrou.assignRoles(players);
        
        console.log(players);
        for(let i in players){
            players[i].socket.emit("game started", players[i].role);
            players[i].socket.join(`${players[i].room}~~~~${players[i].role}`);
        }
        rooms.startGame(roomName);
    });

    socket.on("vote", (data) => {});

    socket.on("chat message", (data) => {
        console.log("Msg received", data);
        io.to(data.roomName).emit("Chat Message", {
            data: data,
            id: socket.id,
        });
    });

    socket.on("disconnect", () => {
        // const user = users.removeUser(socket.id);
        // if (user) console.log(user.userName + " has left.");
        console.log("disconnected");
    });
});

http.listen(3000, () => {
    console.log("Server started");
});

function getConnectionIndex(id){
    return connections.findIndex(connection => connection.id == id);
}


