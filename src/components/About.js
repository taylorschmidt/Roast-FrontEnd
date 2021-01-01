import React from 'react'

// <a href="https://ibb.co/qjJVBzT"><img src="https://i.ibb.co/9gZSnJQ/P8143678.jpg" alt="P8143678" border="0"></a>
{/* <a href="https://ibb.co/gmrbhrg"><img src="https://i.ibb.co/NtFgbFY/FB-IMG-1608238633178.jpg" alt="FB-IMG-1608238633178" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>image upload service</a><br /> */}

const About = () => {
    const team = () => {
        return (
            <div className="col s12 m6">
                <div className="card">
                    <img src="https://i.ibb.co/9gZSnJQ/P8143678.jpg" alt="P8143678" border="0" />
                    <div className="card-body">
                        <h3 className="card-title">Taylor Schmidt</h3>
                        <p className="card-text">Taylor</p>
                    </div>
                </div>
                <div className="card">
                    <img src="https://i.ibb.co/NtFgbFY/FB-IMG-1608238633178.jpg" alt="FB-IMG-1608238633178" border="0" />
                    <div className="card-body">
                        <h3 className="card-title">Elizabeth Chandra</h3>
                        <p className="card-text">Elizabeth comes from a background of health science and working as a medical scribe. She decided that it was time for a career change and knew that she always had an interest in coding, hence the switch to becoming a software engineer.</p>
                    </div>
                </div>
                <div className="card">
                    <img></img>
                    <div className="card-body">
                        <h3 className="card-title">Julianna Fernandes</h3>
                        <p className="card-text">Juliana</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="row">{team()}</div>
        </div>

    )
}

export default About