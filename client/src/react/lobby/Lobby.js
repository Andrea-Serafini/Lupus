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
import RejoinButton from "./components/buttons/RejoinButton";

function Lobby() {
   let isLoading = useSelector(state => state.util.isLoading);
   let room = useSelector(state => state.user.room);
   let username = useSelector(state => state.user.username);
   let gamePhase = useSelector(state => state.game.phase);
   let playersList = useSelector(state => state.game.players);
   let myPlayer = playersList.filter((player) => player.username === username)[0]
   let partyClosed = useSelector(state => state.game.partyClosed);
   let peerConnected = useSelector(state => state.util.peerConnected)
   let socketConnected = useSelector(state => state.util.socketConnected)
   let wolfNumberOptions = useSelector(state => state.options.wolfNumber);
   let extrasOptions = useSelector(state => state.options.extras);
   let wolfNumber = useSelector(state => state.game.wolfNumber);
   let extras = useSelector(state => state.game.extras);
   let sessionID = sessionStorage.getItem("sessionID");
   let dispatch = useDispatch()

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true)

   if (sessionID === null) {
      return <Navigate to="/" />
   } else if (gamePhase !== null && imOnline(myPlayer)) {
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
            <MyNavbar display={"block"} inGame={"none"}/>
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
            <MyNavbar display={"block"} inGame={"none"}/>
            <LoadingOverlay active={isLoading} spinner text='Starting the game...'>
               <div role="main">
                  <NotificationContainer />

                  <Container>
                     <div className="mx-auto pt-5 text-center col-lg-6 col-9"><h2 style={{ color: "white" }}>Lobby: {room}</h2></div>
                     <Row className="d-flex justify-content-center">
                        <div className="my-1 pt-2 container col-lg-6 col-9 rounded trnsp">
                           <div className="d-lg-flex px-3 pt-3 pb-2 rounded justify-content-around flex-wrap trnsp2" >
                              {playersList.map((player, index) => (
                                 <div key={index} className="rounded bg-white col-lg-5 mb-2 d-flex align-items-center" style={{ height: "40px" }}>
                                    <div className="m-auto text-center">
                                       {player.username}
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <div className="mb-3">
                              {partyClosed ?
                                 <>
                                    {wasOnline(myPlayer) ?
                                       <RejoinButton players={playersList} username={username} />
                                       :
                                       <>
                                          <PlayButton extras={extras} wolfNumber={wolfNumber} players={playersList} />
                                          <OptionButton handleShow={handleShow} />
                                          <OptionModal maxWolf={playersList.length - 1} show={show} handleClose={handleClose} />
                                       </>
                                    }
                                    <LeaveButton players={playersList} username={username} />
                                 </>
                                 :
                                 <>
                                    <CloseButton roomName={room} numPlayers={playersList.length} />
                                    <LeaveButton players={playersList} username={username} />
                                 </>
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

function wasOnline(me) {
   if (me) {
      if (me.role && !me.online) {
         return true
      } else {
         return false
      }
   } else {
      return false
   }
}

function imOnline(me) {
   if (me) {
      console.log("me is " + me.online)
      return me.online
   } else {
      console.log("me is not present")
      return false
   }
}

export default Lobby;

