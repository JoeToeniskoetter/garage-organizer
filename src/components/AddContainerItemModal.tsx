import { useQueryClient } from "@tanstack/react-query";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface AddContainerItemModalProps {
  open: boolean;
  onClose: () => void;
  containerId: number;
}

function getExtFromBase64(base64Data: string) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
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
    control,
    formState: { isValid },
  } = useForm<{
    name: string;
    imageData: string;
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

  const createItem = async (values: {
    containerId: number;
    imageData: string;
    name: string;
  }) => {
    let imageUrl = undefined;
    setCreating(true);
    try {
      if (values.imageData) {
        const { url, key } = await getUrl({
          containerId: containerId,
          ext: getExtFromBase64(values.imageData),
        });
        imageUrl = key;
        await fetch(url, {
          method: "PUT",
          body: Buffer.from(
            values.imageData.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
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
    } finally {
      reset();
      onClose();
      setCreating(false);
    }
  };

  return (
    <Modal dismissible show={open} onClose={onClose}>
      <Modal.Header>Add Item to Container #{containerId}</Modal.Header>
      <Modal.Body>
        <Label>Item Name</Label>
        <TextInput {...register("name", { required: true })} />
        <Controller
          control={control}
          name="imageData"
          render={({ field }) => {
            return (
              <>
                <Label>Item Photo</Label>
                <input
                  accept="image/*"
                  // capture="environment"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        field.onChange(reader.result);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </>
            );
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          isProcessing={creating}
          disabled={!isValid}
          onClick={handleSubmit(createItem)}
          className="w-full"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
