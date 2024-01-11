import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    partyClosed: false,
    players: [],
    phase: null,
    history: []
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPartyClosed(state, action) {
            state.partyClosed = action.payload
        },
        setPlayers(state, action) {
            state.players = action.payload
        },
        addPlayer(state, action) {
            state.players = [...state.players, action.payload]
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
    },
})

function remove(state, action) {
    if (state.phase === null){
        let updated = state.players.filter((player) => player.peerID !== action.payload)
        state.players = updated
    } else {
        state.players.forEach(player => {
            if (player.peerID !== action.payload) {
                player.online = false
                player.alive = false
            }
        });
    }
}

export const { setPartyClosed, setPlayers, addPlayer, removePlayer, setPhase, setHistory, addHistory } = gameSlice.actions
export default gameSlice.reducer