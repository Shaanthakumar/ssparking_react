import React, { useRef, useEffect } from "react";
import '../resform/resform.css';

function Resform() {
  const inputs = useRef([]);
  const verifyButton = useRef(null); // Reference to the verify button

  // Set focus on the first input when the component mounts
  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus(); // Focus on the first input
    }
  }, []); // The empty dependency array ensures this runs only once after the component mounts

  const handleInput = (e, index) => {
    let value = e.target.value;

    // Automatically convert lowercase to uppercase
    value = value.toUpperCase();
    e.target.value = value;

    // Handle space bar input to insert a hyphen and move to the next input
    if (e.key === " " && value === "") {
      e.preventDefault(); // Prevent space from being inserted as a value
      e.target.value = "-";
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    } 
    // Handle backspace input to move to the previous input
    else if (e.key === "Backspace" && value === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
        inputs.current[index - 1].value = "";
      }
    } 
    // Handle normal character input to move to the next input when max length is reached
    else if (value.length === e.target.maxLength) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Trigger form submit if "Enter" is pressed after all inputs are filled
    if (e.key === "Enter") {
      const allFilled = inputs.current.every(input => input.value.length === 1);
      if (allFilled) {
        verifyButton.current.classList.add("button-click-animation");
        setTimeout(() => {
          verifyButton.current.click(); // Programmatically click the "Verify" button
          verifyButton.current.classList.remove("button-click-animation"); // Remove class after animation
        }, 200); // Wait for the animation to complete (0.2s)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    let plateNumber = "";
    inputs.current.forEach(input => {
      plateNumber += input.value;
    });
    console.log("Vehicle Plate Number:", plateNumber);
    // Add your verification logic here
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
                placeholder=""
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleInput(e, index)} // Listening for key events (space, backspace, enter)
              />
            ))}
          </div>
          <div className="row">
            {Array(4).fill().map((_, index) => (
              <input
                key={index + 6} // Offset the key to ensure uniqueness
                ref={el => inputs.current[index + 6] = el}
                maxLength="1"
                className="input"
                type="text"
                placeholder=""
                onChange={(e) => handleInput(e, index + 6)}
                onKeyDown={(e) => handleInput(e, index + 6)} // Listening for key events (space, backspace, enter)
              />
            ))}
          </div>
        </div>
        <button ref={verifyButton} type="submit">Verify</button> {/* Reference for the verify button */}
      </div>
    </form>
  );
}

export default Resform;
