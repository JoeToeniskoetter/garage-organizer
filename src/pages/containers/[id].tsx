import { PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";

import type { Container } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { ContainerItemRow } from "~/components/ContainerItemRow";
import { api } from "~/utils/api";
import { AddContainerItemModal } from "../../components/AddContainerItemModal";
import { MobileNavHeader } from "../../components/MobileNavHeader";

export const ContainerById: React.FC = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [containerToDelete, setContainerToDelete] = useState<Container>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const { data, isLoading } = api.container.byId.useQuery(
    { id: Number(id) },
    { enabled: id !== undefined }
  );
  const { mutateAsync } = api.containerItem.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        ["container", "byId"],
        { input: { id: Number(id) }, type: "query" },
      ]);
    },
  });
  const { mutateAsync: deleteContainer } = api.container.delete.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const deleteItem = async (id: string) => {
    await mutateAsync({ id: id });
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="m-4">
      <MobileNavHeader
        title={data?.name ?? ""}
        trailingAction={
          <Button
            color="red"
            className="flex items-center"
            onClick={() => setContainerToDelete(data as Container)}
          >
            <TrashIcon className="h-5 w-5 text-red-400" />
            <p className="font-bold text-red-400">Delete</p>
          </Button>
        }
      />
      <div className="flex items-center justify-center p-2">
        <div className="flex flex-col gap-2">
          <QRCode
            size={150}
            value={`${window.location.origin}/containers/${id?.toString()}`}
          />
          <button
            onClick={handlePrint}
            className="flex gap-2 rounded-xl bg-green-700 p-2 text-white shadow-md"
          >
            <PrinterIcon className="h-5 w-5" /> Print QR Code
          </button>
        </div>
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
            <ContainerItemRow key={item.id} item={item} onDelete={deleteItem} />
          );
        })}
      </div>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <QRCode
            size={256}
            style={{ height: "auto", width: "100%" }}
            value={`${window.location.origin}/containers/${id?.toString()}`}
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
          containerId={Number(id)}
        />
      )}
      <Modal
        show={containerToDelete !== undefined}
        onClose={() => setContainerToDelete(undefined)}
      >
        <Modal.Header>
          <p>Delete {containerToDelete?.name}?</p>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this contianer?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="light" onClick={() => setContainerToDelete(undefined)}>
            Close
          </Button>
          <Button
            color="red"
            onClick={async () => {
              if (containerToDelete) {
                await deleteContainer({ id: containerToDelete.id });
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContainerById;
