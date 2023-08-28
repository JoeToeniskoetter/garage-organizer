import Link from "next/link";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { MobileNavHeader } from "../../components/MobileNavHeader";
import { Spinner } from "flowbite-react";

export const list: React.FC = ({}) => {
  const { data, isLoading } = api.container.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="m-4 flex flex-col">
      <MobileNavHeader title="My Containers" canGoBack={false} />
      {data?.length == 0 && (
        <div className="flex h-screen flex-col items-center justify-center">
          <ExclamationTriangleIcon className="h-10 w-10" />
          <p>No Containers found. Add one here</p>
        </div>
      )}
      {data?.map((container) => {
        return (
          <Link key={container.id} href={`/containers/${container.id}`}>
            <div className="max-w-lg overflow-hidden rounded shadow-lg">
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
            </div>
          </Link>
        );
      })}
      <Link href={"/containers/add"}>
        <PlusCircleIcon className="fixed bottom-3 right-5 h-16 w-16 rounded-xl text-blue-500" />
      </Link>
    </div>
  );
};

export default list;
