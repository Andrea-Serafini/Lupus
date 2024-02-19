import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    username: null,
    room: null,
    token: null,
    stats: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload
        },
        setRoom(state, action) {
            state.room = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setStats(state, action) {
            state.stats = action.payload
        },
    },
})

export const { setUsername, setRoom, setToken, setStats } = userSlice.actions
export default userSlice.reducer