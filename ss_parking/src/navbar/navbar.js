import React from "react";
import { useNavigate } from "react-router-dom";
import '../navbar/navbar.css';

const title = "SSParking";
const home = "HOME";
const abt = "ABOUT US";
const cnt = "CONTACT US";

function Navbar() {
    const navigate = useNavigate(); // For navigation

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="S:/CIT/Sem - 5/Fullstack/ssparking/src/navbar/logo.png" alt="Logo" className="logo" />
                <div className="tooltip-container">
                    <span className="tooltip">Uiverse.io</span>
                    <span className="text">{title}</span>
                    <span>Welcome! 👋</span>
                </div>
            </div>
            <div className="navbar-right">
                <button className="nav-button" onClick={() => navigate("/")}>
                    <span>{home}</span>
                </button>
                <button className="nav-button" onClick={() => navigate("/abt")}>
                    <span>{abt}</span>
                </button>
                <button className="nav-button" onClick={() => navigate("/cnt")}>
                    <span>{cnt}</span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
