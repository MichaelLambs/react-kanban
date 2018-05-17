import { SET_USER_BOARDS, SET_USER_BOARD, SET_BOARD_LISTS, SET_LIST_TASKS, SET_TASK_COMMENTS, CLEAR_LIST_DOWN_DATA } from './types'
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
            event.target.reset();
        })
        .catch(err => {
            console.log(err)
        })
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

export const addList = (boardId, event) => dispatch => {
    event.preventDefault();
    const newList = {};
    newList.name = event.target.elements.list.value
    serverAPI.post('boards/' + boardId + '/lists', newList)
        .then(res => {
            dispatch(getLists(res.data.boardId))
        })
        .catch(err => {
            console.log(err)
        })
    event.target.reset();
}

export const deleteList = (list) => dispatch => {
    serverAPI.delete('boards/' + list.boardId + '/lists/' + list._id)
        .then(res => {
            dispatch(getLists(list.boardId))
        })
        .catch(err => {
            console.log(err)
        })
}
// endregion LISTS

// region TASKS CRUD
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

export const addTask = (taskList, event) => dispatch => {
    event.preventDefault();
    const task = {};
    task.body = event.target.elements.task.value
    serverAPI.post('boards/' + taskList.boardId + '/lists/' + taskList._id + '/tasks', task)
        .then(res => {
            dispatch(getTasks(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    event.target.reset();
}
// endregion

// region COMMENTS CRUD
export const getComments = (ids) => dispatch => {
    serverAPI.get('boards/' + ids.boardId + '/lists/' + ids.listId + '/tasks/' + ids.taskId + '/comments')
        .then(res => {
            dispatch({
                type: SET_TASK_COMMENTS,
                payload: {taskId: ids.taskId, comments: res.data}
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const addComment = (commentTask, event) => dispatch => {
    event.preventDefault();
    const comment = {};
    comment.body = event.target.elements.comment.value
    serverAPI.post('boards/' + commentTask.boardId + '/lists/' + commentTask.listId + '/tasks/' + commentTask._id + '/comments', comment)
        .then(res => {
            dispatch(getComments(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    event.target.reset();
}

export const clearData = () => dispatch => {
    dispatch({
        type: CLEAR_LIST_DOWN_DATA
    })
}