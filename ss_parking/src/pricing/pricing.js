import React from 'react';
import '../pricing/pricing.css';

function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="contact-panel">
        <h2>TERMS AND CONDITIONS</h2>
        <p className="term-point">
          1. The minimum alloted time is 1 hour.
        </p>
        <p className="term-point">
          2. Regardless of the time you have parked in the lot within the first one hour, bill is calculated considering the entire 1 hour. 
        </p>
        <p className="term-point">
          3. FIRST 1 hour - Rs.100 THEN For every MINUTE after the FIRST hour - Rs.1
        </p>
        <p className="term-point">
          4. The parking reservation day can either be the same day or the next day and not more than that.
        </p>
        <p className="term-point">
          5. Cancellations or changes to reservations must be made 12 hours prior to the reserved time.
        </p>
        <p  className="term-point">6. If the vehicle is not found in the building after 10 minutes from the reserved time, the reservation gets cancelled.</p>
        
      </div>
    </div>
  );
}

export default Pricing;
