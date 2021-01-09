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
    const [cafe,setCafe] = useState([])
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
            gettingCafeData(favorite)
            return (
                
             <> 

              <Card style={{ width: '18rem'}} bg={'dark'} text={'white'}>
                <Card.Img variant="top" src={cafe.ImageURL} />
                <Card.Body>
                  <Card.Title>{cafe.Name}</Card.Title>
                   <Card.Text>{cafe.Address}</Card.Text>
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
    
    const gettingCafeData = (e) =>{
        const id = {
            YelpId: e
        }
        console.log("e", e)
        axios.get("http://localhost:8080/api/cafe/favorite", id)
        .then((res)=>{
            
            setCafe(res.data)
            
           
        })
        .catch((err)=>{
            console.log(err)
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