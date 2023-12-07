import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    username: null,
    id: null,
    room: null,
    token: null
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
    },
})

export const { setUsername, setId, setRoom, setToken } = userSlice.actions
export default userSlice.reducer