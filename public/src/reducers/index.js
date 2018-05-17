// THIS FILE COMBINES ALL REDUCERS
import { combineReducers } from 'redux'

// BELOW IS WHERE I WILL PUT USER REDUCERS IE WHERE I HOLD USER STATE. BOARD REDUCERS, COMMENT REDUCERS ETC.

import userReducer from './user-reducer';
import dataReducer from './data-reducer';

export default combineReducers({
    user: userReducer,
    data: dataReducer
})