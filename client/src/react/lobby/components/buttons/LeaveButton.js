import { useDispatch, useSelector } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { leave } from "../../LobbyLogic"

export default function LeaveButton(props) {
    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <LobbyButton text="Leave" variant="secondary" onClick={() => leave()} />
}
