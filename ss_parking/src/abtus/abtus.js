import React from "react";
import './abtus.css'; // Ensure CSS file is properly linked
import skImage from './sk.jpeg'; // Correct path relative to the component
import jrImage from '../assets/sanvanth.jpeg';

function Abtus() {
    return (
        <div className="card-container">
            <div className="cards-row">
                {/* First card */}
                <div className="card">
                    <div className="card-border-top"></div>
                    <div className="img">
                        <img src={skImage} alt="Shaantakumar" />
                    </div>
                    <span>SHAANTHAKUMAR U</span>
                    <div className="button-container">
                        <a href="https://github.com/Shaanthakumar" target="_blank" rel="noopener noreferrer" className="card-button">GITHUB</a>
                        <a href="https://www.linkedin.com/in/shaanthakumaru/" target="_blank" rel="noopener noreferrer" className="card-button">LINKEDIN</a>
                    </div>
                </div>

                {/* Second card */}
                <div className="card">
                    <div className="card-border-top"></div>
                    <div className="img">
                        <img src={jrImage} alt="Sanvanth" />
                    </div>
                    <span>SANVANTH J R</span>
                    <div className="button-container">
                        <a href="https://github.com/sanvanth" target="_blank" rel="noopener noreferrer" className="card-button">GITHUB</a>
                        <a href="https://www.linkedin.com/in/sanvanth-ramakrishnan-092058254/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="card-button">LINKEDIN</a>
                    </div>
                </div>
            </div>
            
            <div className="card_read">
                <h2>The SSParking project, a collaborative effort by Shaanthakumar U and Sanvanth J R (MSc Software Systems, Coimbatore Institute of Technology, batch 2022-2027), was successfully completed between July and September 2024. Leveraging the powerful frameworks of Angular and Django, the project benefited significantly from the mentorship of Dr. A. Saravanan, Dr. Umarani, and Dr. T.N. Sugumar. The developers extend their heartfelt appreciation to these esteemed faculty members for their invaluable guidance and support, which played a pivotal role in the project's successful completion.</h2>
            </div>
        </div>
    );
}

export default Abtus;
