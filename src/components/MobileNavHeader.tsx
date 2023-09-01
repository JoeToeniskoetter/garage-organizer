import { ArrowLeftCircleIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface MobileNavHeaderProps {
  title: string;
  canGoBack?: boolean;
  trailingAction?: React.ReactNode;
}

export const MobileNavHeader: React.FC<MobileNavHeaderProps> = ({
  title,
  canGoBack = true,
  trailingAction,
}) => {
  const { back } = useRouter();
  return (
    <div
      className={`sticky flex w-full min-w-full items-center ${
        trailingAction ? "justify-between" : "justify-start"
      } gap-4 p-4`}
    >
      <div className="flex items-center">
        {canGoBack && (
          <ArrowLeftCircleIcon
            className=" h-10 w-10 text-gray-400"
            onClick={back}
          />
        )}
        {!canGoBack && (
          <Image
            src={"/warehouse.png"}
            height={40}
            width={40}
            className="p-2"
            alt="logo"
          />
        )}
        <p className="text-2xl font-bold">{title}</p>
      </div>

      {trailingAction && (
        <div className="flex items-center justify-center gap-2 self-end p-2 ">
          {trailingAction}
        </div>
      )}
    </div>
  );
};
