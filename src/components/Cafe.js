import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {getCurrentUser} from '../services/auth.service'

const Cafe = (params) => {
    console.log(params.location.state.data)
    const cafeData = params.location.state.data
    const currentUser = getCurrentUser()
    const currentUserId = currentUser.id
    const [yelpId, setYelpId] = useState(cafeData.id)
    const APIURL="https://localhost:8080/api/cafe/all"

    const addToFavorites = (yelpId, currentUserId) => {
        return axios.post(APIURL, {
            currentUserId, yelpId
        })
        .then((res)=> {
            console.log(res)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(currentUserId){
            addToFavorites(yelpId, currentUserId)
        } else {
            console.log("you are not logged in!")
        }
    }
    return (
        <div>
            {cafeData.name}
            <button onClick={handleClick}>Add to Favorites</button>
        </div>

        
        //write function to save YelpId to backend
    )
}

export default Cafe