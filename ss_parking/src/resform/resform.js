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
  const [showTimeForm, setShowTimeForm] = useState(false); 
  const [currentDate, setCurrentDate] = useState(''); 
  const [tomorrowDate, setTomorrowDate] = useState(''); 

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options)); 

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setTomorrowDate(tomorrow.toLocaleDateString(undefined, options)); 
  }, []);

  useEffect(() => {
    if (plateInputs.current[0]) {
      plateInputs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (otpSent && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [otpSent]);

  useEffect(() => {
    if (otpSent) {
      otpInputs.current.forEach(input => {
        if (input) {
          input.value = ''; 
        }
      });
    }
  }, [otpSent]);

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

        setOtpSent(true); 
        setOtpReceived(data.otp); 
        setOtpStatus(''); 
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
    const receivedOtpStr = String(otpReceived || '').trim().toUpperCase(); 

    console.log('Entered OTP:', enteredOtp);
    console.log('Received OTP:', receivedOtpStr); 

    otpVerifyButton.current.classList.add('button-click-animation');

    if (enteredOtp === receivedOtpStr) {
      console.log('OTP verified successfully');
      setOtpStatus('OTP verified successfully!');

      setTimeout(() => {
        setShowTimeForm(true); 
      }, 1000); 
    } else {
      console.error('Invalid OTP');
      setOtpStatus('Invalid OTP. Please try again.');
    }
  };

  const handleTimeSubmit = (e) => {
    e.preventDefault();

    const day = e.target.elements.day.value;
    const location = e.target.elements.location.value;
    const inTime = e.target.elements.inTime.value;

    console.log('Day of Parking:', day);
    console.log('Location:', location);
    console.log('In Time:', inTime);

    // Perform further actions like sending this data to the server
  };

  const [validTime, setValidTime] = useState('');

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    const [, minutes] = timeValue.split(':');
  
    // Check if minutes are one of the allowed values
    if (['00', '15', '30', '45'].includes(minutes)) {
      setValidTime(timeValue); // Save valid time to state
    } else {
      // Revert to the last valid time or clear if invalid
      e.target.value = validTime;
      alert('Please enter minutes as 00, 15, 30, or 45 only.');
    }
  };

// ... (rest of your existing code)

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
    ) : !showTimeForm ? (
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
    ) : (
      <form className="form" onSubmit={handleTimeSubmit}>
        <div className="content">
          <p>ENTER THE DETAILS</p>
          <div className="inp">
            <label htmlFor="day">Day of Parking:</label>
            <select id="day" name="day" defaultValue="">
              <option value="" disabled>Select the date</option> {/* Placeholder option */}
              <option value={currentDate}>{currentDate}</option>
              <option value={tomorrowDate}>{tomorrowDate}</option>
            </select>
            <label htmlFor="location">Location:</label>
            <select id="location" name="location" defaultValue="">
              <option value="" disabled>Select the location</option> {/* Placeholder option */}
              <option value="Brook fields">Brook fields</option>
              <option value="Fun mall">Fun mall</option>
              <option value="Prozone">Prozone</option>
            </select>
            <label htmlFor="inTime">In Time:</label>
            <input id="inTime" name="inTime" type="time" onChange={handleTimeChange} />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )}
  </div>
);
}

export default Resform;