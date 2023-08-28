import { Modal, Button, TextInput, Label, FileInput } from "flowbite-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface AddContainerItemModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: any) => Promise<void>;
  containerId: number;
}

export const AddContainerItemModal: React.FC<AddContainerItemModalProps> = ({
  open,
  onClose,
  onCreate,
  containerId,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<{
    name: string;
    imageData: string;
    containerId: number;
  }>({ defaultValues: { containerId } });

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
          disabled={!isValid}
          onClick={handleSubmit(onCreate)}
          className="w-full"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
