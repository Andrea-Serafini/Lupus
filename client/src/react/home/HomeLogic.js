import { NotificationManager } from "react-notifications"

import { PARTY_MIN_LENGTH, PARTY_MAX_LENGTH } from "../../util/config"
import { createPeer } from "../../peer/Peer"
import { setIsLoading, setPeerConnected } from "../../redux/util/reducer"
import { socket } from "../../socket/socket";

export function join(inputParty, dispatch) {
    if (isPartynameValid(inputParty)) {
        dispatch(setIsLoading(true));
        createPeer(socket, inputParty, dispatch)
        console.log("Join " + inputParty)
    } else {
        NotificationManager.error("Room name need to be between 6 and 12 characters", "Invalid name", 3000)
    }
}

function isPartynameValid(str) {
    return !(str === undefined || str === null || str.trim().length < PARTY_MIN_LENGTH || str.trim().length > PARTY_MAX_LENGTH)
}


