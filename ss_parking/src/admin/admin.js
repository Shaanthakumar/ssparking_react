import React from "react";
import "../admin/admin.css";
import adminIcon from '../assets/admin.png'

function Admin() {
  return (
    <>
      <div className="login wrap">
      <img 
                    src={adminIcon} 
                    alt="Admin" 
                    className="adminform-icon" 
                />
        <div className="h1">LOGIN AS ADMIN</div>
        <input placeholder="Username" id="username" name="username" type="text" />
        <input placeholder="Password" id="password" name="password" type="password" />
        <input value="LOGIN" className="btn" type="submit" />
      </div>
    </>
  );
}

export default Admin;
