import { Peer } from 'peerjs';
import { setIsLoading } from '../redux/util/reducer';
import { useSelector } from 'react-redux';


var peerId;
var peer;
const connections = []

export function createPeer(dispatch, socket, party) {
    peer = new Peer();

    peer.on('open', function (id) {
        peerId = id;
        console.log('My peer ID is: ' + id);
        dispatch(setIsLoading(false))
        socket.emit('room', { name: party, id: peerId });
    });


    peer.on("connection", (conn) => {

        conn.on("data", (data) => {
            console.log(data);
        });

    });
}




export function connectPeer(newPeer) {
    var conn = peer.connect(newPeer);
    conn.on("open", () => {
        connections.push(conn);
        conn.send("Hi! I'm " + peerId);
        console.log(connections)
    });
}

export function disconnectPeer(oldPeer) {
    /*var conn = peer.connect(oldPeer);
    conn.on("open", () => {
        connections.push(conn);
        conn.send("Hi! I'm " + peerId);
    });*/

}

export function destroyPeer(socket) {
    if (peer != null && !peer.destroied) {
        socket.emit('peer_destroyed', { id: peerId });
        peer.destroy()
    }
}