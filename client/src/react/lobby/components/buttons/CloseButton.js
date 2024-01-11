import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { close } from "../../LobbyLogic"

export default function CloseButton(props) {
    const dispatch = useDispatch();
    return <LobbyButton text="Start" variant="primary"
        onClick={() => close(dispatch, props.roomName, props.numPlayers)} />
}
