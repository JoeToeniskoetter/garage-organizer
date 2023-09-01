import { MobileNavHeader } from "../../components/MobileNavHeader";
import { AddContainerForm } from "../../components/AddContainerForm";

export default function AddPage() {
  return (
    <div>
      <MobileNavHeader title="Add Container" />
      <div className="p-6">
        <AddContainerForm />
      </div>
    </div>
  );
}
