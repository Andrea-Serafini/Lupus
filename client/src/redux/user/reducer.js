import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    username: null,
    id: null,
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
        setId(state, action) {
            state.id = action.payload
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

export const { setUsername, setId, setRoom, setToken, setStats } = userSlice.actions
export default userSlice.reducer