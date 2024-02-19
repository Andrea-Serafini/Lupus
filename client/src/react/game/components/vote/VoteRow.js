import { Row } from "react-bootstrap";
import ale from "../../../../img/ALE_icon.svg"
import aleDead from "../../../../img/GHOST_icon.svg"
import { EXTRAS, FILTERS, FILTERS_NUM, PHASES, PHASE_ORDER, ROLES, TURNS } from "../../../../util/config";
import { addHistory, setPhase, setPlayers } from "../../../../redux/game/reducer";
import { sendMessage } from "../../../../peer/Peer";
import { useDispatch, useSelector } from "react-redux";
import ClairvoyantModal from "../modals/ClairvoyantModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function VoteRow(props) {
    const { t } = useTranslation();
    let players = props.players
    let me = props.myPlayer
    let phase = props.gamePhase
    let wolfNumber = useSelector(state => state.game.wolfNumber);
    let extras = useSelector(state => state.game.extras);
    let alpha = extras[0].used ? 1 : 0


    const [chosen, setChosen] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let dispatch = useDispatch()

    if (!me.alive) return;


    if (phase === PHASES[4]) {
        return (
            <>
                <ClairvoyantModal show={show} handleClose={handleClose} players={players} chosen={chosen} />
                <div className="mx-auto pt-2 text-center col-lg-6 col-9"><h3 style={{ color: "white" }}>{t("Who do you want to accuse?")}</h3></div>
                <Row className="d-flex justify-content-center">
                    <div className="mb-3 p-3 d-lg-flex container col-lg-9 col-9 rounded trnsp justify-content-around flex-wrap text-center" >
                        {players.map((player, index) => (
                            (player.alive && player.online) ?
                                <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center position-relative" style={{ height: "50px" }} onClick={() => accuse(player.username)}>
                                    <img src={ale} alt="UserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                    <div className="m-auto text-center">
                                        {player.username}
                                    </div>
                                    {voters(players, player)}
                                </div>
                                :
                                <div key={index} className="rounded bg-secondary col-lg-5 mb-2 d-flex align-items-center" style={{ height: "50px" }} >
                                    <img src={aleDead} alt="DeadUserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                    <div className="m-auto text-center">
                                        {player.username}
                                    </div>
                                </div>
                        ))}
                    </div>
                </Row>
            </>
        )
    } else if (PHASE_ORDER[phase] === TURNS[me.role]) {

        if (phase === PHASES[1]) {
            return (
                <>
                    <div className="mx-auto pt-2 text-center col-lg-6 col-9"><h3 style={{ color: "white" }}>{t("Who do you want to kill?")}</h3></div>
                    <Row className="d-flex justify-content-center">
                        <div className="mb-3 p-3 d-lg-flex container col-lg-9 col-9 rounded trnsp justify-content-around flex-wrap text-center" >
                            {players.map((player, index) => (
                                (player.alive && player.online) ?
                                    <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center position-relative" style={{ height: "50px" }} onClick={() => kill(player.username)}>
                                        <img src={ale} alt="UserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                        <div className="m-auto text-center">
                                            {player.username}
                                        </div>
                                        <div className="col-10 position-absolute bottom-0 end-0 text-end">
                                            {voters(players, player)}
                                        </div>
                                    </div>
                                    :
                                    <div key={index} className="rounded bg-secondary col-lg-5 mb-2 d-flex align-items-center" style={{ height: "50px" }} >
                                        <img src={aleDead} alt="DeadUserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                        <div className="m-auto text-center">
                                            {player.username}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </Row>
                </>
            )
        } else if (phase === PHASES[2]) {
            return (
                <>
                    <div className="mx-auto pt-2 text-center col-lg-6 col-9"><h3 style={{ color: "white" }}>Who do you want to protect?</h3></div>
                    <Row className="d-flex justify-content-center">
                        <div className="mb-3 p-3 d-lg-flex container col-lg-9 col-9 rounded trnsp justify-content-around flex-wrap text-center" >
                            {players.map((player, index) => (
                                (player.alive && player.online) ?
                                    <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center" style={{ height: "50px" }} onClick={() => protect(player.username)}>
                                        <img src={ale} alt="UserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                        <div className="m-auto text-center">
                                            {player.username}
                                        </div>
                                    </div>
                                    :
                                    <div key={index} className="rounded bg-secondary col-lg-5 mb-2 d-flex align-items-center" style={{ height: "50px" }} >
                                        <img src={aleDead} alt="DeadUserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                        <div className="m-auto text-center">
                                            {player.username}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </Row>
                </>
            )
        } else if (phase === PHASES[3]) {
            return (
                <>
                    <div className="mx-auto pt-2 text-center col-lg-6 col-9"><h3 style={{ color: "white" }}>Who do you want to know?</h3></div>
                    <Row className="d-flex justify-content-center">
                        <div className="mb-3 p-3 d-lg-flex container col-lg-9 col-9 rounded trnsp justify-content-around flex-wrap text-center" >
                            {players.map((player, index) => (
                                <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center" style={{ height: "50px" }} onClick={() => discover(player.username)}>
                                    {(player.alive && player.online)
                                        ? <img src={ale} alt="UserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                        : <img src={aleDead} alt="DeadUserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                    }
                                    <div className="m-auto text-center">
                                        {player.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Row>
                </>
            )
        }
    }



    function kill(username) {
        if (lastToVote()) {
            let updatedPlayers = JSON.parse(JSON.stringify(players))
            updatedPlayers.forEach(element => {
                if (element.username === me.username) {
                    element.vote = username
                }
            });
            sendMessage({ "players": updatedPlayers })
            dispatch(setPlayers(updatedPlayers))

            if (bodyguardPresent(updatedPlayers)) {
                dispatch(setPhase(PHASES[2]))
                sendMessage({ "phase": PHASES[2] })
            } else {
                if (clairvoyantPresent(updatedPlayers)) {
                    dispatch(setPhase(PHASES[3]))
                    sendMessage({ "phase": PHASES[3] })
                } else {
                    updatedPlayers = killVoted(updatedPlayers)
                    if (!isWinner(updatedPlayers)) {
                        dispatch(setPhase(PHASES[4]))
                        sendMessage({ "phase": PHASES[4] })
                    }
                }
            }
        } else {
            let updatedPlayers = JSON.parse(JSON.stringify(players))
            updatedPlayers.forEach(element => {
                if (element.username === me.username) {
                    element.vote = username

                }
            });
            sendMessage({ "players": updatedPlayers })
            dispatch(setPlayers(updatedPlayers))
        }
    }

    function protect(username) {
        let killed = getMostVoted(players)
        if (killed === username) {
            deleteVotes(players)
        } else {
            sendMessage({ "history": "The bodyguard protected someone" })
            dispatch(addHistory("The bodyguard protected someone"))
            players = killVoted(players)
        }
        if (!isWinner(players)) {
            if (clairvoyantPresent(players)) {
                dispatch(setPhase(PHASES[3]))
                sendMessage({ "phase": PHASES[3] })
            } else {
                dispatch(setPhase(PHASES[4]))
                sendMessage({ "phase": PHASES[4] })
            }
        }
    }

    function discover(username) {
        setChosen(username)
        setShow(true)

        sendMessage({ "history": "The clairvoyant found out the the role of someone" })
        dispatch(addHistory("The clairvoyant found out the the role of someone"))
        players = killVoted(players)
        if (!isWinner(players)) {

            dispatch(setPhase(PHASES[4]))
            sendMessage({ "phase": PHASES[4] })
        }
    }

    function accuse(username) {

        if (lastToAccuse()) {
            let updatedPlayers = JSON.parse(JSON.stringify(players))
            updatedPlayers.forEach(element => {
                if (element.username === me.username) {
                    element.vote = username

                }
            });
            sendMessage({ "players": updatedPlayers })
            dispatch(setPlayers(updatedPlayers))

            updatedPlayers = killVoted(updatedPlayers)

            if (!isWinner(updatedPlayers)) {
                dispatch(setPhase(PHASES[1]))
                sendMessage({ "phase": PHASES[1] })
            }
        } else {
            let updatedPlayers = JSON.parse(JSON.stringify(players))
            updatedPlayers.forEach(element => {
                if (element.username === me.username) {
                    element.vote = username
                }
            });
            sendMessage({ "players": updatedPlayers })
            dispatch(setPlayers(updatedPlayers))
        }

    }

    function bodyguardPresent(players) {
        let bodyguard = players.filter((player) => player.role === extras[1].name && player.alive)[0]

        return extras[1].used && bodyguard
    }

    function clairvoyantPresent(players) {
        let clairvoyant = players.filter((player) => player.role === extras[2].name && player.alive)[0]

        return extras[2].used && clairvoyant
    }

    function lastToAccuse() {
        //we count all the players that have voted or are dead, except for myself
        let voted = players.filter((player) => player.username !== me.username && (player.vote !== null || player.alive === false || player.online === false))

        return (voted.length + 1) >= (players.length)
    }

    function lastToVote() {
        //we count the wolves + the aplha that have voted or are dead, except for myself
        let voted = players.filter((player) => (player.role === ROLES[1] || player.role === EXTRAS[1]) && player.username !== me.username && (player.vote !== null || player.alive === false || player.online === false))

        return (voted.length + 1) >= (wolfNumber + alpha)
    }

    function getMostVoted(players) {
        let updatedPlayers = JSON.parse(JSON.stringify(players))
        let votes = new Map()
        //initialize votes
        updatedPlayers.forEach(element => {
            votes.set(element.username, 0)
        });
        //count votes and delete theme
        updatedPlayers.forEach(element => {
            if (element.vote !== null) {
                if (element.role === EXTRAS[1] && phase === PHASES[1]) {
                    votes.set(element.vote, votes.get(element.vote) + 1)
                }
                votes.set(element.vote, votes.get(element.vote) + 1)
            }
        });
        //get most voted
        let killed = [...votes.entries()].reduce((a, e) => e[1] > a[1] ? e : a)
        return killed[0]
    }

    function deleteVotes(players) {
        let updatedPlayers = JSON.parse(JSON.stringify(players))

        updatedPlayers.forEach(element => {
            element.vote = null
        });

        sendMessage({ "history": "The bodyguard saved a life" })
        sendMessage({ "players": updatedPlayers })
        dispatch(addHistory("The bodyguard saved a life"))
        dispatch(setPlayers(updatedPlayers))
    }

    function killVoted(players) {
        let updatedPlayers = JSON.parse(JSON.stringify(players))
        let killed = getMostVoted(updatedPlayers)
        //kill most voted
        updatedPlayers.forEach(element => {
            element.vote = null
            if (element.username === killed) {
                element.alive = false
            }
        });

        sendMessage({ "history": killed + " died during the " + phase })
        sendMessage({ "players": updatedPlayers })
        dispatch(addHistory(killed + " died during the " + phase))
        dispatch(setPlayers(updatedPlayers))
        return updatedPlayers
    }


    function isWinner(players) {
        let redsAlive = players.filter((player) => (player.role === ROLES[1] || player.role === EXTRAS[1]) && player.alive === true).length
        let greensAlive = players.filter((player) => (player.role !== ROLES[1] && player.role !== EXTRAS[1]) && player.alive === true).length

        if (redsAlive === 0) {
            sendMessage({ "history": "The villagers have won the game!" })
            dispatch(addHistory("The villagers have won the game!"))
            dispatch(setPhase("goodWon"))
            sendMessage({ "phase": "goodWon" })
            return true
        } else if (greensAlive < redsAlive) { //(greensAlive === 0) {
            sendMessage({ "history": "The wolves have won the game!" })
            dispatch(addHistory("The wolves have won the game!"))
            dispatch(setPhase("badWon"))
            sendMessage({ "phase": "badWon" })
            return true
        }
        return false
    }

    function voters(players, player) {
        return (
            <div className="col-10 position-absolute bottom-0 end-0 text-end">
                {players.map((p, index) => (
                    (p.vote === player.username) ?
                        (p.role === EXTRAS[1] && phase === PHASES[1]) ?
                            <div key={"v" + index} >
                                <img className="p-1" src={ale} alt="UserIcon" style={{ width: "20px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                <img className="p-1" src={ale} alt="UserIcon" style={{ width: "20px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                            </div>
                            :
                            <img key={"v" + index} className="p-1" src={ale} alt="UserIcon" style={{ width: "20px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                        :
                        < div key={"v" + index} style={{ display: "none" }} />
                ))}
            </div>
        )
    }
}


