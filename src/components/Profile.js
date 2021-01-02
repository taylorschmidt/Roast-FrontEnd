import React from 'react'
import { useHistory } from "react-router-dom"
import {getCurrentUser} from '../services/auth.service'
import Favorites from './Favorites'


const Profile = () => {
    const currentUser = getCurrentUser()
    const history = useHistory()

     const switchBetweenPages = () =>{
         history.push("/favorites")
     }

   




    return(
        <div className='container'>
            <button>Info</button>
            <button onClick={switchBetweenPages}>Favorites</button>
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
                <h6>{currentUser.email}</h6>
                {/* <h6>{currentUser.id}</h6> */}
            </header>
            {/* <p>
                <strong>Token:</strong>{currentUser.accessToken.substring(0, 20)}...{" "}
            </p> */}
            {/* <p>
                <strong>My User Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>My Email:</strong> {currentUser.email}
            </p> */}
            {/* if current user has roles, map through and display them */}
            {/* {currentUser.roles &&
            currentUser.roles.map((role, index)=> <li key={index}>{role}</li>)} */}
            {/* {favorites.map((favorite, index)=> <li key={index}>{favorite}</li>)} */}
            
           <Favorites />
        </div>
    )
}

export default Profile