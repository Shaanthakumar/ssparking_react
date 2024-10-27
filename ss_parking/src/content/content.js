import React from "react";
import '../content/content.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Abtus from "../abtus/abtus";
import Cntus from "../cntus/cntus";
import Navbar from "../navbar/navbar";
import Home from "../home/home";
import Resform from "../resform/resform";
import Admin from "../admin/admin";
import Pricing from "../pricing/pricing";
import CancelRes from "../cancelres/cancelres";
function Content() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Navbar on all routes */}
            <Routes>
                {/* Define all routes */}
                <Route path="/" element={<Home />} />
                <Route path="/price" element={<Pricing/>}/>
                <Route path="/abt" element={<Abtus />} />
                <Route path="/cnt" element={<Cntus />} />
                <Route path="/res" element={<Resform />} /> 
                <Route path="/admin" element={<Admin />} />
                <Route path="/cancel" elemnt={<CancelRes/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Content;
