import { createSlice } from '@reduxjs/toolkit'
import { sendMessageTo } from '../../peer/Peer'
import { EXTRAS, WOLF_STD_NUM } from '../../util/config'


var initialState = {
    gameCode: null,
    partyClosed: false,
    players: [],
    phase: null,
    history: [],
    //options
    wolfNumber: WOLF_STD_NUM,
    extras: [{ name: EXTRAS[1], used: false }, { name: EXTRAS[2], used: false }, { name: EXTRAS[3], used: false }]
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameCode(state, action) {
            state.gameCode = action.payload
        },
        setPartyClosed(state, action) {
            state.partyClosed = action.payload
        },
        setPlayers(state, action) {
            state.players = action.payload
        },
        addPlayer(state, action) {
            add(state, action)
        },
        updatePlayer(state, action) {
            update(state, action)
        },
        removePlayer(state, action) {
            remove(state, action)
        },
        setPhase(state, action) {
            state.phase = action.payload
        },
        setHistory(state, action) {
            state.history = action.payload
        },
        addHistory(state, action) {
            state.history = [action.payload, ...state.history]
        },
        //options
        setWolfNumber(state, action) {
            state.wolfNumber = action.payload
        },
        toggleExtras(state, action) {
            changeExtras(state, action)
        },
        setExtras(state, action) {
            state.extras = action.payload
        }
    },
})
function add(state, action) {
    let already = state.players.filter((player) => player.username === action.payload.username)[0]
    if (!already) state.players = [...state.players, action.payload]
}
function update(state, action) {
    if (state.phase == null) {
        add(state, action)
    } else {
        state.players.forEach(player => {
            if (player.username === action.payload.username) {
                //player.online = true
                player.peerID = action.payload.peerID
                sendMessageTo(action.payload.peerID, { "gameCode": state.gameCode })
                sendMessageTo(action.payload.peerID, { "phase": state.phase })
                sendMessageTo(action.payload.peerID, { "players": state.players })
                sendMessageTo(action.payload.peerID, { "allHistory": state.history })
                sendMessageTo(action.payload.peerID, { "maxWolf": state.wolfNumber })
                state.extras.forEach((extra) => {
                    sendMessageTo(action.payload.peerID, { "extra": extra.name, "used": extra.used })
                })

            }
        });
    }
}

function remove(state, action) {
    if (state.phase === null || state.phase === "goodWon" || state.phase === "badWon" ) {
        console.log("removing player")
        let updated = state.players.filter((player) => player.peerID !== action.payload)

        state.players = updated
    } else {
        console.log("offlining player")

        state.players.forEach(player => {

            if (player.peerID === action.payload) {
                player.online = false
                console.log("found offline player")

            }
        });
    }
}

//options
function changeExtras(state, action) {
    state.extras.forEach(extra => {
        if (extra.name === action.payload.name) {
            extra.used = action.payload.used
        }
    });
}

export const { setGameCode, setPartyClosed, setPlayers, addPlayer, updatePlayer, removePlayer, setPhase, setHistory, addHistory, setWolfNumber, toggleExtras, setExtras } = gameSlice.actions
export default gameSlice.reducer