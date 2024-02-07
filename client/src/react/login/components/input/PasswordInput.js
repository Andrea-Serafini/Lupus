import { useDispatch, useSelector } from "react-redux"

import CredentialsFormInput from "../../../common/components/FormInput"
import { login } from "../../LoginLogic"
import { useTranslation } from "react-i18next";


export default function PasswordInput(props) {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)


    return <CredentialsFormInput
        id="passwordInput"
        text={t("Password") + ":"}
        type="password"
        placeholder={t("Enter Password")}
        onChange={props.onChange}
        onEnter={() => login(props.username, props.password, dispatch, socketConnected, props.cb)}
    />

}
