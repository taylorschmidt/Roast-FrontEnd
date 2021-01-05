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
    const [yelpData, setYelpData] = useState([])
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
                yelp(favorite)
            )
        })
    }
    
    const yelp = (ID) => {
        let API_KEY = "opj0qRGSY4uyO7tbxbzc6OICo0yziXXjc-p1vwBmnqLU5WM9KesSE1t0s8Hgo5x4dCcJDYWEvDeRx7HpK8mG-RKp6G6x5eh0dcDYD8vgs7MWnu_W20lpvaZMICTVX3Yx"
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${ID}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
    })
        .then((res) => {
            //set results to state
            setYelpData(res.data.businesses)
            //console log the yelp results for that searched location
            console.log(res.data.businesses)
        })
        .catch((err) => {
            console.log ('error connecting to YELP')
        })
    }
    

    // const display = () => {
    //     return yelpData.map((data, index)=> {
    //         return (
    //             <div key={index} className = "col s12 m6">
    //                 <div className="card">
    //                     <img className="card-img-top" src={data.image_url} alt="cafe picture"/>
    //                 <div className="card-body">
    //                     <h5 className="card-title">{data.name}</h5>
    //                     <p className="card-text">{data.location.address1}</p>
    //                 </div>
    //                 <Link to={{
    //                     pathname: `/cafe/${index}`,
    //                     state: {data}
    //                 }}
    //                 key={data.name}
    //                 >
    //                     More Information
    //                 </Link> 
    //             </div>
    //             </div>
    //         )
    //     })
    // }
    
    
    
    
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
            {yelpData}
            {/* <button onClick={displayFavorites}>Test</button> */}
            {/* <button onClick={deleteFavorite}>Delete Favorite</button> */}
           
        </div>
    )
}

export default Favorites