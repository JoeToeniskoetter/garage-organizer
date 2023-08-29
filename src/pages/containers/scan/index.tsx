"use client";

import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { MobileNavHeader } from "~/components/MobileNavHeader";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useRouter } from "next/router";

const Scan: React.FC = ({}) => {
  // const [containerId, setContainerId] = useState<number>();
  const [error, setError] = useState<string>();
  // const { data } = api.container.byId.useQuery(
  //   { id: containerId },
  //   { enabled: containerId !== undefined }
  // );

  const router = useRouter();
  return (
    <>
      <MobileNavHeader title="Scan" />
      <div>
        <div>
          <QrScanner
            onError={(e) => {
              setError(e.message);
            }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onDecode={async (data) => {
              await router.push({ pathname: data });
            }}
            scanDelay={1000}
            tracker={false}
            onResult={(res) => {
              // setPoint(res.getResultPoints());
              console.log(res);
            }}
            viewFinderBorder={100}
          />
          {/* {containerId && (
            <p
              className="absolute  left-1/2 top-24 text-2xl text-lime-600"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              Container #{containerId}
            </p>
          )} */}
        </div>
        {/* <div className="w-screen p-4"> */}
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span>
              <p>
                <span className="font-bold">Error! </span>
                {error}
                {}
              </p>
            </span>
          </Alert>
        )}
        {/* <p className="text-xl font-bold">Items:</p>
          {data?.items.map((item) => {
            return <ContainerItemRow key={item.id} item={item} />;
          })}
        </div>  */}
      </div>
    </>
  );
};

export default Scan;
