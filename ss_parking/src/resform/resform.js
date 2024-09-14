import React from "react";
import '../resform/resform.css';

function Resform() {

  
  return (
  
<form class="form">
  <div class="content">
    <p align="center">🏍️ENTER YOUR VEHICLE'S PLATE NUMBER🚗</p>
    <div class="inp">
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/> 
    <input maxlength="1" class="input" type="text" placeholder=""/> 
    <input maxlength="1" class="input" type="text" placeholder=""/> 
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/>
    <input maxlength="1" class="input" type="text" placeholder=""/>
    
    </div>
    <button>Verify</button>
  </div>
  
</form>
  );
}

export default Resform;
