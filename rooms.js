module.exports = {
    createRoom,
    setRole,
    joinRoom,
    leaveRoom,
    getRooms,
    startGame,
    endGame
};

let rooms = [];


function setRole(roomName, id, role) {
    const roomIndex = getRoomIndex(roomName);
    if(roomIndex == -1) return;
    const index = rooms[roomIndex].users.findIndex((user) => user.socketID == id);
    if (index != -1) {
        rooms[roomIndex].users[index].role = role;
        return users[index];
    }
}

function createRoom(roomName, id, password) {
    if (getRoomIndex(roomName) != -1) return false;
    rooms.push({
        hasStarted: false,
        roomName: roomName,
        password: password,
        users: [id],
    });
}

function leaveRoom(roomName, id) {
    const roomIndex = getRoomIndex(roomName);
    if (roomIndex == -1) return;
    const userIndex = rooms[roomIndex].users.findIndex((user) => user.id == id);
    if (userIndex == -1) return;
    rooms[roomIndex].users.splice(userIndex, 1);
    if (rooms[roomIndex].users.length == 0) rooms.splice(roomIndex, 1);
}

function joinRoom(roomName, id, password) {
    const roomIndex = getRoomIndex(roomName);
    if (roomIndex == -1 || rooms[roomIndex].password != password) return false;
    rooms[roomIndex].users.push(id);
    return {roomName:roomName, roomSize:rooms[roomIndex].users.length};
}

function getRoomIndex(roomName) {
    return rooms.findIndex((room) => room.roomName == roomName);
}

function getRooms() {
    return rooms
        .filter((room) => room.hasStarted == false)
        .map((room) => {
            return { roomName: room.roomName, roomSize: room.users.length };
        });
}

function getUsers(roomName){
    const roomIndex = getRoomIndex(roomName);
    if(roomIndex == -1) return;
    return rooms[roomIndex].users;
}

function startGame(roomName){
    const roomIndex = getRoomIndex(roomName);
    if(roomIndex == -1) return;
    rooms[roomIndex].hasStarted = true;
}

function endGame(roomName){
    const roomIndex = getRoomIndex(roomName);
    if(roomIndex == -1) return;
    rooms[roomIndex].hasStarted = false;
}