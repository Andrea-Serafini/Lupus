import { setRoom, setToken, setUsername } from "../redux/user/reducer";
import { setIsLoading, setPeerConnected } from "../redux/util/reducer";
import { addPlayer, setPartyClosed } from "../redux/game/reducer";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css"
import { logout } from "./socket";
import { sleep } from "../util/config";
import { connectPeer, createUser, disconnectPeer, reconnectPeer } from "../peer/Peer";
import { useSelector } from "react-redux";


export function assignHandlers(socket, dispatch) {

    dispatch(setIsLoading(true))
    console.log("Attaching handlers...")

    socket.on("connect_error", (error) => connectionErrorHandler(error, socket, dispatch))


    socket.on("connect", (error) => {
        dispatch(setIsLoading(false))
        console.log("Socket connected");
    });

    socket.on("session", ({ sessionID, username }) => {
        console.log("SessionId: " + sessionID);
        //NotificationManager.success('Welcome :)', 'Login successful', 3000)
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        sessionStorage.setItem("sessionID", sessionID);
        dispatch(setToken(sessionID))
        dispatch(setUsername(username));

        dispatch(setIsLoading(false));
    });

    socket.on("login_error", (message) => {
        dispatch(setIsLoading(false))
        NotificationManager.error(message, 'Login error', 3000);
    });

    socket.on("signup_error", (message) => {
        dispatch(setIsLoading(false))
        NotificationManager.error(message, 'Signup error', 3000);
    });


    socket.on("signup_done", () => {
        dispatch(setIsLoading(false))
        NotificationManager.success("You can now login", 'Signup succes', 3000);
    });

    socket.on("room", (message) => {
        console.log("Entered room " + message.name)
        sessionStorage.setItem("lobby", message.name);
        dispatch(addPlayer(createUser(message.username, message.peerID)))
        dispatch(setRoom(message.name))
        dispatch(setPeerConnected(true))
        dispatch(setIsLoading(false))

    });

    socket.on("restore_room", (message) => {
        console.log("Entered room " + message.name)
        sessionStorage.setItem("lobby", message.name);
        dispatch(addPlayer(createUser(message.username, message.peerID)))
        dispatch(setRoom(message.name))
        dispatch(setPeerConnected(true))
        dispatch(setIsLoading(false))
        dispatch(setPartyClosed(true))

    });



    socket.on("new_peer", (message) => {
        console.log("new_peer: " + message.peerID)
        connectPeer(dispatch, message)

    });

    socket.on("restore_peer", (message) => {
        console.log("restore_peer: " + message.peerID)
        reconnectPeer(dispatch, message)

    });

    socket.on("peer_removed", (message) => {
        console.log("peer_removed")
        disconnectPeer(dispatch, message)
        console.log(message)
    });

    socket.on("room_closed", () => {
        dispatch(setIsLoading(false))
        dispatch(setPartyClosed(true))
        console.log("room_closed")
    });

    socket.on("room_unavailable", () => {
        dispatch(setIsLoading(false))
        dispatch(setRoom(null))
        dispatch(setPartyClosed(false))
        NotificationManager.error("Try a different code", 'Room closed', 3000);

    });


}

async function connectionErrorHandler(error, socket, dispatch) {
    NotificationManager.error("Connection to server lost, retry later", 'Error', 3000)
    await sleep(3000).then(() => logout(dispatch))
    dispatch(setIsLoading(false));
    //dispatch(setSocketConnected(false));
}