import { socket } from "../../socket/socket"
import { destroyPeer, sendMessage } from "../../peer/Peer"
import { setPlayers, setPartyClosed, setPhase } from "../../redux/game/reducer"
import { setRoom } from "../../redux/user/reducer"
import { setIsLoading, setPeerConnected } from "../../redux/util/reducer"
import { MIN_PLAYERS } from "../../util/config"
import { NotificationManager } from "react-notifications"

export function close(dispatch, room, numPlayers) {
    console.log(numPlayers)
    if (numPlayers >= MIN_PLAYERS) {
        dispatch(setIsLoading(true))
        socket.emit("close_room", room)
    } else {
        NotificationManager.error("Invite someone else before", "Not enough players", 3000)
    }
}
export function leave(dispatch, players, username) {
    dispatch(setPhase(null))

    let updatedPlayers = JSON.parse(JSON.stringify(players))
    updatedPlayers.forEach(element => {
        if (element.username === username) {
            element.alive = false

        }
    });
    sendMessage({"players": updatedPlayers})
    destroyPeer(socket)
    dispatch(setPartyClosed(false))
    dispatch(setPlayers([]))
    sessionStorage.removeItem("lobby")
    dispatch(setRoom(null))
    dispatch(setPeerConnected(false))
}



