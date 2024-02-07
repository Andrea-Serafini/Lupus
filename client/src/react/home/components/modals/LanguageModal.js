import { Modal, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { storeLanguage } from "../../HomeLogic";
import { useState } from "react";
import { LANGUAGE } from "../../../../util/config";
import i18next from "i18next";

export default function LanguageModal(props) {
    const { t } = useTranslation();
    let lng = LANGUAGE

    const [selectedLanguage, setSelectedLanguage] = useState(lng);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        i18next.changeLanguage(language);

    };



    const handleClose = () => {
        storeLanguage(selectedLanguage);
        props.handleClose();
    };



    return <>
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header className="justify-content-center" >
                <Modal.Title>{t("Language")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" >
                <input type="radio" className="btn-check" name="options-outlined" id="it-outlined" defaultChecked={lng === "it" ? true : false} />
                <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("it")} htmlFor="it-outlined">{t("Italiano")}</label>
                <input type="radio" className="btn-check" name="options-outlined" id="en-outlined" defaultChecked={lng === "en" ? true : false} />
                <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("en")} htmlFor="en-outlined">{t("English")}</label>

            </Modal.Body>
            <Modal.Footer className="justify-content-center" >
                <Button className="col-4" variant="primary" onClick={handleClose}>{t("Save")}</Button>
            </Modal.Footer>
        </Modal>
    </>


}

