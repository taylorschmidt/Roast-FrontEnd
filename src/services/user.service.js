import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_USER : process.env.REACT_APP_PRO_URL_USER;

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