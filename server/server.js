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
const Game = require("./mongoose/models/game");
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
app.set('json spaces', 2)
app.use(require('./routes/user'));
app.use(require('./routes/game'));
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
    //console.log("SOCKET: " + socket.id + " - generated new sessionID: " + socket.sessionID);
    next();
});


function goLive() {
    //Start server
    server.listen(process.env.PORT, () => {
        console.log(`Discovery server running on port ${process.env.PORT}`);

    });

    //On connection assign handlers
    io.on('connection', (socket) => {

        //console.log("SOCKET: " + socket.id + " - connected with sessionID: " + socket.sessionID);

        socket.on('disconnect', () => {
            //console.log(`SOCKET: ${socket.id} - disconnected`);
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
            if (session) {
                console.log("USER: " + session.username + " - logout");
                sessionStore.deleteSession(socket.sessionID);

            }

        });

        socket.on('login', (message) => {

            User.findOne({ username: message.username })
                .then(function (dbUser) {
                    if (dbUser != null) {
                        if (!userAlreadyLogged(message.username)) {
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

            User.findOne({ username: message.username })
                .then(function (dbUser) {
                    if (dbUser != null) {
                        socket.emit("signup_error", "Username already taken");
                    } else {
                        var newUser = new User({
                            username: message.username,
                            password: message.password,
                            goodWins: 0,
                            badWins: 0,
                            playedGames: [],
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


            var room = rooms.filter(function (room) { return room.name === message.name })[0];

            if (!room) {
                room = { name: message.name, players: [], closed: false };
                rooms.push(room);
            }
            if (!room.closed) {
                socket.join(room.name)

                const session = sessionStore.findSession(socket.sessionID);
                if (session) {
                    socket.emit("room", { name: room.name, username: session.username, peerID: message.peerID })
                    let player = { peerID: message.peerID, username: session.username };
                    console.log("USER: " + session.username + " - joined room " + room.name);

                    room.players.forEach((p) => {
                        socket.emit("new_peer", p);
                    })

                    room.players.push(player)
                    socket.broadcast.to(room.name).emit("new_peer", player);
                }
            } else if (room.closed) {
                const session = sessionStore.findSession(socket.sessionID);
                if (session) {
                    let exPlayer = room.players.filter(function (player) { return player.username == session.username && player.peerID == null })[0]
                    if (exPlayer) {
                        socket.join(room.name)

                        socket.emit("restore_room", { name: room.name, username: session.username, peerID: message.peerID })
                        let player = { peerID: message.peerID, username: session.username };
                        console.log("USER: " + session.username + " - rejoined room " + room.name);

                        let newPlayers = room.players.filter(function (player) { return player.username !== session.username })
                        room.players = newPlayers

                        room.players.forEach((p) => {
                            socket.emit("new_peer", p);
                        })

                        room.players.push(player)
                        socket.broadcast.to(room.name).emit("restore_peer", player);
                    } else {
                        socket.emit("room_unavailable")
                    }
                }
            }
        });

        socket.on('close_room', (message) => {

            var spliceIndex;
            var room = rooms.filter(function (room, index) { if (room.name === message) { spliceIndex = index; return true; } })[0];

            if (room) {
                console.log("ROOM: " + message + " - closed")
                room.closed = true;
                rooms.splice(spliceIndex, 1, room);
                io.to(room.name).emit("room_closed");
            }

        });

        socket.on('peer_destroyed', (message) => {
            //console.log("PEER: " + message.id + " - destroyed ");
            removePeerIDFromRoom(message.peerId, socket)
        });

        socket.on('save', (message) => {
            saveGame(message, socket)
            console.log("USER: " + message.username + " - saved the game ");
        });

        socket.on('send_stats', (message) => {
            let stats = {
                totalWin: 0,
                totalLost: 0,
                badWin: 0,
                goodWin: 0,
                totalPlayed: 0,
                games: []
            }
            User.findOne({ username: message.username })
                .then(function (dbUser) {
                    if (dbUser != null) {
                        stats.badWin = dbUser.badWins
                        stats.goodWin = dbUser.goodWins
                        stats.totalWin = dbUser.goodWins + dbUser.badWins
                        stats.totalPlayed = dbUser.playedGames.length
                        stats.totalLost = stats.totalPlayed - stats.totalWin

                        Game.find({ gameCode: { $in: dbUser.playedGames } })
                            .then(function (dbGame) {
                                if (dbGame != null) {
                                    stats.games = dbGame
                                    socket.emit("user_stats", stats)
                                }
                            })
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
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
                    username: message.username
                });
                sessionStore.saveSession(socket.sessionID, {
                    connected: true,
                    username: message.username
                });
                console.log("USER: " + message.username + " - connected");

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

    rooms.forEach((room) => {
        let newPlayers = room.players.filter(function (player) { return player.username !== username })
        let removedPlayer = room.players.filter(function (player) { return player.username == username })[0]

        if (newPlayers.length != room.players.length) {
            console.log("USER: " + username + " - removed from room " + room.name);
            //socket.broadcast.to(room.name).emit("peer_removed", removedPlayer.peerID);
            if (room.closed) {
                removedPlayer.peerID = null
                newPlayers.push(removedPlayer)
            }
            room.players = newPlayers
            socket.leave(room.name)

        }
    })
}

//Given a peerID the player will be deleted from the room
function removePeerIDFromRoom(id, socket) {
    rooms.forEach((room, index, list) => {
        let newPlayers = room.players.filter(function (player) { return player.peerID !== id })
        let removedPlayer = room.players.filter(function (player) { return player.peerID == id })[0]
        if (newPlayers.length != room.players.length) {
            console.log("USER: " + removedPlayer.username + " - left room " + room.name);
            if (room.closed) {
                removedPlayer.peerID = null
                newPlayers.push(removedPlayer)
            }
            room.players = newPlayers
            socket.broadcast.to(room.name).emit("peer_removed", id);
            socket.leave(room.name)
            if (room.players.filter(function (player) { return player.peerID !== null }).length == 0) {
                list.splice(index, 1)
                console.log("ROOM: " + room.name + " deleted")
            }
        }
    })

}

function saveGame(message, socket) {

    Game.findOne({ gameCode: message.gameCode })
        .then(function (dbUser) {
            if (dbUser == null) {

                let players = message.players.map((player) => {
                    return {
                        "username": player.username,
                        "role": player.role
                    }
                })


                players.forEach((player) => {
                    User.findOne({ username: player.username })
                        .then(function (dbUser) {
                            if (dbUser != null) {
                                let playedGames = dbUser.playedGames
                                playedGames = [...playedGames, message.gameCode]
                                let goodWins = dbUser.goodWins
                                let badWins = dbUser.badWins
                                if (message.winners == "goodWon" && roleIsGood(player.role)) {
                                    goodWins = goodWins + 1
                                } else if (message.winners == "badWon" && !roleIsGood(player.role)) {
                                    badWins = badWins + 1
                                }
                                User.findOneAndUpdate({ "username": player.username },
                                    { "goodWins": goodWins, "badWins": badWins, "playedGames": playedGames })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })

                var newGame = new Game({
                    gameCode: message.gameCode,
                    winners: message.winners,
                    players: players,
                    history: message.history
                });

                Game.create(newGame)
                    .then(function (_) {
                        socket.emit("save_done");
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
}

function roleIsGood(role) {
    if (role == "Wolf" || role == "Wolf") {
        return false
    }
    return true
}