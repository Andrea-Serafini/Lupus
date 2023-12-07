import { combineReducers } from "redux"

import userReducer from "./user/reducer"
import utilReducer from "./util/reducer"

const allReducers = combineReducers({
    user: userReducer,
    util: utilReducer
})

export default allReducers