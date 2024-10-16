import React, { useState } from 'react';
import QrReader from 'react-qr-barcode-scanner';

function Walkin() {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setData(result.text); // result.text contains the barcode value
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
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result);
            }

            if (!!error) {
              handleError(error);
            }
          }}
          style={{ width: '100%' }}
        />
      )}
      <p>Scanned Result: {data}</p>
      {error && <p>Error scanning the barcode. Please try again.</p>}
    </div>
  );
}

export default Walkin;
