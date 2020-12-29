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
    console.log(yelpId)
    const APIURL="https://localhost:8080/api/cafe/all"

    // const addToFavorites = (YelpId) => {
    //     return axios.post(APIURL, {
    //         // id, 
    //         YelpId
    //     })
    //     .then((res)=> {
    //         console.log(res)
    //     })
    //     .catch((err)=> {
    //         console.log(err)
    //     })
    // }
    console.log(currentUserId)
    const handleClick = (e) => {
        e.preventDefault()
        const yelp = {
            id: currentUserId,
            YelpId: yelpId
        }
        console.log('YELP OBJ:' , yelp)
        axios.post('http://localhost:8080/api/cafe/all', yelp)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     if(currentUserId){
    //         addToFavorites(yelpId, currentUserId)
    //     } else {
    //         console.log("you are not logged in!")
    //     }
    // }
    return (
        <div>
            {cafeData.name}
            <button onClick={handleClick}>Add to Favorites</button>
        </div>

        
        //write function to save YelpId to backend
    )
}

export default Cafe