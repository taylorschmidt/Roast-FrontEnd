import axios from 'axios'
import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL = "http://localhost:8080/api/auth/"

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

