import { createUser, sendMessage } from "../../peer/Peer"
import { addHistory, setPhase, setPlayers } from "../../redux/game/reducer"
import { EXTRAS, ROLES } from "../../util/config"


export function sendFinalConfig(wolfNumber, extras) {
    sendMessage({ "maxWolf": wolfNumber })
    extras.forEach((extra) => {
        sendMessage({ "extra": extra.name, "used": extra.used })
    })
}

export function assignRoles(dispatch, players, wolfNumber, extras) {
    console.log("Assigning roles")
    let playersList = []
    let wolfCounter = 0
    let extrasIndex = 0
    let usedExtras = JSON.parse(JSON.stringify(extras))

    let list = createRandomOrderedList(players.length)

    list.forEach((index) => {
        let player
        if (wolfCounter < wolfNumber) {
            wolfCounter++
            player = createUser(players[index].username, players[index].peerID, ROLES[1], true, players[index].vote, true)

        } else if (extrasToUse(usedExtras)) {
            usedExtras[extrasIndex].used = false
            player = createUser(players[index].username, players[index].peerID, EXTRAS[extrasIndex + 1], true, players[index].vote, true)

        } else {
            player = createUser(players[index].username, players[index].peerID, ROLES[2], true, players[index].vote, true)

        }
        playersList = [...playersList, player]
    })
    
    dispatch(setPlayers(playersList))
    sendMessage({ "players": playersList })
    dispatch(setPhase("night"))
    sendMessage({ "phase": "night" })

    let wolfHistory
    if (wolfNumber === 1) {
        wolfHistory = "There is " + wolfNumber + " wolf"
    } else {
        wolfHistory = "There are " + wolfNumber + " wolves"
    }
    dispatch(addHistory(wolfHistory))
    sendMessage({ "history": wolfHistory })

    extras.forEach((extra) => {
        if (extra.used) {
            dispatch(addHistory("There is a " + extra.name ))
            sendMessage({ "history": "There is a " + extra.name })
        }
    })

    function extrasToUse(extras) {
        for (extrasIndex; extrasIndex < extras.length; extrasIndex++) {
            if (extras[extrasIndex].used === true) return true
        }
        return false
    }
}



function createRandomOrderedList(value) {
    const numbers = Array.from({ length: value }, (_, index) => index);

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers
}
