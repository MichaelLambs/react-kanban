import { SET_USER_BOARDS, SET_USER_BOARD, SET_BOARD_LISTS, SET_LIST_TASKS } from './types'
import axios from 'axios'

// var production = !window.location.host.includes('localhost')
// var baseUrl = production ? '//port-vue-kan-ban.herokuapp.com/' : '//localhost:3000/'

var baseUrl = '//localhost:3000/';

var serverAPI = axios.create({
    baseURL: baseUrl + 'api/',
    withCredentials: true
});

// region BOARD CRUD
export const getBoards = () => dispatch => {
    serverAPI.get('boards')
        .then(res => {
            dispatch({
                type: SET_USER_BOARDS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}

export const getBoard = (boardId) => dispatch => {
    return new Promise((resolve, reject) => {
        serverAPI.get('boards/' + boardId)
            .then(res => {
                dispatch({
                    type: SET_USER_BOARD,
                    payload: res.data
                })
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject(err);
            })
    })
}

export const addBoard = (event) => dispatch => {
    event.preventDefault();
    const board = {};
    board.name = event.target.elements.name.value;
    serverAPI.post('boards', board)
        .then(res => {
            dispatch(getBoards());
        })
        .catch(err => {
            console.log(err)
        })
    event.target.reset();
}

export const deleteBoard = (boardId) => dispatch => {
    serverAPI.delete('boards/' + boardId)
        .then(res => {
            dispatch(getBoards())
        })
        .catch(err => {
            console.log(err)
        })
}
// endregion BOARD CRUD

// region LIST CRUD
export const getLists = (boardId) => dispatch => {
    serverAPI.get('boards/' + boardId + '/lists')
        .then(res => {
            dispatch({
                type: SET_BOARD_LISTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}
// endregion LISTS

export const getTasks = (boardAndListId) => dispatch => {
        serverAPI.get('boards/' + boardAndListId.boardId + '/lists/' + boardAndListId.listId + '/tasks')
        .then(res => {
            dispatch({
                type: SET_LIST_TASKS,
                payload: {listId: boardAndListId.listId, tasks: res.data}
            })
        })
        .catch(err => {
            console.log(err)
        })
}