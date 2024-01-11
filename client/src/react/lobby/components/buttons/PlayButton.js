import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { setPhase } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";
import { assignRoles, sendFinalConfig } from "../../../game/GameLogic";

export default function PlayButton(props) {
    const dispatch = useDispatch();
    return <LobbyButton text="Play" variant="success"
        onClick={() => playClicked(dispatch, props.wolfNumber, props.extras, props.players)} />
}

function playClicked(dispatch, wolfNumber, extras, players) {
    dispatch(setPhase("loading"))
    sendMessage({ "phase": "loading" })

    sendFinalConfig(wolfNumber, extras)

    assignRoles(dispatch, players, wolfNumber, extras)

}


