import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { setPhase, setPlayers } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";

export default function RejoinButton(props) {
    const dispatch = useDispatch();
    return <LobbyButton text="Rejoin" variant="success"
        onClick={() => playClicked(dispatch, props.players, props.username)} />
}

function playClicked(dispatch, players, username) {
    let updatedPlayers = JSON.parse(JSON.stringify(players))
    updatedPlayers.forEach(element => {
        if (element.username === username) {
            element.online = true

        }
    });
    dispatch(setPlayers(updatedPlayers))
    sendMessage({"players": updatedPlayers})

}


