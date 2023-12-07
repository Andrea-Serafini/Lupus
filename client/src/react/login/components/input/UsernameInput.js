import { useDispatch, useSelector } from "react-redux"

import CredentialsFormInput from "../../../common/components/FormInput"
import { login } from "../../LoginLogic"

export default function UsernameInput(props) {

    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)


    return <CredentialsFormInput
        text="Username:"
        type="text"
        placeholder="Enter Username"
        onChange={props.onChange}
        onEnter={() => login(props.username, props.password, dispatch, socketConnected, props.cb)}
    />

}
