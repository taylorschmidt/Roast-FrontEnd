import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const API_URL = "http://localhost:8080/api/test/"

//retrieve public content
export const getPublicContent = () => {
    return axios.get(API_URL + 'all')
}

// access user's content
export const getUserBoard = () => {
    //inputting header gives access to access token
    return axios.get(API_URL + "user", {header: authHeader()})
}

//access admin content
export const getAdminBoard = () => {
    return axios.get(API_URL + "admn", {header: authHeader()})
}