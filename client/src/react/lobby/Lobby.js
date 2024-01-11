import { useDispatch, useSelector } from "react-redux"
import LoadingOverlay from "react-loading-overlay-ts"
import { NotificationContainer } from "react-notifications"
import { Container, Row } from 'react-bootstrap';

import MyNavbar from "../common/Navbar";
import CloseButton from "./components/buttons/CloseButton";
import LeaveButton from "./components/buttons/LeaveButton";
import OptionButton from "./components/buttons/OptionButton";
import PlayButton from "./components/buttons/PlayButton";
import OptionModal from "./components/modals/OptionModal";

import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { join } from "../home/HomeLogic";
import { connect } from "../../socket/socket";
import { setRoom } from "../../redux/user/reducer";

function Lobby() {
   let isLoading = useSelector(state => state.util.isLoading);
   let room = useSelector(state => state.user.room);
   let gamePhase = useSelector(state => state.game.phase);
   let playersList = useSelector(state => state.game.players);
   let partyClosed = useSelector(state => state.game.partyClosed);
   let peerConnected = useSelector(state => state.util.peerConnected)
   let socketConnected = useSelector(state => state.util.socketConnected)
   let wolfNumber = useSelector(state => state.options.wolfNumber);
   let extras = useSelector(state => state.options.extras);
   let sessionID = sessionStorage.getItem("sessionID");
   let dispatch = useDispatch()

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true)

   if (sessionID === null) {
      return <Navigate to="/" />
   }

   if (gamePhase !== null) {
      return <Navigate to="/game" />
   }


   if (!socketConnected) {
      connect(dispatch);
   }

   let lobby = sessionStorage.getItem("lobby");
   if (room === null && lobby !== null) {
      console.log("Refreshing lobby")
      dispatch(setRoom(lobby))
      room = lobby
      join(room, dispatch)
   }

   if (room !== null && !peerConnected) {
      return (
         <>
            <MyNavbar display={"block"} />
            <LoadingOverlay active={true} spinner text='Reloading the lobby...'>
               <div role="main" style={{ height: "300px" }}>
               </div>
            </LoadingOverlay>
         </>
      );
   } else if (room === null) {
      return <Navigate to="/" />
   } else {
      return (
         <>
            <MyNavbar display={"block"} />
            <LoadingOverlay active={isLoading} spinner text='Starting the game...'>
               <div role="main">
                  <NotificationContainer />

                  <Container>
                     <div className="mx-auto pt-5 text-center col-lg-6 col-9"><h2 style={{ color: "white" }}>Lobby: {room}</h2></div>
                     <Row className="d-flex justify-content-center">
                        <div className="my-1 pt-2 container col-lg-6 col-9 rounded trnsp">
                           <div className="d-lg-flex px-3 pt-3 pb-2 rounded justify-content-around flex-wrap trnsp2" >
                              {playersList.map((player, index) => (
                                 <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center" style={{ height: "40px"}}>
                                    <div className="m-auto text-center">
                                       {player.username}
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <div className="mb-3">
                              {partyClosed
                                 ? <><PlayButton extras={extras} wolfNumber={wolfNumber} players={playersList}/><OptionButton handleShow={handleShow} /><OptionModal maxWolf={playersList.length - 1} show={show} handleClose={handleClose} /><LeaveButton /></>
                                 : <><CloseButton roomName={room} numPlayers={playersList.length} /><LeaveButton /></>
                              }
                           </div>

                        </div>
                     </Row>
                  </Container>
               </div>
            </LoadingOverlay>
         </>
      );
   }
}

export default Lobby;

