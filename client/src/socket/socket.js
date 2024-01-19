import { io } from 'socket.io-client';
import { SERVER_ADDRESS } from '../util/config';
import { assignHandlers } from './assignHandlers';
import { setIsLoading, setPeerConnected, setSocketConnected } from '../redux/util/reducer';
import { setToken, setUsername, setRoom } from "../redux/user/reducer";
import { destroyPeer } from '../peer/Peer';
import { setPartyClosed, setPlayers } from '../redux/game/reducer';

export const socket = io(SERVER_ADDRESS, {
    autoConnect: false,
    reconnection: false
});

export function connect(dispatch) {

    console.log(SERVER_ADDRESS)
    console.log("SERVER_ADDRESS")

    const sessionID = sessionStorage.getItem("sessionID");
    if (sessionID) {
        socket.auth = { sessionID };
    }

    assignHandlers(socket, dispatch);
    socket.connect();
    dispatch(setSocketConnected(true));
}

export function disconnect(dispatch) {
    dispatch(setSocketConnected(false));
    socket.removeAllListeners();
    socket.disconnect();
    dispatch(setIsLoading(false))
}

export function logout(dispatch) {

    destroyPeer(socket)
    dispatch(setPlayers([]))
    dispatch(setRoom(null))
    dispatch(setPartyClosed(false))
    dispatch(setPeerConnected(false))
    dispatch(setSocketConnected(false))
    console.log("Logout")
    dispatch(setUsername(null));
    dispatch(setToken(null));
    sessionStorage.removeItem("sessionID")
    sessionStorage.removeItem("lobby")
    socket.emit("logout");
    socket.auth = null;
    disconnect(dispatch);

}
