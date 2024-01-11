import { useDispatch } from "react-redux"

import LobbyButton from "../../../common/components/FormButton"

export default function OptionButton(props) {
    const dispatch = useDispatch();
    return <LobbyButton text="Option" variant="primary"
        onClick={props.handleShow} />
}