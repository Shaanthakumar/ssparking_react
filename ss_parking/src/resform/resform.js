import React, { useRef, useEffect } from "react";
import '../resform/resform.css';

function Resform() {
  const inputs = useRef([]);
  const verifyButton = useRef(null); // Reference to the verify button

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus(); // Focus on the first input
    }
  }, []); 

  const handleInput = (e, index) => {
    let value = e.target.value.toUpperCase(); // Convert to uppercase

    // Prevents space bar input if the field is empty
    if (e.key === " " && value === "") {
      e.preventDefault();
      e.target.value = "-";
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
      return;
    }

    // Backspace logic
    if (e.key === "Backspace" && value === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
        inputs.current[index - 1].value = ""; // Clear previous input
      }
      return;
    }

    // Normal input
    e.target.value = value; // Set the uppercase value

    // Move focus if the max length is reached
    if (value.length === e.target.maxLength) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Handle Enter key for form submission
    if (e.key === "Enter") {
      const allFilled = inputs.current.every(input => input.value.length === 1);
      if (allFilled) {
        verifyButton.current.click(); // Trigger click event on the button
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    let plateNumber = inputs.current.map(input => input.value).join(''); // Join input values

    console.log("Vehicle Plate Number:", plateNumber);

    if (!plateNumber) {
      console.error('Plate number is empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/verify-plate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plateNumber }), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP sent to email:', data.message);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="content">
        <p>ENTER YOUR VEHICLE'S PLATE NUMBER</p>
        <div className="inp">
          <div className="row">
            {Array(6).fill().map((_, index) => (
              <input
                key={index}
                ref={el => inputs.current[index] = el}
                maxLength="1"
                className="input"
                type="text"
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleInput(e, index)} 
              />
            ))}
          </div>
          <div className="row">
            {Array(4).fill().map((_, index) => (
              <input
                key={index + 6} 
                ref={el => inputs.current[index + 6] = el}
                maxLength="1"
                className="input"
                type="text"
                onChange={(e) => handleInput(e, index + 6)}
                onKeyDown={(e) => handleInput(e, index + 6)} 
              />
            ))}
          </div>
        </div>
        <button ref={verifyButton} type="submit">Verify</button> 
      </div>
    </form>
  );
}

export default Resform;
