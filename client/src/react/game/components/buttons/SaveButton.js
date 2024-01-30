import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { saveGame } from "../../GameLogic"
import { useTranslation } from "react-i18next";

export default function SaveButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    return <LobbyButton text={t("Save")} variant="primary" onClick={() => saveGame(dispatch, props.winners, props.gameCode, props.players, props.me, props.history)} />
}
