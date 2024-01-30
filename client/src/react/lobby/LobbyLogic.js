import { socket } from "../../socket/socket"
import { destroyPeer, sendMessage } from "../../peer/Peer"
import { setPlayers, setPartyClosed, setPhase, setHistory, setGameCode } from "../../redux/game/reducer"
import { setRoom } from "../../redux/user/reducer"
import { setIsLoading, setPeerConnected } from "../../redux/util/reducer"
import { MIN_PLAYERS } from "../../util/config"
import { NotificationManager } from "react-notifications"

export function close(dispatch, room, numPlayers, t) {
    
    if (numPlayers >= MIN_PLAYERS) {
        dispatch(setIsLoading(true))
        socket.emit("close_room", room)
    } else {
        NotificationManager.error(t("Invite someone else before"), t("Not enough players"), 3000)
    }
}
export function leave(dispatch, players, username) {
    dispatch(setPhase(null))

    let updatedPlayers = JSON.parse(JSON.stringify(players))
    updatedPlayers.forEach(element => {
        if (element.username === username) {
            element.alive = false
            element.online = false
        }
    });
    sendMessage({ "players": updatedPlayers })
    destroyPeer(socket)
    dispatch(setPartyClosed(false))
    dispatch(setPlayers([]))
    dispatch(setHistory([]))
    //sessionStorage.removeItem("lobby")
    dispatch(setRoom(null))
    dispatch(setPeerConnected(false))
}
export function leaveLobby(dispatch) {
    dispatch(setPhase(null))
    destroyPeer(socket)
    dispatch(setPartyClosed(false))
    dispatch(setPlayers([]))
    dispatch(setHistory([]))
    sessionStorage.removeItem("lobby")
    dispatch(setRoom(null))
    dispatch(setPeerConnected(false))
}

export function endGame(dispatch, players) {
    let updatedPlayers = JSON.parse(JSON.stringify(players))
    updatedPlayers.forEach(element => {
        element.role = null
        element.vote = null

        element.alive = false
        element.online = false

    });
    
    dispatch(setPlayers(updatedPlayers))
    dispatch(setPhase(null))
    dispatch(setGameCode(null))
    dispatch(setHistory([]))
}



