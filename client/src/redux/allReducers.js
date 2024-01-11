import { combineReducers } from "redux"

import userReducer from "./user/reducer"
import utilReducer from "./util/reducer"
import gameReducer from "./game/reducer"
import optionsReducer from "./options/reducer"

const allReducers = combineReducers({
    user: userReducer,
    util: utilReducer,
    game: gameReducer,
    options: optionsReducer
})

export default allReducers