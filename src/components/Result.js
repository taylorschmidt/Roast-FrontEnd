import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//input params from Home.js
const Result = ({yelpData}) => {
    //display function maps through yelpData state to display information in card
    const display = () => {
        return yelpData.map((data, index)=> {
            return (
                <div key={index} className = "col s12 m6">
                    <div className="card">
                    {/* <div className="card.shop"> */}
                        <img className="card-img-top" src={data.image_url} alt="cafe picture"/>
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">{data.location.address1}</p>
                    </div>
                    <Link to={{
                        pathname: `/cafe/${index}`,
                        state: {data}
                    }}
                    key={data.name}
                    >
                        More Information
                    </Link> 
                </div>
                </div>
            )
        })
    }

 return(
     <div>
         <div className="row">{display()}</div>
     </div>
 )
}

export default Result