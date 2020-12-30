import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {getCurrentUser} from '../services/auth.service'

const Cafe = (params) => {
    console.log(params.location.state.data)
    const cafeData = params.location.state.data
    const currentUser = getCurrentUser()
    const currentUserId = currentUser.id
    const [yelpId, setYelpId] = useState(cafeData)
    console.log("LOOK HERE!", yelpId.id)
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
            YelpId: yelpId.id
        }
        console.log('YELP OBJ:' , yelp)
        axios.post('http://localhost:8080/api/cafe/all', yelp)
        .then(res => console.log("favorites:", res))
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
    useEffect(() => {
        console.log("Yelp: ", {YelpId: yelpId.id})
        const yelp = {
            YelpId: yelpId.id,
            Name: yelpId.name,
            Address: yelpId.location.address1,
       City: yelpId.location.city,
       Rating: yelpId.rating,
       ImageURL: yelpId.image_url,
       YelpURL: yelpId.url

        }
       axios.post("http://localhost:8080/api/yelp", yelp)
        .then((res)=>{
            console.log("here is our console.log", res.data)
    
        })
        .catch((err)=>{
             console.log(err)
        })
      },[])




    return (
         
        <div > 
            {cafeData.name}
            <button onClick={handleClick}>Add to Favorites</button>
            
        </div>

        
        //write function to save YelpId to backend
    )
}

export default Cafe