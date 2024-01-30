import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { close } from "../../LobbyLogic"
import { useTranslation } from "react-i18next";

export default function CloseButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return <LobbyButton text={t("Start")} variant="primary"
        onClick={() => close(dispatch, props.roomName, props.numPlayers, t)} />
}
