import { LOGIN_USER, CLEAR_DATA } from './types'
import axios from 'axios'
import history from '../history'
// var production = !window.location.host.includes('localhost')
// var baseUrl = production ? '//port-vue-kan-ban.herokuapp.com/' : '//localhost:3000/'

var baseUrl = '//localhost:3000/';

var auth = axios.create({
    baseURL: baseUrl + 'auth/',
    withCredentials: true
});

export const loginUser = (event) => dispatch => {
    event.preventDefault();
    const loginUser = {
        password: '',
        email: ''
    }
    loginUser.password = event.target.elements.password.value;
    loginUser.email = event.target.elements.email.value;
    console.log("LOGIN USER DATA", loginUser)
    return new Promise((resolve, reject) => {
        auth.post('login', loginUser)
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data.user
                });
                resolve();
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export const authenticate = () => dispatch => {
    auth.get('authenticate')
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const signupUser = (event) => dispatch => {
    event.preventDefault();
    const newUser = {
        username: '',
        password: '',
        email: ''
    }
    newUser.username = event.target.elements.username.value;
    newUser.password = event.target.elements.password.value;
    newUser.email = event.target.elements.email.value;
    console.log("LOGIN USER DATA", newUser)
    debugger
    auth.post('register', newUser)
        .then(res=> {
            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const logout = () => dispatch => {
    auth.delete('logout')
        .then(res => {
            dispatch(
                {
                type: LOGIN_USER,
                payload: {}
                },
                { 
                type: CLEAR_DATA
                }
            )
            history.push('/');
        })
}