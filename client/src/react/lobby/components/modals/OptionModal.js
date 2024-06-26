import { Modal, Button, Form, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { toggleExtras, setWolfNumber } from "../../../../redux/game/reducer";
import { EXTRAS_ICONS, ROLES_ICONS } from "../../../../util/config";
import { sendMessage } from "../../../../peer/Peer";
import { useTranslation } from "react-i18next";

export default function OptionModal(props) {
    const { t } = useTranslation();


    let dispatch = useDispatch();
    let value = useSelector(state => state.game.wolfNumber);
    let extras = useSelector(state => state.game.extras);

    function increment() {
        const max = props.maxWolf;

        if (typeof max === 'number' && value >= max) return;

        sendMessage({ "maxWolf": (value + 1) })
        dispatch(setWolfNumber(value + 1))
    }

    function decrement() {
        const min = 1;

        if (typeof min === 'number' && value <= min) return;

        sendMessage({ "maxWolf": (value - 1) })
        dispatch(setWolfNumber(value - 1))

    }

    function handleAdd(extra) {
        sendMessage({ "extra": extra.name, "used": !extra.used })

        dispatch(toggleExtras({ "name": extra.name, "used": !extra.used }))
    }


    return <>
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>{t("Game options")}</Modal.Title>
            </Modal.Header>
            <Modal.Body><h3>{t("Customize your settings") + "!"}</h3>
                <Form>
                    {t("Select wolf number") + ":"}
                    <div className="mt-2" style={{ width: "fit-content" }}>
                        <img className="rounded" src={ROLES_ICONS[1]} alt="Icona" style={{ width: "150px" }} />
                        <InputGroup className="mt-2 mb-3" style={{ width: "150px" }}>
                            <Button onClick={decrement} style={{ paddingBottom: "8px", width: "40px" }} variant="outline-secondary" id="button-addon1">
                                -
                            </Button>
                            <Form.Control
                                id="wolfNumber"
                                value={value}
                                disabled={true}
                                style={{ textAlign: "center" }}
                                aria-label=""
                                aria-describedby="basic-addon1"
                            />
                            <Button onClick={increment} style={{ paddingBottom: "8px", width: "40px" }} variant="outline-secondary" id="button-addon2">
                                +
                            </Button>
                        </InputGroup>
                    </div>

                    <div className="mb-3">
                        {t("Select extra characters") + ":"}
                        {extras.map((extra, index) => (
                            <div className="mt-2 d-flex align-items-center" style={{}} key={index}>
                                <img className="rounded m-auto" src={EXTRAS_ICONS[index + 1]} alt="Icona" style={{ opacity: extra.used ? "100%" : "50%", width: "40px" }} />
                                <InputGroup className="m-auto " style={{ width: "250px" }}>
                                    <Form.Control
                                        name={extra.name + "Label"}
                                        value={extra.name}
                                        disabled={true}
                                        style={{ textAlign: "center", background: extra.used ? "green" : "gray" }}
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                    />
                                    <Button onClick={() => handleAdd(extra)} style={{ paddingBottom: "8px", width: "40px" }} variant="outline-secondary" id="button-addon2">
                                        {extra.used ? "-" : "+"}
                                    </Button>
                                </InputGroup>
                            </div>

                        ))}

                    </div>
                </Form>
            </Modal.Body>

        </Modal>

    </>
}
