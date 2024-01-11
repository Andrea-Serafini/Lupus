import React, { useState } from "react";
import MyNavbar from "../common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts"
import { Button, Container, Row } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import { CARDS } from "../../util/config";
import ale from "../../img/ale.svg"
import aleDead from "../../img/ghost-solid.svg"
import backCard from "../../img/SVG/CARDS/RETRO_card.svg"
import { FILTERS, FILTERS_NUM } from "../../util/config";
import { setCardVisible } from "../../redux/util/reducer";
import CardModal from "./components/modals/CardModal";

function Game() {
   let username = useSelector(state => state.user.username);
   let gamePhase = useSelector(state => state.game.phase);
   let history = useSelector(state => state.game.history);
   let players = useSelector(state => state.game.players);
   let cardVisible = useSelector(state => state.util.cardVisible);
   let dispatch = useDispatch()
   let myPlayer = players.filter((player) => player.username === username)[0]

   const [show, setShow] = useState(true);
   const handleClose = () => setShow(false);

   if (gamePhase === "loading") {

      return (
         <>
            <MyNavbar display={"none"} />
            <LoadingOverlay active={true} spinner text='Assigning roles...'>
               <div role="main" style={{ height: "300px" }}>
               </div>
            </LoadingOverlay>
         </>
      );
   } else if (gamePhase !== null) {

      return (
         <>
            <MyNavbar display={"none"} />

            <div role="main" >
               <NotificationContainer />
               <CardModal backCard={backCard} card={CARDS[myPlayer.role]} show={show} handleClose={handleClose} />
               <Container>
                  <div className="mx-auto pt-lg-2 text-center col-lg-6 col-9"></div>
                  <Row className="d-flex justify-content-center">

                     <div className="my-3 p-3 container col-lg-4 col-9 rounded trnsp order-lg-2 text-center" >
                        <img className="rounded" src={cardVisible ? CARDS[myPlayer.role] : backCard} alt="Card" style={{ width: "90%" }} />
                        <Button className="col-7 mt-3" size="md" block="true" onClick={() => { dispatch(setCardVisible(!cardVisible)) }}>
                           {cardVisible ? "Hide" : "Show"}
                        </Button>
                     </div>

                     <div className="my-3 p-3 container col-lg-3 col-9 rounded trnsp order-lg-3" style={{ height: "fit-content" }}>
                        <ul className="rounded list-group mb-2" id="gameHisotry" style={{ height: "-webkit-fill-available", overflowY: "scroll", background: "white", maxHeight: "400px" }}>
                           <li key="0" className="list-group-item" style={{ "background": "#d4e5ed" }}><strong>It's {gamePhase} time...</strong></li>

                           {history.map((event, index) => (
                              <li key={index + 1} className="list-group-item">{event}</li>
                           ))}
                           <li key={history.length + 1} className="list-group-item"><strong>Let the game begin</strong></li>
                        </ul>
                     </div>

                     <div className="my-3 p-3 container col-lg-3 col-9 rounded trnsp order-lg-1" style={{ height: "fit-content" }}>
                        <div className="" style={{ height: "-webkit-fill-available", overflowY: "scroll", maxHeight: "400px" }}>
                           {players.map((player, index) => (
                              <div key={index} className="rounded bg-white mb-2 d-flex align-items-center" style={{ height: "50px" }}>
                                 <div className=" ">
                                    {player.alive
                                       ? <img src={ale} alt="UserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />

                                       : <img src={aleDead} alt="DeadUserIcon" style={{ padding: "5px", width: "40px", filter: FILTERS[(index % FILTERS_NUM)] }} />
                                    }
                                 </div>
                                 <div className="m-auto text-center">
                                    {player.username}
                                 </div>
                              </div>

                           ))}

                        </div>
                     </div>


                  </Row>
               </Container>
            </div>
         </>
      );
   } else if (gamePhase === null) {
      return <Navigate to="/lobby" />
   }
}


export default Game;