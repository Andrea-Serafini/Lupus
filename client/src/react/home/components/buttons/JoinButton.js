import { useDispatch } from "react-redux"

import HomeFormButton from "../../../common/components/FormButton"
import { join } from "../../HomeLogic"
import { useTranslation } from "react-i18next";

export default function JoinButton(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return <HomeFormButton text={t("Join")} variant="primary"
        onClick={() => join(props.party, dispatch)}
    />
}
