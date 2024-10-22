import React, { useRef, useEffect, useState } from "react";
import '../resform/resform.css';

function Resform() {
  const plateInputs = useRef([]);  // References for plate number inputs
  const otpInputs = useRef([]);  // References for OTP inputs
  const verifyButton = useRef(null);  // Reference to the verify button
  const otpVerifyButton = useRef(null);  // Reference to the OTP verify button
  const [otpSent, setOtpSent] = useState(false); // State to check if OTP is sent
  const [otpReceived, setOtpReceived] = useState(''); // Store received OTP

  useEffect(() => {
    if (plateInputs.current[0]) {
      plateInputs.current[0].focus(); // Focus on the first input for plate number
    }
  }, []);

  const handleInput = (e, index, isOtp = false) => {
    let value = e.target.value.toUpperCase(); // Convert to uppercase

    // Prevent space bar input if the field is empty
    if (e.key === " " && value === "") {
      e.preventDefault();
      e.target.value = "-";
      if (index < (isOtp ? otpInputs : plateInputs).current.length - 1) {
        (isOtp ? otpInputs : plateInputs).current[index + 1].focus();
      }
      return;
    }

    // Backspace logic
    if (e.key === "Backspace" && value === "") {
      if (index > 0) {
        (isOtp ? otpInputs : plateInputs).current[index - 1].focus();
        (isOtp ? otpInputs : plateInputs).current[index - 1].value = ""; // Clear previous input
      }
      return;
    }

    e.target.value = value; // Set the uppercase value

    // Move focus if the max length is reached
    if (value.length === e.target.maxLength) {
      if (index < (isOtp ? otpInputs : plateInputs).current.length - 1) {
        (isOtp ? otpInputs : plateInputs).current[index + 1].focus();
      }
    }

    // Handle Enter key for form submission
    if (e.key === "Enter") {
      const allFilled = (isOtp ? otpInputs : plateInputs).current.every(input => input.value.length === 1);
      if (allFilled) {
        (isOtp ? otpVerifyButton : verifyButton).current.click(); // Trigger click event on the appropriate button
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    let plateNumber = plateInputs.current.map(input => input.value).join(''); // Join input values

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

        // Clear the OTP inputs before showing the OTP form
        otpInputs.current.forEach(input => {
          if (input) {
            input.value = '';  // Clear each input value
          }
        });

        setOtpSent(true); // Show OTP input fields
        setOtpReceived(data.otp); // Store the OTP received (for demo purposes)
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
};


  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otpInputs.current.map(input => input.value).join(''); // Join OTP input values
    console.log('Entered OTP:', enteredOtp);

    if (enteredOtp === otpReceived) {
      console.log('OTP verified successfully');
      // Proceed with further actions (e.g., grant access)
    } else {
      console.error('Invalid OTP');
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="content">
            <p>ENTER YOUR VEHICLE'S PLATE NUMBER</p>
            <div className="inp">
              <div className="row">
                {Array(6).fill().map((_, index) => (
                  <input
                    key={index}
                    ref={el => plateInputs.current[index] = el}
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
                    ref={el => plateInputs.current[index + 6] = el}
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
      ) : (
        <form className="form" onSubmit={handleOtpSubmit}>
          <div className="content">
            <p>ENTER THE OTP SENT TO YOUR EMAIL</p>
            <div className="inp">
              <div className="row">
                {Array(6).fill().map((_, index) => (
                  <input
                    key={index}
                    ref={el => otpInputs.current[index] = el}
                    maxLength="1"
                    className="input"
                    type="text"
                    onChange={(e) => handleInput(e, index, true)}
                    onKeyDown={(e) => handleInput(e, index, true)}
                  />
                ))}
              </div>
            </div>
            <button ref={otpVerifyButton} type="submit">Verify OTP</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Resform;
