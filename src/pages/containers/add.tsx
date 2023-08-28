import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { MobileNavHeader } from "../../components/MobileNavHeader";
import { AddContainerForm } from "../../components/AddContainerForm";

export default function addPage() {
  return (
    <div>
      <MobileNavHeader title="Add Container" />
      <div className="p-6">
        <AddContainerForm />
      </div>
    </div>
  );
}
