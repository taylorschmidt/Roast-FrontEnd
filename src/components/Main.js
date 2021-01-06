import React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
    return (
<div className="container">
        Roast
        <div className="row">
            <div className="col-sm-9">Find the coziest cafes in your area with a simple search.</div>
            <div className="col-sm-3">PHOTO</div>
        </div>
        <div>
        <Link to='/home'>Get Started</Link>
        <button>Get Started</button>
        </div>
</div>
    )


}

export default Main