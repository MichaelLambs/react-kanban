// ALL MUTATIONS IMPORTED FROM TYPES.JS
import {
    CLEAR_DATA,
    SET_USER_BOARDS,
    SET_USER_BOARD,
    SET_BOARD_LISTS,
    SET_LIST_TASKS,
    SET_TASK_COMMENTS,
    CLEAR_LIST_DOWN_DATA
} from '../actions/types'

const initialState = {
    board: {},
    boards: [],
    lists: [],
    tasks: {},
    comments: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_DATA:
            return {
                ...state,
                board: {},
                boards: [],
                lists: [],
                tasks: {},
                comments: {}
            }
        case CLEAR_LIST_DOWN_DATA:
            return {
                ...state,
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
        case SET_TASK_COMMENTS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.taskId]: action.payload.comments
                }
            }
        default:
            return state
    }
}

// EXAMPLE OF SETTING KEY, VALUE PAIR ON STATE IE (VUE.SET) WITH REDUX
// return {
//     ...state,
//     comments: {
//         ...state.comments,
//         [action.payload.taskId]: action.payload.comments
//     }
// }