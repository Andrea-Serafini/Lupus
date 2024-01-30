import { combineReducers } from "redux"

import userReducer from "./user/reducer"
import utilReducer from "./util/reducer"
import gameReducer from "./game/reducer"

const allReducers = combineReducers({
    user: userReducer,
    util: utilReducer,
    game: gameReducer
})

export default allReducers