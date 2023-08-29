import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

const Scan: React.FC = ({}) => {
  // const [result, setResult] = useState<{}}>();
  // function handleScan(data) {
  //   console.log(data);
  // }
  // function handleError(err) {
  //   console.error(err);
  // }
  return (
    <div>
      {/* <QrScanner onError={handleError} onDecode={handleScan} /> */}
      <p>Scan</p>
    </div>
  );
};

export default Scan;
