import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { leaveLobby } from "../../LobbyLogic"

export default function LeaveButton(props) {
    const dispatch = useDispatch()
    return <LobbyButton text="Leave" variant="secondary" onClick={() => leaveLobby(dispatch, props.players, props.username)} />
}