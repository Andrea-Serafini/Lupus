import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { setGameCode, setPhase } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";
import { assignRoles, sendFinalConfig } from "../../../game/GameLogic";
import { MIN_PLAYERS } from "../../../../util/config";
import { NotificationManager } from "react-notifications";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

export default function PlayButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return <LobbyButton text={t("Play")} variant="success"
        onClick={() => playClicked(dispatch, props.wolfNumber, props.extras, props.players, t)} />
}

function playClicked(dispatch, wolfNumber, extras, players, t) {

    if (players.length >= MIN_PLAYERS) {
        let gameCode = uuidv4()

        dispatch(setGameCode(gameCode))
        sendMessage({ "gameCode": gameCode })

        dispatch(setPhase("loading"))
        sendMessage({ "phase": "loading" })

        sendFinalConfig(wolfNumber, extras)

        assignRoles(dispatch, players, wolfNumber, extras)
    } else {
        NotificationManager.error(t("Invite someone else before"), t("Not enough players"), 3000)
    }


}


