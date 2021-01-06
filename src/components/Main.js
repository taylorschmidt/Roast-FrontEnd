import React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
    return (
<div className="container" className="homeContainer">
        <h1>Roast</h1>
        <br></br>
        <div className="row">
            <div className="col-sm-9">Find the coziest cafes in your area with a simple search.</div>
            <div className="col-sm-3">PHOTO</div>
        </div>
        <div>
            <br></br>
            <br></br>
        <Link to='/home'>
        <button className="btn btn-dark">Get Started</button>
        </Link>
        </div>
</div>
    )


}

export default Main