import React from 'react';
import './PrivatePage.css';

const PrivatePage = () => {
    return (
        <div className="private-page">
            <div className="overlay"></div>
            <div className="black-bar"></div>
            <div className="logo">
                <img src="assets/images/logo.png" alt="FakeFlix" className="logo-image" />
            </div>

            <div className="container">
                <h1>Access Denied</h1>
                <p>
                    This page has been created for educational purposes and only for private use by its creators.
                    Due to copyright laws, it is illegal to publicly share movies or series.
                </p>
                <div className="buttons">
                    <a href="index.html">Go Back</a>
                    <a href="login.html">I have an Account</a>
                </div>
            </div>
        </div>
    );
};

export default PrivatePage;
