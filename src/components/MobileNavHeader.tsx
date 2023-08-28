import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";

interface MobileNavHeaderProps {
  title: string;
  canGoBack?: boolean;
}

export const MobileNavHeader: React.FC<MobileNavHeaderProps> = ({
  title,
  canGoBack = true,
}) => {
  const { back } = useRouter();
  return (
    <div className="sticky flex w-full items-center gap-4 p-4">
      {canGoBack && (
        <ArrowLeftCircleIcon
          className=" h-10 w-10 text-gray-400"
          onClick={back}
        />
      )}
      <p className="text-2xl font-bold">{title}</p>
    </div>
  );
};
