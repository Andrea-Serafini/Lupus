import { useDispatch } from "react-redux"

import HomeFormInput from "../../../common/components/FormInput"
import { join } from "../../HomeLogic"
import { useTranslation } from "react-i18next";

export default function PartyInput(props) {
    const { t } = useTranslation();

    const dispatch = useDispatch()


    return <HomeFormInput
        id="partyInput"
        text={t("Party") + ":"}
        type="text"
        placeholder={t("Enter party code")}
        onChange={props.onChange}
        onEnter={() => join(props.party, dispatch)}
    />

}
