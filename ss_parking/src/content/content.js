import React from "react";
import '../content/content.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Abtus from "../abtus/abtus";
import Cntus from "../cntus/cntus";
import Navbar from "../navbar/navbar";
import Home from "../home/home";
import Resform from "../resform/resform";
import Walkin from "../walkin/walkin"; // Ensure you are importing Walkin

function Content() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Navbar on all routes */}
            <Routes>
                {/* Define all routes */}
                <Route path="/" element={<Home />} />
                <Route path="/abt" element={<Abtus />} />
                <Route path="/cnt" element={<Cntus />} />
                <Route path="/res" element={<Resform />} /> {/* Resform route here */}
                <Route path="/walk" element={<Walkin />} /> {/* Walkin route here */}
            </Routes>
        </BrowserRouter>
    );
}

export default Content;
