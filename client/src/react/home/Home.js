import { useState } from 'react';
import { useSelector } from "react-redux"
import LoadingOverlay from "react-loading-overlay-ts"
import { NotificationContainer } from "react-notifications"
import { Container, Row, Form } from 'react-bootstrap';

import MyNavbar from "../common/Navbar";
import PartyInput from "./components/input/PartyInput"
import JoinButton from "./components/buttons/JoinButton"
import CreateButton from "./components/buttons/CreateButton"
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function Home(props) {
   
   const { t } = useTranslation();
   let isLoading = useSelector(state => state.util.isLoading);
   let username = useSelector(state => state.user.username);
   let peerConnected = useSelector(state => state.util.peerConnected)

   const [inputParty, setInputParty] = useState(undefined)

   if (!peerConnected) { //(room === null) {
      return (
         <>
            <MyNavbar display={"none"} displayFull={"block"} inGame={"none"} />
            <LoadingOverlay active={isLoading} spinner text={t('Peer initializing')+'...'}>
               <div role="main">
                  <NotificationContainer />
                  <Container>
                     <div className="mx-auto pt-5 text-center col-lg-6 col-9"><h2 style={{ color: "white" }}>{t('Welcome')} {username}!</h2></div>
                     <Row className="d-flex justify-content-center">
                        <div className="my-1 container col-lg-6 col-9 rounded trnsp">
                           <Form className="mt-1 mb-3" onSubmit={(e) => e.preventDefault()} >
                              <PartyInput party={inputParty} onChange={input => setInputParty(input)} />
                              <div>
                                 <JoinButton party={inputParty} />
                                 <CreateButton party={inputParty} />
                              </div>
                           </Form>
                        </div>
                     </Row>
                  </Container>
               </div>
            </LoadingOverlay>
         </>
      );
   } else {
      return <Navigate to="/lobby" />
      //return (<Lobby />)
   }
}

export default Home;