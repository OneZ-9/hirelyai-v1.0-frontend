import { Label } from "@/components/ui/label";

function FormFieldLabel({ children, label }) {
  return (
    <div className="flex flex-col gap-y-4">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default FormFieldLabel;
