import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import Login from "../login/Login";
import Home from "../home/Home";
import { connect } from "../../socket/socket"

export default function Authentication() {

    //let token = useSelector(state => state.user.token);
    let socketConnected = useSelector(state => state.util.socketConnected);
    let sessionID = sessionStorage.getItem("sessionID");
    let dispatch = useDispatch();

    if (sessionID === null) {
        return (<Login />)
    } else {
        if (!socketConnected) {
            connect(dispatch);
        }
        return (<Home />)
    }


}
