import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-barcode-scanner';

function Walkin() {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    // Set a 15-second timeout to show a message if no result is found
    const timer = setTimeout(() => {
      setTimeoutReached(true); // Trigger message display, but don't stop camera
    }, 15000); // 15 seconds

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, []);

  const handleScan = (result) => {
    if (result) {
      setData(result.text); // result.text contains the barcode value
      setTimeoutReached(false); // Clear timeout reached message if scanned successfully
    }
  };

  const handleError = (err) => {
    setError(true);
    console.error(err);
    setCameraError(true);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      {cameraError ? (
        <p>Camera access denied or not available. Please check your browser settings.</p>
      ) : (
        <div>
          <QrReader
            onUpdate={(err, result) => {
              if (result) {
                handleScan(result);
              }
              if (err) {
                handleError(err);
              }
            }}
            style={{ width: '100%' }}
          />
          {timeoutReached && <p>Barcode not found within 15 seconds. Please try again.</p>}
        </div>
      )}
      <p>Scanned Result: {data}</p>
      {error && <p>Error scanning the barcode. Please try again.</p>}
    </div>
  );
}

export default Walkin;
