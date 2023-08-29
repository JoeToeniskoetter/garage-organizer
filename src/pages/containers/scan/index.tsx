import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

interface ScanProps {}

const Scan: React.FC<ScanProps> = ({}) => {
  const [result, setResult] = useState<any>();
  function handleScan(data) {
    console.log(data);
  }
  function handleError(err) {
    console.error(err);
  }
  return (
    <div>
      <QrScanner onError={handleError} onDecode={handleScan} />
      <p>{result}</p>
    </div>
  );
};

export default Scan;
