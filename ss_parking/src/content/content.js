import React from "react";
import '../content/content.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Abtus from "../abtus/abtus";
import Cntus from "../cntus/cntus";
import Navbar from "../navbar/navbar";
import Home from "../home/home";
import Resform from "../resform/resform";
import Walkin from "../walkin/walkin"; // Ensure you are importing Walkin
import Admin from "../admin/admin";

function Content() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Navbar on all routes */}
            <Routes>
                {/* Define all routes */}
                <Route path="/" element={<Home />} />
                <Route path="/abt" element={<Abtus />} />
                <Route path="/cnt" element={<Cntus />} />
                <Route path="/res" element={<Resform />} /> 
                <Route path="/walk" element={<Walkin />} /> 
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Content;
