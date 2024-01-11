import { createSlice } from '@reduxjs/toolkit'
import { EXTRAS, WOLF_STD_NUM } from '../../util/config'

var initialState = {
    wolfNumber: WOLF_STD_NUM,
    extras: [{ name: EXTRAS[1], used: false }, { name: EXTRAS[2], used: false }, { name: EXTRAS[3], used: false }]
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
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

function changeExtras(state, action) {
    state.extras.forEach(extra => {
        if (extra.name == action.payload.name) {
            extra.used = action.payload.used
        }
    });
}

export const { setWolfNumber, toggleExtras, setExtras } = optionsSlice.actions
export default optionsSlice.reducer