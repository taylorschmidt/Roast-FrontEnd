import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { Link } from "react-router-dom";
import axios from "axios";
import Favorites from "./Favorites";

//css
import "../css/Profile.css";

const Profile = () => {
  const API_URL_FAVORITES =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_URL_FAVORITES
      : process.env.REACT_APP_PRO_URL_FAVORITES;

  const currentUser = getCurrentUser();
  const history = useHistory();
  const [favs, setFavs] = useState();

  //  const switchBetweenPages = () =>{
  //      history.push("/favorites")
  //  }

  const getFavorites = () => {
    let id = currentUser.id;
    axios
      .get(API_URL_FAVORITES + id)
      .then((res) => {
        let favorites = res.data.favorites;
        setFavs(favorites);
        
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <div className="profileDiv">
        <div className="profileBorder">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <h6>
            <strong>Name:</strong>
            {currentUser.username}
          </h6>
          <h6 className='email'>
            <strong>Email:</strong>
            {currentUser.email}
          </h6>
        </div>
      </div>
      <br></br>
      <div className="cafeText">My Cafes:</div>
      <br></br>
      <Favorites favorites={favs} />
      
    </>
  );
};

export default Profile;
