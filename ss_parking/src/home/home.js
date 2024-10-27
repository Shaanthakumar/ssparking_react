import React from "react";
import { useNavigate } from "react-router-dom";
import '../home/home.css';

const b1 = "RESERVE YOUR SPACE";
const b2="CANCEL YOUR SPACE"
function Home() {
    const navigate = useNavigate();
    return (
        <div className="button-container">
            <button className="center-button" onClick={() => navigate("/res")}>
                <span className="text"><h2>{b1}</h2></span>
            </button>
            <button className="center-button" onClick={() => navigate("/cancel")}>
                <span className="text"><h2>{b2}</h2></span>
            </button>
        </div>
    );
}

export default Home;
