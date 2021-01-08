import React from 'react'
import {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {getCurrentUser} from '../services/auth.service'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
// import { Redirect } from 'react-router-dom'
import '../css/Favorites.css'

const API_URL_FAVORITES = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_FAVORITES : process.env.REACT_APP_PRO_URL_FAVORITES;

const Favorites = (props) => {
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [favs,setFavs] = useState([])
    // const [yelpData, setYelpData] = useState([])
    const displayFavorites  = () =>{
        // const id = {
        //     id: currentUser.id
        // }
        let id = currentUser.id
        axios.get(API_URL_FAVORITES + id)
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
                
             <> 

              <Card style={{ width: '18rem'}} bg={'dark'} text={'white'}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Favorite {index + 1}</Card.Title>
                     <div>
                        <li className="favorite" key = {index}>{favorite}</li>
                        <button className="whiteRoundedButton" onClick={deleteFavorite}>Delete</button>
                     </div>
                   </Card.Body>
               </Card>
            </>
            )
        })
    }
    
    const yelp = (ID) => {
        let API_KEY = "opj0qRGSY4uyO7tbxbzc6OICo0yziXXjc-p1vwBmnqLU5WM9KesSE1t0s8Hgo5x4dCcJDYWEvDeRx7HpK8mG-RKp6G6x5eh0dcDYD8vgs7MWnu_W20lpvaZMICTVX3Yx"
        axios.get(`${'https://sleepy-stream-23951.herokuapp.com/'}https://api.yelp.com/v3/businesses/${ID}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            params: {
                   
                limit: 1 //we can make a limit for how many appear when they search
            }
    })
        .then((res) => {
            //set results to state
            let yelpData = res.data
            //console log the yelp results for that searched location
            console.log(res)
            console.log("YELP DATA:", yelpData)
           
           
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
    
    
    
    
    const deleteFavorite  = (e) =>{
        let YELP = e.target.parentElement.querySelector('li').innerHTML
        
        // const yelp = {
        //     yelpId: YELP
        // }

        let id = currentUser.id
        
        axios.put(API_URL_FAVORITES + id, {yelpId:YELP})
        .then((res)=>{
            console.log("deleting favorites", res.data)
            window.location.reload()
            // console.log(yelp)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const switchBetweenPages = () =>{
        history.push("/profile")
    }

     useEffect (()=>{
        displayFavorites()
     },[])




    return(
    <div className='coffeeBackground'> 
        <div className="d-flex justify-content-center pt-4 ">
          <button className="mr-1 roundedButton" onClick={switchBetweenPages}>Info</button>
          <button className="ml-1 roundedButton">Favorites</button>
        </div>

        
          <div class="row mt-3" >{display()}</div>

            {/* {yelpData} */}
            {/* <button onClick={displayFavorites}>Test</button> */}
            {/* <button onClick={deleteFavorite}>Delete Favorite</button> */}
               
               
        </div>
        
    )
}

export default Favorites