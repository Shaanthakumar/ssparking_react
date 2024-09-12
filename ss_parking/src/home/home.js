import React from "react";
import '../home/home.css';
import { useNavigate } from "react-router-dom"; // Only useNavigate is needed here

const b1 = "RESERVE YOUR SPACE";
const b2 = "CHECK FOR WALK IN SPACE";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className="button-container">
                <button className="center-button" onClick={() => navigate("/res")}>
                    <span className="text"><h2>{b1}</h2></span>
                </button>
                <button className="center-button" onClick={() => navigate("/walk")}>
                    <span className="text"><h2>{b2}</h2></span>
                </button>
            </div>
        </>
    );
}

export default Home;
