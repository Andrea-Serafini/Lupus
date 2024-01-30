import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { endGame } from "../../../lobby/LobbyLogic"
import { useTranslation } from "react-i18next";

export default function LeaveButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    return <LobbyButton text={t("Leave")} variant="secondary" onClick={() => endGame(dispatch, props.players)} />
}
