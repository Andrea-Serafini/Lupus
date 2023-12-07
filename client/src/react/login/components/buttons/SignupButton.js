import { useDispatch, useSelector } from "react-redux"

import CredentialsFormButton from "../../../common/components/FormButton"
import { signup } from "../../LoginLogic"

export default function SignupButton(props) {
    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <CredentialsFormButton text="Register" variant="secondary" onClick={() => signup(props.username, props.password, dispatch, socketConnected)} />
}
