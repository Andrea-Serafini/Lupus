import { useDispatch, useSelector } from "react-redux"

import CredentialsFormInput from "../../../common/components/FormInput"
import { login } from "../../LoginLogic"
import { useTranslation } from "react-i18next";

export default function UsernameInput(props) {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)


    return <CredentialsFormInput
        text={t("Username")+":"}
        type="text"
        placeholder={t("Enter Username")}
        onChange={props.onChange}
        onEnter={() => login(props.username, props.password, dispatch, socketConnected, props.cb)}
    />

}
