import { useState } from "react";
import { Button, Modal, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ICONS } from "../../../../util/config";


export default function StatsModal(props) {
    const { t } = useTranslation();
    let stats = useSelector(state => state.user.stats);


    const [gameCode, setGameCode] = useState(null);
    const handleShow = (code) => setGameCode(code);

    if (stats === null) {
        return (
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header className="justify-content-center" closeButton>
                    <Modal.Title>{t("Statistics")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >
                    <Spinner animation="border" variant="dark" role="status">
                        <span className="visually-hidden">{t("Loading stats...")}</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        );
    } else {
        return (
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header className="justify-content-center" closeButton>
                    <Modal.Title>{t("Statistics")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-start" >
                    <h2>{t("Games played:")} <span style={{ color: "blue" }}>{stats.totalPlayed}</span></h2>
                    <h2>{t("Games lost:")} <span style={{ color: "red" }}>{stats.totalLost}</span></h2>
                    <h2>{t("Games won:")} <span style={{ color: "green" }}>{stats.totalWin}</span></h2>
                    <h4>    {t("Wins as wolf:")} <span style={{ color: "black" }}>{stats.badWin}</span></h4>
                    <h4>    {t("Wins as villager:")} <span style={{ color: "black" }}>{stats.goodWin}</span></h4>
                    <div className="text-center">
                    {stats.games.map((game, index) => (
                        <Button key={index} className="col-3 m-2 position-relative" variant="secondary" onClick={() => handleShow(game.gameCode)}>{t("Show")}</Button>
                    ))}
                    </div>
                    {gameCode === null ?
                        <></>
                        :
                        <>
                            <Row className="d-flex justify-content-center">
                                <div className="m-1 p-3 container col-lg-5 col-10 rounded trnsp" style={{ height: "fit-content" }}>
                                    <div className="" style={{ height: "-webkit-fill-available", overflowY: "scroll", maxHeight: "400px" }}>
                                        {stats.games.filter(function (game) { return game.gameCode === gameCode })[0].players.map((player, index) => (
                                            <div key={index} className="rounded bg-white mb-2 d-flex align-items-center" style={{ height: "50px" }}>
                                                <div className=" ">
                                                    <img className="rounded" src={ICONS[player.role]} alt="UserIcon" style={{ marginLeft: "5px", width: "40px" }} />
                                                </div>
                                                <div className="m-auto text-center">
                                                    {player.username}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="m-1 p-3 container col-lg-5 col-10 rounded trnsp" style={{ height: "fit-content" }}>
                                    <ul className="rounded list-group mb-2" id="gameHisotry" style={{ height: "-webkit-fill-available", overflowY: "scroll", background: "white", maxHeight: "400px" }}>
                                        <li key={stats.games.filter(function (game) { return game.gameCode !== gameCode })[0].history.length + 1} className="list-group-item"><strong>{t("Let the game begin")}</strong></li>
                                        {stats.games.filter(function (game) { return game.gameCode === gameCode })[0].history.toReversed().map((event, index) => (
                                            <li key={index + 1} className="list-group-item">{event}</li>
                                        ))}
                                    </ul>
                                </div>
                                <Button className="col-3 m-2 " variant="primary" onClick={() => handleShow(null)}>{t("Hide")}</Button>
                            </Row>
                        </>
                    }



                </Modal.Body>
            </Modal>
        )
    }

}

