import Link from "next/link";
import React, { useRef, useState } from "react";
import { api } from "~/utils/api";
import { PlusCircleIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { HiSearch } from "react-icons/hi";
import {
  ExclamationTriangleIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { MobileNavHeader } from "../../components/MobileNavHeader";
import { Button, Spinner, TextInput } from "flowbite-react";
import { ContainerCard } from "~/components/ContainerCard";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

export const List: React.FC = ({}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading } = api.container.getAll.useQuery();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    '@media print': {
        display: 'block'
    },
    `,
  });

  if (isLoading) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="m-4 flex flex-col">
        <MobileNavHeader
          title="My Containers"
          canGoBack={false}
          trailingAction={
            <>
              <Link href={"/containers/scan"}>
                <button className="flex items-center justify-center gap-2 self-end rounded-xl border border-blue-600 p-2 text-blue-600">
                  <QrCodeIcon className="h-5 w-5" />
                  Scan
                </button>
              </Link>
              <Button color="light" onClick={handlePrint}>
                <PrinterIcon className="h-5 w-5" />
                Print All
              </Button>
            </>
          }
        />
        <TextInput
          value={searchTerm}
          className="flex w-full min-w-full"
          icon={HiSearch}
          placeholder="Search for an item"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="m-4">
        {data?.length == 0 && (
          <div className="flex h-screen flex-col items-center justify-center">
            <ExclamationTriangleIcon className="h-10 w-10" />
            <p>No Containers found. Add one here</p>
          </div>
        )}
        {data
          ?.filter((c) => {
            const term = searchTerm.trim().toLowerCase();
            if (term !== "") {
              return c.items.some((i) => i.name.toLowerCase().includes(term));
            }
            return c;
          })
          .map((container) => {
            return <ContainerCard key={container.id} container={container} />;
          })}
        <Link href={"/containers/add"}>
          <PlusCircleIcon className="fixed bottom-3 right-5 h-16 w-16 rounded-xl text-orange-500" />
        </Link>
      </div>
      <div style={{ display: "none" }}>
        <div
          ref={componentRef}
          className="flex flex-row flex-wrap items-center justify-evenly"
        >
          {data?.map((container) => {
            return (
              <div key={container.id} className="flex flex-col">
                <QRCode
                  size={256}
                  style={{ height: "300px", width: "100%", paddingTop: "20px" }}
                  value={`${
                    window.location.origin
                  }/containers/${container.id?.toString()}`}
                  viewBox={`0 0 256 256`}
                />
                <div className="flex items-center justify-center p-4">
                  <p className="text-3xl font-bold">
                    Container #{container?.number}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default List;
