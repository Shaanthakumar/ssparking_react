import React from "react";
import Home from "./home"; // Import the Home component
import Resform from "../resform/resfrom";
import Walkin from "../walkin/walkin";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route

function Homer() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route for Home */}
        <Route path="/res" element={<Resform />} /> {/* Route for the reservation form */}
        <Route path="/walk" element={<Walkin />} /> {/* Route for walk-in space */}
      </Routes>
    </>
  );
}

export default Homer;
