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
    {/* // const display = () => { */}
    //     return starwarsData.map((data, index)=>{
    //         return (
    //             <div key={index} className = "col s12 m6">
    //               <div className="card blue-grey darken-1">
    //                 <div className="card-content white-text">
    //                   <span className="card-title">{data.name}</span>
    //                 </div>
    //                 <div className="card-action">
    //                 <Link to={{
    //                 pathname: `/starship/${index}`,
    //                 state: {data}
    //             }} 
    //             key={data.name}
    //             >
    //             More Information
    //             </Link> 
    //                 </div>
    //               </div>
    //             </div>
    //         )
    //     })
    // }

    //bootstrap syntax for card
// <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src="..." alt="Card image cap">
//     <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
// </div>


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