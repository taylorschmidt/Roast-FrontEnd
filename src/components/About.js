import React from 'react'

// <a href="https://ibb.co/qjJVBzT"><img src="https://i.ibb.co/9gZSnJQ/P8143678.jpg" alt="P8143678" border="0"></a>
{/* <a href="https://ibb.co/gmrbhrg"><img src="https://i.ibb.co/NtFgbFY/FB-IMG-1608238633178.jpg" alt="FB-IMG-1608238633178" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>image upload service</a><br /> */}

const About = () => {
    const team = () => {
        return (
            <div className="col s12 m6">
                <div className="card">
                {/* <div className="card-person"> */}
                    <img className="profile-img-card" src="https://i.ibb.co/9gZSnJQ/P8143678.jpg" alt="P8143678" border="0" />
                    <div className="card-body">
                        <h3 className="card-title">Taylor Schmidt</h3>
                        <p className="card-text">Taylor has worked as a high school STEM educator for the last seven years and is excited to make the move to software engineering. She enjoys hiking, skiing, and of course... coffee!</p>
                    </div>
                </div>
                <div className="card">
                {/* <div className="card-person"> */}
                    <img className="profile-img-card" src="https://i.ibb.co/NtFgbFY/FB-IMG-1608238633178.jpg" alt="FB-IMG-1608238633178" border="0" />
                    <div className="card-body">
                        <h3 className="card-title">Elizabeth Chandra</h3>
                        <p className="card-text">Elizabeth comes from a background of health science and working as a medical scribe. She decided that it was time for a career change hence the switch to becoming a software engineer. She drinks tea and coffee as beverage of choice!</p>
                    </div>
                </div>
                <div className="card">
                {/* <div className="card-person"> */}
                    <img 
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <div className="card-body">
                        <h3 className="card-title">Julianna Fernandes</h3>
                        <p className="card-text">Juliana is currently taking a gap year before entering college and wanted to learn more about coding and becoming a software engineer. She enjoys drinking tea as a way to relax!</p>
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