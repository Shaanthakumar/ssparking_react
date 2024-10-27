import React from "react";
import { useNavigate } from "react-router-dom";
import '../navbar/navbar.css';
import logo from '../assets/logo2.jpeg'; // Correct path relative to the component
import adminIcon from '../assets/admin.png'; // Add admin icon image

const title = "SSParking";
const home = "HOME";
const abt = "ABOUT US";
const cnt = "CONTACT US";
const price="PRICING";

function Navbar() {
    const navigate = useNavigate(); // For navigation

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
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
                <button className="nav-button" onClick={() => navigate("/price")}>
                    <span>{price}</span>
                </button>

                <button className="nav-button" onClick={() => navigate("/abt")}>
                    <span>{abt}</span>
                </button>
                <button className="nav-button" onClick={() => navigate("/cnt")}>
                    <span>{cnt}</span>
                </button>
                <img 
                    src={adminIcon} 
                    alt="Admin" 
                    className="admin-icon" 
                    onClick={() => navigate("/admin")} 
                />
            </div>
        </nav>
    );
}

export default Navbar;
