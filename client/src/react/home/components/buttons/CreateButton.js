import { useDispatch } from "react-redux"

import HomeFormButton from "../../../common/components/FormButton"
import { join } from "../../HomeLogic"
import { useTranslation } from "react-i18next";

export default function SignupButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    return <HomeFormButton text={t("Create")} variant="secondary"
        onClick={() => join(props.party, dispatch)}
    />
}
