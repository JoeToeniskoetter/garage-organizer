import Link from "next/link";
import Image from "next/image";
import React from "react";

interface ContainerCardProps {
  container: {
    items: {
      id: string;
      name: string;
      imageData: string | null;
      containerId: number;
      deletedAt: Date | null;
    }[];
  } & {
    id: number;
    name: string;
    type: string;
    userId: string;
  };
}

export const ContainerCard: React.FC<ContainerCardProps> = ({ container }) => {
  return (
    <div className="max-w-lg overflow-hidden rounded shadow-lg">
      <Link
        key={container.id}
        href={`/containers/${container.id}`}
        className="max-w-fit"
      >
        <div className="flex items-center gap-4 p-8">
          <div className="flex w-1/2 items-center justify-center">
            <Image
              src={
                container.type.toLowerCase().includes("cardboard")
                  ? "/thd-cardboard-box.jpeg"
                  : "/hdx-container.jpg"
              }
              alt="Sunset in the mountains"
              width={150}
              height={150}
            />
          </div>
          <div className="mb-2 flex w-full flex-col text-xl font-bold">
            {container.name}
            <div>
              <p className="text-sm font-light text-gray-400">
                Type: {container.type}
              </p>
              <p className="text-sm font-light text-gray-400">
                Item Count: {container.items.length}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
