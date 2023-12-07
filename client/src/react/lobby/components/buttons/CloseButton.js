import { useDispatch, useSelector } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { close } from "../../LobbyLogic"

export default function CloseButton(props) {
    const dispatch = useDispatch();
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <LobbyButton text="Start" variant="primary"
        onClick={() => close()} />
}
