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
          4. The parking reservation must be confirmed 24 hours in advance.
        </p>
        <p className="term-point">
          5. Cancellations or changes to reservations must be made 12 hours prior to the reserved time.
        </p>
      </div>
    </div>
  );
}

export default Pricing;
