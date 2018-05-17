// ALL MUTATIONS
import { CLEAR_DATA, SET_USER_BOARDS, SET_USER_BOARD, SET_BOARD_LISTS, SET_LIST_TASKS } from '../actions/types'

const initialState = {
    board: {},
    boards: [],
    lists: [],
    tasks: {},
    comments: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case CLEAR_DATA:
        return {
            ...state,
            board: {},
            boards: [],
            lists: [],
            tasks: {},
            comments: {}
        }
        case SET_USER_BOARDS:
            return {
                ...state.boards,
                boards: action.payload
            }
        case SET_USER_BOARD:
            return {
                ...state,
                board: action.payload
            }
        case SET_BOARD_LISTS:
            return {
                ...state,
                lists: action.payload
            }
        case SET_LIST_TASKS:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.listId]: action.payload.tasks
                }
            }
            

    //         case 'addConnection':
            //   return Object.assign({}, state, {
            //     connections: state.connections.concat({
            //       [compositeKey]: connection
            //     })
            //   });

        default:
            return state
    }
}