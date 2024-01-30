import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { leaveLobby } from "../../LobbyLogic"
import { useTranslation } from "react-i18next";

export default function LeaveButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    return <LobbyButton text={t("Leave")} variant="secondary" onClick={() => leaveLobby(dispatch, props.players, props.username)} />
}