import React from 'react'
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <div className="header" >
            <img src={logo} alt="SpaceX Launches" style={{ width: 300, display: "block", margin: "auto" }} />
        </div>
    )
}

export default Header
