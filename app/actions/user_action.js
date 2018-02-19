import { LOGIN_FAILED, LOGIN_SUCCESS, UPDATE_TOKEN, FETCH_USER_SUCCESS, FETCH_USER_FAILED } from "./types";
import Api from '../lib/Api'
import localStorage from '../lib/LocalStorage'

export function login(email, password) {
    return function(dispatch){
        const payload = { query: `mutation login { login(email: "${email}", password: "${password}") { token }}` }    
        return Api.post('/api/graphql', payload)
            .then(async (response) => {
                const { login } = response.data.data
                if (response.status === 200 && login != null) {
                    const payload = { type: LOGIN_SUCCESS, payload: { token: login.token } }
                    await localStorage.setItem("token", login.token)
                    dispatch(payload)
                    return login
                } else {
                    const payload = { type: LOGIN_FAILED, payload: { message: response.data.errors[0].message } }
                    dispatch(payload)
                    return login
                }
            }).catch((err) => {
                const payload = { type: LOGIN_FAILED, payload: { message: "error" } }
                dispatch(payload)
            })
    }
}

export function fetchUser() {
    return async function(dispatch){
        const payload = { query: `{ currentUser { id email firstName lastName }}` }
        const token = await localStorage.getItem("token")
        const headers = {headers: {'authorization': `Bearer ${token}`}}
        Api.post('/api/graphql', payload, headers)
            .then(async (response) => {
                const { currentUser } = response.data.data
                if (response.status === 200 && currentUser != null) {
                    const payload = { type: FETCH_USER_SUCCESS, payload: { user: currentUser } }
                    dispatch(payload)
                    // return currentUser
                } else {
                    const payload = { type: FETCH_USER_FAILED, payload: { message: response.data.errors[0].message } }
                    dispatch(payload)
                    // return currentUser
                }
            }).catch((err) => {
                const payload = { type: FETCH_USER_FAILED, payload: { message: "error" } }
                dispatch(payload)
            })
    }
}

export function updateToken(token) {
    return function(dispatch){
        const payload = { type: UPDATE_TOKEN, payload: { token: token } }
        dispatch(payload)
    }
}
