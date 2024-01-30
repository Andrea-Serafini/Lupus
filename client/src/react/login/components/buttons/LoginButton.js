import { useDispatch, useSelector } from "react-redux"

import CredentialsFormButton from "../../../common/components/FormButton"
import { login } from "../../LoginLogic"
import { useTranslation } from "react-i18next";

export default function LoginButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <CredentialsFormButton text={t("Login")} variant="primary"
        onClick={() => login(props.username, props.password, dispatch, socketConnected, props.cb)} />
}
