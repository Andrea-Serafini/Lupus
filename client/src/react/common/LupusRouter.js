import React from "react";

import { Routes, Route, Link } from "react-router-dom";


import Authentication from "../login/Authentication";
import Lobby from "../lobby/Lobby";
import Game from "../game/Game";

import Navbar from "./Navbar"
import { useTranslation } from "react-i18next";

export default function LupusRouter() {
  


  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Authentication />} />
        <Route path="/lobby" element={<><Lobby /></>} />
        <Route path="/game" element={<><Game /></>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar displayLang={"block"} />
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        <h1>Oops! {t("You seem to be lost.")}</h1>
        <p>{t("Click")} <Link style={{ color: "white" }} to='/'>{t("here")}</Link> {t("to get back on track")}</p>
      </div>
    </>
  )
}
