import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import { NotificationContainer } from "react-notifications"
import LoadingOverlay from "react-loading-overlay-ts"
import { Container, Row, Form } from 'react-bootstrap';

import UsernameInput from "./components/input/UsernameInput"
import PasswordInput from "./components/input/PasswordInput"
import LoginButton from "./components/buttons/LoginButton"
import SignupButton from "./components/buttons/SignupButton"
import { connect } from "../../socket/socket"

import Home from "../home/Home";
import MyNavbar from "../common/Navbar";
import { useTranslation } from 'react-i18next';

export default function CredentialsForm(props) {
   const { t } = useTranslation();

   let dispatch = useDispatch();

   let isLoading = useSelector(state => state.util.isLoading)
   let socketConnected = useSelector(state => state.util.socketConnected)
   let token = useSelector(state => state.user.token);
   const [inputUsername, setInputUsername] = useState(undefined)
   const [inputPassword, setInputPassword] = useState(undefined)

   function clearState() {
      setInputUsername("");
      setInputPassword("");
      document.getElementById("loginForm").reset();
   }

   if (token === null) {
      return (
         <>
            <MyNavbar display={"none"} displayFull={"none"} inGame={"none"}/>
            <LoadingOverlay active={isLoading} spinner text={t('Connecting to server...')}>
               <div role="main" >
                  <NotificationContainer />
                  <Container>
                     <div className="mx-auto pt-5 text-center col-lg-6 col-9"><h2 style={{ color: "white" }}>{t("Login")}</h2></div>
                     <Row className="d-flex justify-content-center">
                        <div className="my-1 container col-lg-6 col-9 rounded trnsp">
                           <Form id='loginForm' className="mt-1 mb-3">
                              <UsernameInput username={inputUsername} password={inputPassword} onChange={input => setInputUsername(input)} cb={() => clearState()} />
                              <PasswordInput username={inputUsername} password={inputPassword} onChange={input => setInputPassword(input)} cb={() => clearState()} />
                              <div>
                                 <LoginButton username={inputUsername} password={inputPassword} cb={() => clearState()} />
                                 <SignupButton username={inputUsername} password={inputPassword} cb={() => clearState()} />
                              </div>
                           </Form>
                        </div>
                     </Row>
                  </Container>
               </div>
            </LoadingOverlay>
         </>
      )
   } else {
      if (!socketConnected) {
         connect(dispatch);
      }
      return (<Home />)
   }

}