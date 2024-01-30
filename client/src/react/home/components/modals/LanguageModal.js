import { Modal, Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";
import { language } from "../../HomeLogic";

export default function LanguageModal(props) {
    const { t } = useTranslation();

    let lang = sessionStorage.getItem("lupusLanguage")

    if (lang == "en") {
        return <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header className="justify-content-center" >
                    <Modal.Title>{t("Language")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >
                    <input type="radio" className="btn-check" name="options-outlined" id="it-outlined"  />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => language("it")} htmlFor="it-outlined">{t("Italiano")}</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="en-outlined"  defaultChecked />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => language("en")} htmlFor="en-outlined">{t("English")}</label>

                </Modal.Body>
                <Modal.Footer className="justify-content-center" >
                    <Button className="col-4" variant="primary" onClick={props.handleClose}>{t("Ok")}</Button>
                </Modal.Footer>
            </Modal>
        </>
    } else if (lang == "it") {
        return <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header className="justify-content-center" >
                    <Modal.Title>{t("Language")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >
                    <input type="radio" className="btn-check" name="options-outlined" id="it-outlined" defaultChecked />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => language("it")} htmlFor="it-outlined">{t("Italiano")}</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="en-outlined"  />
                    <label className="col-4 m-3 btn btn-outline-success" onClick={() => language("en")} htmlFor="en-outlined">{t("English")}</label>

                </Modal.Body>
                <Modal.Footer className="justify-content-center" >
                    <Button className="col-4" variant="primary" onClick={(props.handleClose)}>{t("Ok")}</Button>
                </Modal.Footer>
            </Modal>
        </>
    }

}

