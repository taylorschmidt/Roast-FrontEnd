import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



const Home = () => {
    
    useEffect(() => {
        let API_KEY = "opj0qRGSY4uyO7tbxbzc6OICo0yziXXjc-p1vwBmnqLU5WM9KesSE1t0s8Hgo5x4dCcJDYWEvDeRx7HpK8mG-RKp6G6x5eh0dcDYD8vgs7MWnu_W20lpvaZMICTVX3Yx"
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
        params: {
            location: 80204, //here is where we have our form input 
            categories: 'coffee', //this gives the best cafe results
            limit: 10 //we can make a limit for how many appear when they search
        }
    })
    .then((res) => {
    console.log(res)
    //here is where can set state to include the yelp data
    })
    .catch((err) => {
    console.log ('error')
    })
    }, [])

return(
    <>
        HomePage
        <div>
        Search Form can go here!
        </div>
    </>
)

}
export default Home