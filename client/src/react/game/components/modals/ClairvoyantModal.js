import { Modal, Button } from "react-bootstrap"
import { CARDS } from "../../../../util/config";

export default function ClairvoyantModal(props) {

    if (!props.show) return
    let chosenPlayer = props.players.filter((player) => player.username === props.chosen)[0]
    let card = CARDS[chosenPlayer.role]
    return <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header className="justify-content-center" >
                <Modal.Title>{props.chosen} role is:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" >
                <img className="rounded" src={card} alt="Card" style={{ width: "80%" }} />
            </Modal.Body>
            <Modal.Footer className="justify-content-center" >
                <Button className="col-4" variant="primary" onClick={props.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

    </>
}