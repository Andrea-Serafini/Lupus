import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { setPhase } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";
import { assignRoles, sendFinalConfig } from "../../../game/GameLogic";
import { MIN_PLAYERS } from "../../../../util/config";
import { NotificationManager } from "react-notifications";

export default function PlayButton(props) {
    const dispatch = useDispatch();
    return <LobbyButton text="Play" variant="success"
        onClick={() => playClicked(dispatch, props.wolfNumber, props.extras, props.players)} />
}

function playClicked(dispatch, wolfNumber, extras, players) {
    if (players.length >= MIN_PLAYERS) {
        dispatch(setPhase("loading"))
        sendMessage({ "phase": "loading" })

        sendFinalConfig(wolfNumber, extras)

        assignRoles(dispatch, players, wolfNumber, extras)
    } else {
        NotificationManager.error("Invite someone else before", "Not enough players", 3000)
    }


}


