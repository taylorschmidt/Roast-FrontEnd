import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//input params from Home.js
const Result = ({yelpData}) => {
    console.log('From results component', yelpData)
    
    
    //display function here that maps through yelpData state - example below from StarWars
    const display = () => {
        return yelpData.map((data, index)=> {
            return (
                <div key={index} className = "col s12 m6">
                    <div className="card">
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
         {/* Results will render here when search button is clicked. For now - see results from search in Console. */}
         <div className="row">{display()}</div>
         {/* From Star Wars:
         <div className="row">{display()}</div> */}
     </div>
 )
}

export default Result