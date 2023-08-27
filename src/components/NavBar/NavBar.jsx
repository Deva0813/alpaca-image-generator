import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className='navBar' >
            <div className="brandTitle"><a href="/">Alpaca Generator</a></div>
            <div className="link">
                <a href="/about">About</a>
                <a href="https://github.com/Deva0813/alpaca-image-generator" target="_blank" rel="noopener noreferrer">Source Code</a>
            </div>
        </div>
    );
};

export default NavBar;