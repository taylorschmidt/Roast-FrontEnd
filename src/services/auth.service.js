import axios from 'axios'
import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_AUTH : process.env.REACT_APP_PRO_URL_AUTH;

//function to register user
export const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    })
}

//login the user
export const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username,
        password
    })
.then((response)=>{
    //if the user has an access token
    if(response.data.accessToken){
        setItem('user', response.data)
    }
    return response.data
})
}

//logout the user
export const logout = () => {
    removeItem('user')
}

//get the current user
export const getCurrentUser = ()=> {
    return getItem('user')
}

