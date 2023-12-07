//Enviorment variables
require("dotenv").config({ path: "./config/config.env" });
//Session store and random session ID
const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
//Server
const express = require("express");
const app = express();
const cors = require("cors");
const server = require('http').createServer(app);
//DB
const { mongoose } = require("mongoose");
const User = require("./mongoose/models/user");
const bodyParser = require("body-parser");
//Socket.io
const sockets = require("socket.io");
const io = sockets(server, { cors: { origin: "*" } });

//Rooms array
/**
 * { name, players: [{ peerID, username}], closed };
 */
const rooms = []

//Add cors policy
app.use(cors());
//Decode every request body to json format
app.use(bodyParser.json());
app.use(require('./routes/user'));
app.get('/', (req, res) => {
    res.send('LUPUS' + '<br/>' + 'Discovery server running');
});

// Configure Mongo
const db = "mongodb://localhost/LupusDB";

// Connect to Mongo with Mongoose
mongoose.connect(
    db,
    { useNewUrlParser: true }
)
    .then(() => {
        const art = process.env.ASCII_ART.replace(/\\n/g, '\n');
        console.log(art);
        console.log("LupusDB connected");
        goLive();
    })
    .catch(err => console.log(err));

//Middleware for session management
io.use((socket, next) => {
    //If on connection the socket brings the sessionID
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
        //Find existing session
        const session = sessionStore.findSession(sessionID);
        if (session && session.connected == false) {
            console.log("USER: " + session.username + " - connection restored");
            socket.sessionID = sessionID;
            sessionStore.saveSession(socket.sessionID, {
                connected: true,
                username: session.username
            });
            socket.emit("session", {
                sessionID: socket.sessionID,
                username: session.username
            });
            return next();
        }
    }
    //Create new session
    socket.sessionID = randomId();
    console.log("SOCKET: " + socket.id + " - generated new sessionID: " + socket.sessionID);
    next();
});


function goLive() {
    //Start server
    server.listen(process.env.PORT, () => {
        console.log(`Discovery server running on port ${process.env.PORT}`);

    });

    //On connection assign handlers
    io.on('connection', (socket) => {

        console.log("SOCKET: " + socket.id + " - connected with sessionID: " + socket.sessionID);

        socket.on('disconnect', () => {
            console.log(`SOCKET: ${socket.id} - disconnected`);
            let session = sessionStore.findSession(socket.sessionID);
            if (session) {
                console.log("USER: " + session.username + " - disconnected");
                //Save session as not connected
                sessionStore.saveSession(socket.sessionID, {
                    connected: false,
                    username: session.username
                });
                //If user already in room
                removeUsernameFromRoom(session.username, socket)
            }
        });

        socket.on('logout', () => {
            let session = sessionStore.findSession(socket.sessionID);
            if (session) console.log("USER: " + session.username + " - logout");

            sessionStore.deleteSession(socket.sessionID);
        });

        socket.on('login', (message) => {

            User.findOne({ username: message.name })
                .then(function (dbUser) {
                    if (dbUser != null) {
                        if (!userAlreadyLogged(message.name)) {
                            checkPassword(dbUser, socket, message);
                        } else {
                            socket.emit("login_error", "User already logged");
                        }
                    } else {
                        socket.emit("login_error", "Username not found");
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        socket.on('signup', (message) => {

            User.findOne({ username: message.name })
                .then(function (dbUser) {
                    if (dbUser != null) {
                        socket.emit("signup_error", "Username already taken");
                    } else {
                        var newUser = new User({
                            username: message.name,
                            password: message.password
                        });

                        User.create(newUser)
                            .then(function (dbUser) {
                                socket.emit("signup_done");
                            })
                            .catch(function (err) {
                                // If an error occurred, log it
                                console.log(err);
                            });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        });


        socket.on('room', (message) => {

            console.log("Peer " + socket.sessionID + " joined room " + JSON.stringify(message.name));

            var room = rooms.filter(function (room) { return room.name === message.name })[0];
            if (!room) {
                room = { name: message.name, players: [], closed: false };
                rooms.push(room);
            }

            socket.join(room.name)

            const session = sessionStore.findSession(socket.sessionID);

            //non dovrebbe più servire perchè viene rimosso on disconnect
            /*
            //remove if already present
            let removedPlayers = room.players.filter(function (player) { return player.username !== session.username })
            let oldPlayer = room.players.filter(function (player) { return player.username == session.username })

            if (removedPlayers.length != room.players.length) {
                room.players = removedPlayers

                console.log(oldPlayer)

                socket.broadcast.to(room.name).emit("peer_removed", oldPlayer.peerID);
            }
            */
            
            room.players.forEach((p) => {
                socket.emit("new_peer", p);
            })


            player = { peerID: message.id, username: session.username };
            room.players.push(player)
            socket.emit("room", room.name)
            socket.broadcast.to(room.name).emit("new_peer", message.id);

        });

        socket.on('peer_destroyed', (message) => {
            console.log("PEER: " + message.id + " - destroyed ");
            removePeerIDFromRoom(message.id, socket)
        });
    });
}

function checkPassword(dbUser, socket, message) {
    dbUser.comparePassword(message.password, function (err, isMatch) {
        if (err) {
            socket.emit("login_error", "Something went wrong");
        } else {
            if (isMatch) {
                socket.emit("session", {
                    sessionID: socket.sessionID,
                    username: message.name
                });
                sessionStore.saveSession(socket.sessionID, {
                    connected: true,
                    username: message.name
                });

            } else {
                socket.emit("login_error", "Wrong password");
            }
        }
    });
}

function userAlreadyLogged(username) {
    let sessions = sessionStore.findAllSessions();
    let logged = sessions.filter(function (value) {
        if (value.username === username) {
            return value.connected;
        }
    })
    return logged.length;
}

//Given a username if the room is still open it will be removed,
//if the room is closed the peerID will be deleted but the username kept to enable the reconnection during the game
function removeUsernameFromRoom(username, socket) {
    console.log("USER: " + username + " - removed from room");

    rooms.forEach((room) => {
        let newPlayers = room.players.filter(function (player) { return player.username !== username })
        let removedPlayer = room.players.filter(function (player) { return player.username == username })[0]

        if (newPlayers.length != room.players.length) {
            socket.broadcast.to(room.name).emit("peer_removed", removedPlayer.peerID);
            if (room.closed) {
                removedPlayer.peerID = null
                newPlayers.push(removedPlayer)
            }
            room.players = newPlayers

        }
    })
}

//Given a peerID the player will be deleted from the room
function removePeerIDFromRoom(id, socket) {
    rooms.forEach((room) => {
        let newPlayers = room.players.filter(function (player) { return player.peerID !== message.id })
        let removedPlayer = room.players.filter(function (player) { return player.username == id })[0]

        if (newPlayers.length != room.players.length) {
            room.players = newPlayers
            console.log("USER: " + removedPlayer.username + " - removed from room");
            socket.broadcast.to(room.name).emit("peer_removed", message.id);
        }
    })
}



