import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import { Redirect } from 'react-router-dom'
import "../css/Favorites.css";



const Favorites = (params) => {
  const currentUser = getCurrentUser();
  const history = useHistory();
 
  const cafeData = params.location.state.favs
  console.log(cafeData)

const deleteFavorite = (id) =>{
    
}


const display = () => {
    return cafeData.map((data, index)=>{
        console.log(data._id)
        return(
                <div key={index} className = "col s12 m6">
                    <div className="card-deck">
                    <div className="card">
                        <img className="card-img-top" src={data.ImageURL} alt="cafe picture"/>
                    <div className="card-body">
                        <h5 className="card-title">{data.Name}</h5>
                        <p className="card-text">{data.Address}</p>
                        <button onClick={()=>{
                            
                        }}>Delete</button>
                    </div>
                    </div>
                    </div>
                </div>
        )
    })
}

 
  
//   const display = () => {

    
    // return cafeData.favs.map((favorite, index) => {
        
    //   return (
    //       <Card style={{ width: "18rem" }} bg={"dark"} text={"white"}>
    //         <Card.Img variant="top" src={favorite.ImageURL} />
    //         <Card.Body>
    //           <Card.Title>{favorite.Name}</Card.Title>
    //           <Card.Text>{favorite.Address}</Card.Text>
    //           <div>
    //             <li className="favorite" key={index}>
    //               {favorite}
    //             </li>
    //             {/* <button className="whiteRoundedButton" onClick={deleteFavorite}>
    //               Delete
    //             </button> */}
    //           </div>
    //         </Card.Body>
    //       </Card>
    //   );
//     });
//   };



//   const deleteFavorite = (e) => {
//     let YELP = e.target.parentElement.querySelector("li").innerHTML;
//     let id = currentUser.id;

//     axios
//       .put(API_URL_FAVORITES + id, { yelpId: YELP })
//       .then((res) => {
//         console.log("deleting favorites", res.data);
//         window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const switchBetweenPages = () => {
//     history.push("/profile");
//   };

//   useEffect(() => {
//     displayFavorites();
//   }, []);

  return (
      <div className="container">
      <div className="row">{display()}</div>
      </div>
  )
};

export default Favorites;
