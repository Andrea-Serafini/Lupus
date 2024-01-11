import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    socketConnected: false,
    peerConnected: false,
    isLoading: false,
    cardVisible: false 
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
        setCardVisible(state, action) {
            state.cardVisible = action.payload
        },
    },
})

export const { setSocketConnected, setPeerConnected, setIsLoading, setCardVisible } = utilSlice.actions
export default utilSlice.reducer