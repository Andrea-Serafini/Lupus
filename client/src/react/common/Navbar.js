import React from "react";
import { useDispatch, useSelector } from "react-redux"

import logo from "../../img/logo-lupus.png"
import logoMobile from "../../img/logo-lupus-small.png"
import { Navbar, Container, NavDropdown } from "react-bootstrap"
import { logout } from "../../socket/socket";


// Here, we display our Navbar
export default function MyNavbar(props) {

  let username = useSelector(state => state.user.username);
  let dispatch = useDispatch();


  return (
    <>
      <Navbar className="">
        <Container style={{ paddingLeft: "0px", marginRight: "0px", marginLeft: "0px", maxWidth: "100%" }}>
          <Navbar.Brand className="mr-0" >
            <img className="d-none d-md-inline" style={{ height: 50 }} alt="logo" src={logo} />
            <img className="d-inline d-md-none" style={{ width: 25 + '%' }} alt="logoMobile" src={logoMobile} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={username} id="basic-nav-dropdown" style={{ color: "white", display: props.display }}>
              <NavDropdown.Item onClick={() =>logout(dispatch)}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )

}
