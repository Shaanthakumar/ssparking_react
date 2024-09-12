import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home"; // Import the Home component
import Resform from "../resform/resfrom";
import Walkin from "../walkin/walkin";
function Homer() {
  return (
    <Router>
        <Home></Home>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route for Home */}
        <Route path="/res" element={<Resform />} /> {/* Route for the reservation form */}
        <Route path="/walk" element={<Walkin />} /> {/* Route for walk-in space */}
      </Routes>
    </Router>
  );
}

export default Homer;
