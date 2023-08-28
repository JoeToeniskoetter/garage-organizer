import React from "react";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export const AddContainerForm: React.FC = ({}) => {
  const router = useRouter();
  const { mutateAsync: createContainer, isLoading } =
    api.container.create.useMutation({
      onSuccess: () => {
        router.back();
      },
    });
  const { register, handleSubmit } = useForm<{ name: string; type: string }>();

  const onSubmit = async (values: { type: string; name: string }) => {
    await createContainer(values);
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Container Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Please enter some information so we can find your container later
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Container name
          </label>
          <div className="mt-2">
            <input
              {...register("name")}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Container Type
          </label>
          <div className="mt-2">
            <select
              {...register("type")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>HDX 19 Gal</option>
              <option>Cardboard Box</option>
            </select>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        isProcessing={isLoading}
        className="my-4 w-full"
      >
        Add Container
      </Button>
    </div>
  );
};
