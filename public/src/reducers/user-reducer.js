// ESENTIALLY MUTATIONS FOMR VUE
import { LOGIN_USER } from '../actions/types'

const intialState = {
    user: {}
}

export default function(state = intialState, action){
    switch(action.type){
        case LOGIN_USER:
        return {
            ...state,
                user: action.payload
        }
        default:
            return state
    }
}