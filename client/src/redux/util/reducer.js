import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    socketConnected: false,
    peerConnected: false,
    isLoading: false
}

const utilSlice = createSlice({
    name: 'util',
    initialState,
    reducers: {
        setSocketConnected(state, action) {
            state.socketConnected = action.payload
        },
        setPeerConnected(state, action) {
            state.peerConnected = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
    },
})

export const { setSocketConnected, setPeerConnected, setIsLoading } = utilSlice.actions
export default utilSlice.reducer