import { useDispatch, useSelector } from "react-redux"

import CredentialsFormButton from "../../../common/components/FormButton"
import { signup } from "../../LoginLogic"
import { useTranslation } from "react-i18next";

export default function SignupButton(props) {
   const { t } = useTranslation();

    const dispatch = useDispatch()
    let socketConnected = useSelector(state => state.util.socketConnected)
    return <CredentialsFormButton text={t('Register')} variant="secondary" onClick={() => signup(props.username, props.password, dispatch, socketConnected)} />
}
