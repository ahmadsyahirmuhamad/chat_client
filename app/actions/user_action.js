import { LOGIN_FAILED, LOGIN_SUCCESS, UPDATE_TOKEN } from "./types";
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


export function updateToken(token) {
    return function(dispatch){
        const payload = { type: UPDATE_TOKEN, payload: { token: token } }
        dispatch(payload)
    }
}
