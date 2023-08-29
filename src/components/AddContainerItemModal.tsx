import { useQueryClient } from "@tanstack/react-query";
import { Modal, Button, TextInput, Label, FileInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/solid";
import Resizer from "react-image-file-resizer";

interface AddContainerItemModalProps {
  open: boolean;
  onClose: () => void;
  containerId: number;
}

function getFileExtension(fileName: string) {
  return (
    fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
    fileName
  );
}

export const AddContainerItemModal: React.FC<AddContainerItemModalProps> = ({
  open,
  onClose,
  containerId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    watch,
    formState: { isValid },
  } = useForm<{
    name: string;
    imageData?: File;
    containerId: number;
  }>({ defaultValues: { containerId } });

  const queryClient = useQueryClient();
  const [creating, setCreating] = useState<boolean>(false);
  const { mutateAsync } = api.containerItem.create.useMutation({
    onSettled: async () => {
      await queryClient.invalidateQueries([
        ["container", "byId"],
        { input: { id: containerId }, type: "query" },
      ]);
    },
  });
  const { mutateAsync: getUrl } = api.upload.getPresignedUrl.useMutation();

  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        file.type,
        100,
        0,
        (uri) => {
          resolve(uri as File);
        },
        "file"
      );
    });

  const createItem = async (values: {
    containerId: number;
    imageData?: File;
    name: string;
  }) => {
    let imageUrl = undefined;
    setCreating(true);
    try {
      if (values.imageData) {
        const { url, key } = await getUrl({
          containerId: containerId,
          ext: getFileExtension(values.imageData.name),
        });
        imageUrl = key;

        const resized = await resizeFile(values.imageData);

        await fetch(url, {
          method: "PUT",
          body: resized,
          headers: {
            "Content-type": "image/png",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      await mutateAsync({
        containerId: values.containerId,
        imageData: imageUrl,
        name: values.name,
      });
    } catch (e: unknown) {
      alert("Failed to create item");
      alert(e.message);
    } finally {
      reset({ name: "", imageData: undefined, containerId: containerId });
      onClose();
      setCreating(false);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const imageSrc = watch("imageData");

  return (
    <Modal dismissible show={open} onClose={onClose}>
      <Modal.Header>Add Item to Container #{containerId}</Modal.Header>
      <Modal.Body>
        <Label>Item Name</Label>
        <TextInput className="mb-4" {...register("name", { required: true })} />
        <Controller
          control={control}
          name="imageData"
          render={({ field }) => {
            return (
              <>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      field.onChange(e.target.files[0]);
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }
                  }}
                />
                <div
                  onClick={() => inputRef.current?.click()}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4"
                >
                  <CameraIcon className="h-5 w-5 cursor-pointer text-gray-500" />
                  <div className="block cursor-pointer">
                    <Label
                      htmlFor="file"
                      value="Add Photo"
                      className="cursor-pointer text-gray-500"
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
        {imageSrc && (
          <div className="m-2 flex max-w-fit rounded-xl border-2 p-2">
            <img src={URL.createObjectURL(imageSrc)} width={50} height={50} />
            <strong className="relative inline-flex items-center rounded text-xs font-medium">
              <span className="items absolute -right-4 -top-4 flex h-5 w-5 items-center justify-center rounded-full">
                <TrashIcon
                  className="h-5 w-5 rounded bg-gray-200 text-red-500"
                  onClick={() => resetField("imageData")}
                />
              </span>
            </strong>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          isProcessing={creating}
          disabled={!isValid}
          onClick={handleSubmit(createItem)}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
