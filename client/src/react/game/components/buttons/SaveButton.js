import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"
import { saveGame } from "../../GameLogic"

export default function SaveButton(props) {
    const dispatch = useDispatch()
    return <LobbyButton text="Save" variant="primary" onClick={() => saveGame(dispatch, props.players, props.me)} />
}
