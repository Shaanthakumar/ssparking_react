import React, { useRef, useEffect, useState } from "react";
import '../resform/resform.css';

function Resform() {
  const plateInputs = useRef([]);
  const otpInputs = useRef([]);
  const verifyButton = useRef(null);
  const otpVerifyButton = useRef(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpReceived, setOtpReceived] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (plateInputs.current[0]) {
      plateInputs.current[0].focus();
    }
  }, []);

  const handleInput = (e, index, isOtp = false) => {
    let value = e.target.value.toUpperCase();

    if (e.key === " " && value === "") {
      e.preventDefault();
      e.target.value = "-";
      if (index < (isOtp ? otpInputs : plateInputs).current.length - 1) {
        (isOtp ? otpInputs : plateInputs).current[index + 1].focus();
      }
      return;
    }

    if (e.key === "Backspace" && value === "") {
      if (index > 0) {
        (isOtp ? otpInputs : plateInputs).current[index - 1].focus();
        (isOtp ? otpInputs : plateInputs).current[index - 1].value = "";
      }
      return;
    }

    e.target.value = value;

    if (value.length === e.target.maxLength) {
      if (index < (isOtp ? otpInputs : plateInputs).current.length - 1) {
        (isOtp ? otpInputs : plateInputs).current[index + 1].focus();
      }
    }

    if (e.key === "Enter") {
      const allFilled = (isOtp ? otpInputs : plateInputs).current.every(input => input.value.length === 1);
      if (allFilled) {
        (isOtp ? otpVerifyButton : verifyButton).current.click();
      }
    }
  };

  const handleAnimationEnd = (e) => {
    e.target.classList.remove('button-click-animation');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isVerifying) return;

    setIsVerifying(true);
    let plateNumber = plateInputs.current.map(input => input.value).join('');

    console.log("Vehicle Plate Number:", plateNumber);

    if (!plateNumber) {
      console.error('Plate number is empty');
      setIsVerifying(false);
      return;
    }

    verifyButton.current.classList.add('button-click-animation');

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
        setOtpReceived(data.otp); // Store the OTP received
        setOtpStatus(''); // Clear any previous OTP status message
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
  
    const enteredOtp = otpInputs.current.map(input => input.value.trim().toUpperCase()).join('');
    
    // Ensure otpReceived is treated as a string
    const receivedOtpStr = String(otpReceived || '').trim().toUpperCase(); // Convert to string and apply trim
    
    console.log('Entered OTP:', enteredOtp);
    console.log('Received OTP:', receivedOtpStr); // Debugging line
  
    otpVerifyButton.current.classList.add('button-click-animation');
  
    // Check if the OTP entered matches the received OTP
    if (enteredOtp === receivedOtpStr) { 
      console.log('OTP verified successfully');
      setOtpStatus('OTP verified successfully!');
    } else {
      console.error('Invalid OTP');
      setOtpStatus('Invalid OTP. Please try again.');
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
            <button ref={verifyButton} type="submit" onAnimationEnd={handleAnimationEnd} disabled={isVerifying}>Verify</button>
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
            <button ref={otpVerifyButton} type="submit" onAnimationEnd={handleAnimationEnd}>Verify OTP</button>
            {otpStatus && <p style={{ color: 'red', textAlign: 'center' }}>{otpStatus}</p>}
          </div>
        </form>
      )}
    </div>
  );
}

export default Resform;