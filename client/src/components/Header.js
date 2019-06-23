import React from 'react'
import logo from '../assets/images/logo.png';

const Header = () => {
    const { wrapper, image } = styles;
    return (
        <div style={wrapper} className="header" >
            <img src={logo} alt="SpaceX Launches" style={image} />
        </div>
    )
}

const styles = {
    image: { width: 300, display: "block", margin: "auto" },
    wrapper: {
        paddingTop: 10,
    }
}
export default Header
