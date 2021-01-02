import React from 'react'
import {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {getCurrentUser} from '../services/auth.service'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

const Favorites = (props) => {
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [favs,setFavs] = useState([])
    const displayFavorites  = () =>{
        // const id = {
        //     id: currentUser.id
        // }
        let id = currentUser.id
        axios.get("http://localhost:8080/api/user/favorites/" + id)
        .then((res)=>{
            
            let favorites = res.data.favorites
            setFavs(favorites)
           
        })

        .catch((err)=>{
            console.log(err)
        })

        
    }

    const display = () =>{
        return favs.map((favorite, index)=>{
            return (
                <div key={index}>
                   <li>{favorite}</li>
                </div>
            )
        })
    }
    
    
    // const deleteFavorite  = () =>{
    //     // const id = {
    //     //     id: currentUser.id
    //     // }
    //     let id = currentUser.id
    //     axios.delete("http://localhost:8080/api/user/favorites/" + id)
    //     .then((res)=>{
    //         console.log("deleting favorites", res)
    //         console.log(id)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }

    const switchBetweenPages = () =>{
        history.push("/profile")
    }

     useEffect (()=>{
        displayFavorites()
     },[])




    return(
        <div className='container'> 
          {/* <button onClick={switchBetweenPages}>Info</button>
          <button>Favorites</button>
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
                
            </header> */}
            <h4>My Favorite Cafes:</h4>
            <div className="row">{display()}</div>
            {/* <button onClick={displayFavorites}>Test</button> */}
            {/* <button onClick={deleteFavorite}>Delete Favorite</button> */}
           
        </div>
    )
}

export default Favorites