import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { setPlayers } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";
import { useTranslation } from "react-i18next";

export default function RejoinButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return <LobbyButton text={t("Rejoin")} variant="success"
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
    sendMessage({ "players": updatedPlayers })

}


