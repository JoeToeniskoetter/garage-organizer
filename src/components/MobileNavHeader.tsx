import { ArrowLeftCircleIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface MobileNavHeaderProps {
  title: string;
  canGoBack?: boolean;
  showScan?: boolean;
}

export const MobileNavHeader: React.FC<MobileNavHeaderProps> = ({
  title,
  canGoBack = true,
  showScan = false,
}) => {
  const { back } = useRouter();
  return (
    <div
      className={`sticky flex w-full min-w-full items-center ${
        showScan ? "justify-between" : "justify-start"
      } gap-4 p-4`}
    >
      {canGoBack && (
        <ArrowLeftCircleIcon
          className=" h-10 w-10 text-gray-400"
          onClick={back}
        />
      )}
      <p className="text-2xl font-bold">{title}</p>
      {showScan && (
        <Link href={"/containers/scan"}>
          <button className="flex items-center justify-center gap-2 self-end rounded-xl border border-blue-600 p-2 text-blue-600">
            <QrCodeIcon className="h-5 w-5" />
            Scan
          </button>
        </Link>
      )}
    </div>
  );
};
