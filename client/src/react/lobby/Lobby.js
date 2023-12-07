import { useSelector } from "react-redux"
import LoadingOverlay from "react-loading-overlay-ts"
import { NotificationContainer } from "react-notifications"
import { Container, Row } from 'react-bootstrap';

import MyNavbar from "../common/Navbar";
import ale from "../../img/ale.svg"
import { FILTERS } from "../../util/config";
import CloseButton from "./components/buttons/CloseButton";
import LeaveButton from "./components/buttons/LeaveButton";

function Lobby() {
   let isLoading = useSelector(state => state.util.isLoading);
   let username = useSelector(state => state.user.username);
   let room = useSelector(state => state.user.room);

   return (
      <>
         <MyNavbar display={"block"} />
         <LoadingOverlay active={isLoading} spinner text='Peer initializing...'>
            <div role="main">
               <NotificationContainer />
               <Container>
                  <div className="mx-auto pt-5 text-center col-lg-6 col-9"><h2 style={{ color: "white" }}>Lobby: {room}</h2></div>
                  <Row className="d-flex justify-content-center">
                     <div className="my-1 pt-2 container col-lg-6 col-9 rounded trnsp">
                        <div className="d-lg-flex justify-content-around flex-wrap" >
                           <div className="rounded bg-white col-lg-5 mr-auto mb-2" style={{ textAlign: "center" }}><img src={ale} alt="Icona" style={{ padding: "3px", height: "40px", filter: FILTERS[1] }} />{username}</div>
                        </div>
                        <div className="mb-3">
                           <CloseButton />
                           <LeaveButton />
                        </div>
                     </div>
                  </Row>
               </Container>
            </div>
         </LoadingOverlay>
      </>
   );
}

export default Lobby;