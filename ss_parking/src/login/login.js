import React, { useState } from "react";
import '../login/login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    confirmPassword: '',
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form data: ", formData);
  };

  return (
    <div className="container">
      <input type="checkbox" id="signup_toggle" />
      <form onSubmit={handleSubmit} className="form">
        <div className="form_front">
          <div className="form_details">Login</div>
          <input
            placeholder="Username"
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required
            type={showPassword ? "text" : "password"}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary passbutton"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          <button className="btn" type="submit">Login</button>
          <span className="switch">
            Don't have an account? 
            <label className="signup_tog" htmlFor="signup_toggle">
              Sign Up
            </label>
          </span>
        </div>

        {/* Sign Up Form */}
        <div className="form_back">
          <div className="form_details">SignUp</div>
          <input
            placeholder="Firstname"
            className="input"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Username"
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required
            type={showPassword ? "text" : "password"}
          />
          <input
            placeholder="Confirm Password"
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            type={showPassword ? "text" : "password"}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary passbutton"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          <input type="submit" className="btn" value="SIGN UP" />
          <span className="switch">
            Already have an account? 
            <label className="signup_tog" htmlFor="signup_toggle">
              Sign In
            </label>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
