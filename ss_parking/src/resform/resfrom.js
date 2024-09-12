import React from "react";
import '../resform/resform.css'

function Resform() {
  return (
    <div className="form-container">
      <form className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pno">Mobile number:</label>
          <input
            type="number"
            id="pno"
            name="pno"
            required
            pattern="[0-9]{10}"
          />
        </div>
        <div className="form-group">
          <label htmlFor="vno">Vehicle number:</label>
          <input
            type="text"
            id="vno"
            name="vno"
            required
            pattern="[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}"
          />
        </div>
        <button className="form-submit-btn" type="submit">
          BOOK THE SPACE FOR MY MACHINE
        </button>
      </form>
    </div>
  );
}

export default Resform;
