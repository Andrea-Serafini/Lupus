import { Modal, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { language } from "../../HomeLogic";
import { useState } from "react";

export default function LanguageModal(props) {
    const { t } = useTranslation();

    let lang = sessionStorage.getItem("lupusLanguage")

    const [selectedLanguage, setSelectedLanguage] = useState(lang);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleOkButtonClick = () => {
        language(selectedLanguage);
        props.handleSave();
    };

    
    const handleClose = () => {
        setSelectedLanguage(lang);
        props.handleClose();
    };

    

    if (lang === "en") {
        return <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header className="justify-content-center" >
                    <Modal.Title>{t("Language")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >
                    <input type="radio" className="btn-check" name="options-outlined" id="it-outlined"  />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("it")} htmlFor="it-outlined">{t("Italiano")}</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="en-outlined"  defaultChecked />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("en")} htmlFor="en-outlined">{t("English")}</label>

                </Modal.Body>
                <Modal.Footer className="justify-content-center" >
                    <Button className="col-4" variant="primary" onClick={handleOkButtonClick}>{t("Ok")}</Button>
                </Modal.Footer>
            </Modal>
        </>
    } else if (lang === "it") {
        return <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header className="justify-content-center" >
                    <Modal.Title>{t("Language")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >
                    <input type="radio" className="btn-check" name="options-outlined" id="it-outlined" defaultChecked />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("it")} htmlFor="it-outlined">{t("Italiano")}</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="en-outlined"  />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => handleLanguageChange("en")} htmlFor="en-outlined">{t("English")}</label>

                </Modal.Body>
                <Modal.Footer className="justify-content-center" >
                    <Button className="col-4" variant="primary" onClick={handleOkButtonClick}>{t("Ok")}</Button>
                </Modal.Footer>
            </Modal>
        </>
    }

}

