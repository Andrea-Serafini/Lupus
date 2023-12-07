import { useDispatch, useSelector } from "react-redux"

import CredentialsFormButton from "../../../common/components/FormButton"
import { login } from "../../LoginLogic"

export default function LoginButton(props) {
    const dispatch = useDispatch();
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <CredentialsFormButton text="Login" variant="primary"
        onClick={() => login(props.username, props.password, dispatch, socketConnected, props.cb)} />
}
