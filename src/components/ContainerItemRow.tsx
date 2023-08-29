import { TrashIcon } from "@heroicons/react/24/solid";
import { ContainerItem } from "@prisma/client";
import { Button } from "flowbite-react";
import React from "react";
import Image from "next/image";

interface ContainerItemRowProps {
  item: ContainerItem;
  onDelete?: (id: string) => Promise<void>;
}

export const ContainerItemRow: React.FC<ContainerItemRowProps> = ({
  item,
  onDelete,
}) => {
  return (
    <>
      <div
        className="flex justify-between rounded-xl p-4 shadow-md"
        key={item.id}
      >
        <div className="flex">
          {item.imageData && (
            <Image
              src={item.imageData}
              height={80}
              width={80}
              alt="item"
              // className="rounded-l-xl"
            />
          )}
          <div className="p-4">
            <p className="text-xl">{item.name}</p>
          </div>
        </div>
        {onDelete && (
          <Button
            color="light"
            className="m-0 flex items-center border-0 bg-transparent"
            onClick={() =>
              onDelete
                ? onDelete(item.id)
                : () => {
                    null;
                  }
            }
            outlined
          >
            <TrashIcon className="h-8 w-8 text-red-500" />
          </Button>
        )}
      </div>
    </>
  );
};
