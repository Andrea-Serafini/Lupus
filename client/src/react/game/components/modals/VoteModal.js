import { useState } from "react";
import { Modal, Button } from "react-bootstrap"

export default function CardModal(props) {


    const [visible, setVisible] = useState(false);
    const handleShow = () => setVisible(true);

    return <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header className="justify-content-center" >
                <Modal.Title>It's time to vote</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" >
                <img className="rounded" src={visible ? props.card : props.backCard} alt="Card" style={{ width: "80%" }} />

            </Modal.Body>
            <Modal.Footer className="justify-content-center" >
                {!visible ?
                    <Button className="col-4" variant="secondary" onClick={handleShow}>Show</Button>
                    :
                    <Button className="col-4" variant="primary" onClick={props.handleClose}>I'm ready!</Button>
                }
            </Modal.Footer>
        </Modal>

    </>
}