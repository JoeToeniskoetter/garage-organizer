import { useRouter } from "next/router";
import Image from "next/image";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { api } from "~/utils/api";
import { MobileNavHeader } from "../components/MobileNavHeader";
import { AddContainerItemModal } from "../components/AddContainerItemModal";
import { useQueryClient } from "@tanstack/react-query";

function getExtFromBase64(base64Data: string) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
  );
}

export const Container: React.FC = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    query: { id },
  } = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = api.container.byId.useQuery(
    { id: Number(id) },
    { enabled: id !== undefined }
  );
  const { mutateAsync } = api.containerItem.create.useMutation();
  const { mutateAsync: getUrl } = api.upload.getPresignedUrl.useMutation();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const createItem = async (values: {
    containerId: number;
    imageData: string;
    name: string;
  }) => {
    await mutateAsync({
      containerId: values.containerId,
      imageData: values.imageData ? values.imageData.toString() : undefined,
      name: values.name,
    });
  };
  return (
    <div className="m-4">
      <MobileNavHeader title={data?.name ?? ""} />
      <div className="flex flex-row items-center justify-between p-2">
        <div>
          <QRCode
            size={100}
            style={{ height: "auto" }}
            value={`http://localhost:3000/containers/cllsgpl9t0000m3x2o1h9vpu2`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <button
          onClick={handlePrint}
          className="rounded-xl bg-green-700 p-2 text-white shadow-md"
        >
          Print QR Code
        </button>
      </div>
      <div className="flex justify-between border-b-2 p-4">
        <p className="text-lg font-bold">Items</p>
        <button
          className="rounded-xl p-2 text-blue-600"
          onClick={() => setOpenModal(true)}
        >
          + Add
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {data?.items?.map((item) => {
          return (
            <div className="flex rounded-xl p-4 shadow-md" key={item.id}>
              {item.imageData && (
                <Image
                  src={item.imageData}
                  height={50}
                  width={50}
                  alt="item"
                  className="rounded-l-xl"
                />
              )}
              <div className="p-4">
                <p className="text-xl">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <QRCode
            size={256}
            style={{ height: "auto", width: "100%" }}
            value={`http://localhost:3000/containers/${id?.toString()}`}
            viewBox={`0 0 256 256`}
          />
          <div className="flex items-center p-4">
            <p className="text-6xl font-bold">Container #{data?.id}</p>
          </div>
        </div>
      </div>
      {id && (
        <AddContainerItemModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          onCreate={async (values) => {
            await createItem(values);
            setOpenModal(false);
          }}
          containerId={Number(id)}
        />
      )}
    </div>
  );
};

export default Container;
