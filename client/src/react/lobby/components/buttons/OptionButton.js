import { useTranslation } from "react-i18next";
import LobbyButton from "../../../common/components/FormButton"

export default function OptionButton(props) {
    const { t } = useTranslation();

    return <LobbyButton text={t("Option")} variant="primary"
        onClick={props.handleShow} />
}