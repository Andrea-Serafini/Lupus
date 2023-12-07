import React from "react";

import { Routes, Route, Link } from "react-router-dom";


import Authentication from "../login/Authentication";
import Lobby from "../lobby/Lobby";
import Game from "../game/Game";

import Navbar from "./Navbar"

export default function LupusRouter() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Authentication />} />
        <Route path="/lobby" element={<><Lobby /></>} />
        <Route path="/game" element={<><Navbar display={"none"} /><Game /></>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function NotFound() {
  return (
    <>
      <Navbar display={"none"} />
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        <h1>Oops! You seem to be lost.</h1>
        <p>Click <Link to='/'>here</Link> to get back on track</p>
      </div>
    </>
  )
}

/*
<Route path="/login" element={<><Navbar display={"none"}/><Login /></>} />
        <Route path="/home" element={<><Navbar display={"block"}/><Home /></>} />
*/