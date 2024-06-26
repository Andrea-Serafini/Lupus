import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import logo from "../../img/LUPUS_LOGO.svg"
import logoMobile from "../../img/LUPUS_LOGO_MOBILE.svg"
import { Navbar, Container, NavDropdown } from "react-bootstrap"
import { logout, socket } from "../../socket/socket";
import { leave } from "../lobby/LobbyLogic";
import { useTranslation } from "react-i18next";
import LanguageModal from "../home/components/modals/LanguageModal";
import StatsModal from "../home/components/modals/StatsModal";


// Here, we display our Navbar
export default function MyNavbar(props) {
  const { t } = useTranslation();
  let username = useSelector(state => state.user.username);
  let dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showStats, setShowStats] = useState(false);
  const handleCloseStats = () => setShowStats(false);


  return (
    <>
      <Navbar className="">
        <LanguageModal show={show} handleClose={handleClose} />
        <StatsModal show={showStats} handleClose={handleCloseStats} />
        <Container style={{ paddingLeft: "0px", marginRight: "0px", marginLeft: "0px", maxWidth: "100%" }}>
          <Navbar.Brand className="mr-0" >
            <img className="d-none d-md-inline" style={{ height: 50 }} alt="logo" src={logo} />
            <img className="d-inline d-md-none" style={{ height: 50 }} alt="logoMobile" src={logoMobile} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={username} id="basic-nav-dropdown" style={{ color: "white", display: props.display || "none" }}>
              <NavDropdown.Item onClick={() => logout(dispatch)}>{t("Logout")}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={username} id="basic-nav-dropdown1" style={{ color: "white", display: props.displayFull || "none" }}>
              <NavDropdown.Item onClick={() => sendStatsReq(setShowStats, username)}>{t("Stats")}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setShow(true)}>{t("Language")}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => logout(dispatch)}>{t("Logout")}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t("Settings")} id="basic-nav-dropdown3" style={{ color: "white", display: props.displayLang || "none" }}>
              <NavDropdown.Item onClick={() => setShow(true)}>{t("Language")}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t("Leave")} id="basic-nav-dropdown2" style={{ color: "white", display: props.inGame || "none" }}>
              <NavDropdown.Item onClick={() => leave(dispatch, props.players, props.username)}>{t("Leave the game")}</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )

}

function sendStatsReq(setShowStats, username) {

  socket.emit("send_stats", { username: username })
  setShowStats(true)
}

