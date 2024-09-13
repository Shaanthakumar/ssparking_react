import React from "react";
import './abtus.css'; // Ensure CSS file is properly linked
import skImage from './sk.jpeg'; // Correct path relative to the component
function Abtus() {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-border-top"></div>
                <div className="img">
                    <img src={skImage} alt="Shaantakumar" />
                </div>
                <span>SHAANTHAKUMAR U</span>
                <div className="button-container">
                    <a href="https://github.com/Shaanthakumar" target="_blank" rel="noopener noreferrer" className="card-button">GITHUB</a>
                    <a href="https://www.linkedin.com/in/shaantakumar" target="_blank" rel="noopener noreferrer" className="card-button">LINKEDIN</a>
                </div>
            </div>
            <div className="card">
                <div className="card-border-top"></div>
                <div className="img">
                    <img src="https://via.placeholder.com/70x80" alt="Sanvanth" />
                </div>
                <span>SANVANTH J R</span>
                <div className="button-container">
                    <a href="https://github.com/sanvanth" target="_blank" rel="noopener noreferrer" className="card-button">GITHUB</a>
                    <a href="https://www.linkedin.com/in/sanvanth" target="_blank" rel="noopener noreferrer" className="card-button">LINKEDIN</a>
                </div>
            </div>
        </div>
    );
}

export default Abtus;
