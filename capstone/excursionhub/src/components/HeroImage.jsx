import React from "react";

const Hero = ({ user }) => {


    if (!user) {
        return (
            <>
                <div style={{
                    backgroundImage: 'url("images/worldmap.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    
                    display: 'flex',
                    minHeight: '300px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        color: 'black',
                        textAlign: 'center',
                    }}>
                        <h1 className="hero">Welcome to ExcursionHub!</h1>
                        <h2 className="hero">Let us help you plan your next adventure!</h2>
                        <h2 className="hero">If you do not have an account with us, go head and head over to the <a id="register" href="/register"><u>registration</u></a> page and get your profile set up!</h2>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div style={{
                backgroundImage: 'url("images/worldmap.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                height: '300px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    color: 'black',
                    textAlign: 'center',
                }}>
                    <h1 className="hero">Welcome {user.firstName}! Lets build your next excursion!</h1>
                </div>
            </div>
        )
    }

}

export default Hero;