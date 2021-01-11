import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="container homeContainer">
      <div className="row">
        <div className="col-sm-6">
          <h1>Roast</h1>
          <br></br>
          <br></br>
          <div>Find the coziest cafes in your area with a simple search.</div>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/home">
            <button className="btn btn-dark">Get Started</button>
          </Link>
        </div>
        <div className="col-sm-6">
          <img className="coffeeCup"
            src="https://i.imgur.com/wtkKGSU.png"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Main;
