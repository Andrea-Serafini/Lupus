import { Peer } from 'peerjs';
import { addHistory, addPlayer, removePlayer, setGameCode, setHistory, setPhase, setPlayers, updatePlayer } from '../redux/game/reducer';
import { setWolfNumber, toggleExtras } from '../redux/game/reducer';

var peerId;
var peer;
var connections = []


export function createPeer(socket, room, dispatch) {
    peer = new Peer();

    peer.on('open', function (id) {
        peerId = id;
        console.log('My peer ID is: ' + id);
        socket.emit('room', { name: room, peerID: peerId });
    });


    peer.on("connection", (conn) => {

        conn.on("data", (data) => {
            handleData(data, dispatch)
        });

    });
}

export function handleData(data, dispatch) {
    console.log("Received:");
    console.log(data);
    let obj = data
    if (obj.maxWolf) {
        dispatch(setWolfNumber(obj.maxWolf))
    } else if (obj.gameCode) {
        dispatch(setGameCode(obj.gameCode))
    } else if (obj.extra) {
        dispatch(toggleExtras({ "name": obj.extra, "used": obj.used }))
    } else if (obj.phase) {
        dispatch(setPhase(obj.phase))
    } else if (obj.players) {
        dispatch(setPlayers(obj.players))
    } else if (obj.history) {
        dispatch(addHistory(obj.history))
    } else if (obj.allHistory) {
        dispatch(setHistory(obj.allHistory))
    }

}


export function sendMessage(message) {
    connections.forEach((conn) => {
        conn.send(message);
    })
}

export function sendMessageTo(peerID, message) {
    connections.forEach((conn) => {
        if (conn.peer === peerID) {
            console.log("sending to " + peerID)
            conn.send(message);
        }
    })
}

export function connectPeer(dispatch, newPeer) {

    var conn = peer.connect(newPeer.peerID);

    conn.on("open", () => {
        connections.push(conn);
        conn.send("Hi! I'm " + peerId);

        dispatch(addPlayer(createUser(newPeer.username, newPeer.peerID)))
    });
    conn.on("close", () => {
        console.log("Received close from peer " + conn.peer)
        dispatch(removePlayer(conn.peer))
        connections = connections.filter(function (conn) { return conn.open })

    });

    conn.on('error', function (err) { console.log(err) });
}
export function reconnectPeer(dispatch, newPeer) {

    var conn = peer.connect(newPeer.peerID);

    conn.on("open", () => {
        connections.push(conn);
        conn.send("Hi! I'm " + peerId);

        dispatch(updatePlayer(createUser(newPeer.username, newPeer.peerID)))
    });
    conn.on("close", () => {
        console.log("Received close from peer " + conn.peer)
        dispatch(removePlayer(conn.peer))
        connections = connections.filter(function (conn) { return conn.open })

    });

    conn.on('error', function (err) { console.log(err) });
}


export function disconnectPeer(dispatch, oldPeer) {
    console.log("Received disconnectPeer from peer " + oldPeer)
    dispatch(removePlayer(oldPeer))
    connections = connections.filter(function (conn) { return conn.peer !== oldPeer })

}

export function destroyPeer(socket) {
    if (peer != null && !peer.destroied) {
        console.log("emit peer_destroyed")
        socket.emit('peer_destroyed', { peerId: peerId });
        peer.destroy()
    }
}

export function createUser(username, peerID, role, alive, vote = null, online = false) {
    return {
        username: username,
        peerID: peerID,
        role: role,
        alive: alive,
        vote: vote,
        online: online
    }
}
