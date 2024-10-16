import React from "react";
import '../resform/resform.css';

function Resform() {

  
  return (
  
<form className="form">
  <div className="content">
    <p>ENTER YOUR VEHICLE'S PLATE NUMBER</p>
    <div className="inp">
      <div className="row">
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <div style={{ width: '1em' }} /> {/* Correct usage of inline style */}
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <div style={{ width: '1em' }} /> {/* Correct usage of inline style */}
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
      </div>
      <div className="row">
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
        <input maxLength="1" className="input" type="text" placeholder=""/>
      </div>
    </div>
    <button>Verify</button>
  </div>
</form>

  );
}

export default Resform;
