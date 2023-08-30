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
  console.log(item.createdAt);
  return (
    <>
      <div
        className="flex justify-between rounded-xl p-4 shadow-md"
        key={item.id}
      >
        <div className="flex w-full items-center justify-center gap-4">
          {item.imageData && (
            <Image
              src={item.imageData}
              height={80}
              width={80}
              alt="item"
              className="rounded-xl"
            />
          )}
          <div className="w-full">
            <p className="text-xl">{item.name}</p>
            <p className="text-gray-400">
              Added: {item.createdAt.toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
        <div className="justify-center">
          {onDelete && (
            <TrashIcon
              className="h-8 w-8 text-red-500"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() =>
                onDelete
                  ? onDelete(item.id)
                  : () => {
                      null;
                    }
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
