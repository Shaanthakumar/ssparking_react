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
  const [validTime, setValidTime] = useState('');

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

  const handleTimeSubmit = async (e) => {
    e.preventDefault();

    const day = e.target.elements.day.value;
    const location = e.target.elements.location.value;
    const inTime = e.target.elements.inTime.value;

    // Retrieve vehicle plate number
    const plateNumber = plateInputs.current.map(input => input.value).join('');

    // Check if the plate number is valid
    if (!plateNumber) {
        alert('Please enter a valid vehicle plate number.');
        return;
    }

    try {
        // Fetch vehicle details from the RTO table
        const vehicleResponse = await fetch('http://localhost:5000/api/get-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plateNumber }),
        });

        if (!vehicleResponse.ok) {
            const errorData = await vehicleResponse.json();
            console.error('Error fetching vehicle details:', errorData.message);
            return;
        }

        const vehicleData = await vehicleResponse.json();
        const vehicleName = vehicleData.vehicle_name; // Assuming vehicle_name is returned from the server

        // Send reservation request to the server
        const response = await fetch('http://localhost:5000/api/reserve-parking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ day, location, inTime, plateNumber, vehicleName }),
        });

        if (response.ok) {
            const reservationData = await response.json();
            console.log('Reservation successful:', reservationData.message);
            alert(`Reservation Confirmed!\nVehicle: ${vehicleName}\nDate: ${day}\nLocation: ${location}\nIn Time: ${inTime}`);
        } else {
            const errorData = await response.json();
            console.error('Error reserving parking:', errorData.message);
            alert('Error reserving parking. Please try again.');
        }
    } catch (error) {
        console.error('Error sending reservation request:', error);
        alert('Error reserving parking. Please try again.');
    }
};


  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    const [, minutes] = timeValue.split(':');
  
    if (['00', '15', '30', '45'].includes(minutes)) {
      setValidTime(timeValue); 
    } else {
      e.target.value = validTime;
      alert('Please enter minutes as 00, 15, 30, or 45 only.');
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
            <h2>Reservation Details</h2>
            <p>Select Day: {currentDate} (today) or {tomorrowDate} (tomorrow)</p>
            <select id="day" name="day" defaultValue="today">
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
            <label htmlFor="location">Select the location:</label>
            <select id="location" name="location" defaultValue="">
              <option value="" disabled>Select the location</option>
              <option value="Brook fields">Brook fields</option>
              <option value="Fun mall">Fun mall</option>
              <option value="Prozone">Prozone</option>
            </select>
            <label htmlFor="inTime">Select In Time (hh:mm):</label>
            <input
              type="time"
              id="inTime"
              name="inTime"
              required
              onChange={handleTimeChange}
            />
            <button type="submit">Submit Reservation</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Resform;
