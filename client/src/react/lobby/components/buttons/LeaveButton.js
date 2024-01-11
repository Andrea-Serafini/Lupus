import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { leave } from "../../LobbyLogic"

export default function LeaveButton(props) {
    const dispatch = useDispatch()
    return <LobbyButton text="Leave" variant="secondary" onClick={() => leave(dispatch)} />
}
