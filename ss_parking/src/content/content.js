import React from "react";
import '../content/content.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Abtus from "../abtus/abtus"; // About Us page component
import Cntus from "../cntus/cntus"; // Contact Us page component
import Navbar from "../navbar/navbar"; // Navbar component
import Home from "../home/home";

function Content() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Render Navbar so it is displayed on all routes */}
            <Routes>
                {/* Define all routes */}
                <Route path="/" element={<Home />} /> {/* Home component */}
                <Route path="/abt" element={<Abtus />} /> {/* About Us component */}
                <Route path="/cnt" element={<Cntus />} /> {/* Contact Us component */}
            </Routes>
        </BrowserRouter>
    );
}

export default Content;
