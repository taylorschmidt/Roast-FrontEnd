import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import { Redirect } from 'react-router-dom'
import "../css/Favorites.css";



const Favorites = ({favorites}) => {

  const currentUser = getCurrentUser();
  const history = useHistory();
 
  const API_URL_DELFAVES =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL_DELFAVES
    : process.env.REACT_APP_PRO_URL_DELFAVES;

    console.log(favorites)




const display = () => {
    return favorites.map((data, index)=>{
        console.log(data._id)
        return(
                <div key={index} className = "col s12 m6">
                    {/* <div className="card-deck"> */}
                    <div className="card">
                        <img className="card-img-top" src={data.ImageURL} alt="cafe picture"/>
                    <div className="card-body">
                        <h5 className="card-title">{data.Name}</h5>
                        <p className="card-text">{data.Address}</p>
                        <button onClick={()=>{
                            const currentUser = getCurrentUser();
                            let id = currentUser.id
                            console.log(data._id)
                            let cafeId = data._id
                            // console.log(cafeId)
                            axios
                              .put(API_URL_DELFAVES + id + "/" + cafeId)
                              .then((res) => {
                                console.log("favorite was deleted:", res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                              window.location.reload();
                        }}>Delete</button>
                    </div>
                    </div>
                    {/* </div> */}
                </div>
        
    )
    })
}

 

  return (
      <div className="container">
      <div className="row">{favorites && display()}</div>
      </div>
  )
};

export default Favorites;
