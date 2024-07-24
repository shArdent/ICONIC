import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewRequest } from "@/types/authTypes";
import { ControllerRenderProps } from "react-hook-form";

const GolonganDarahSelect = ({
  field,
}: {
  field: ControllerRenderProps<NewRequest, "golonganDarah">;
}) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue className="border-none shadow bg-[#f0f0f0]" placeholder="Pilih Golongan Darah" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="A">A</SelectItem>
        <SelectItem value="B">B</SelectItem>
        <SelectItem value="AB">AB</SelectItem>
        <SelectItem value="O">O</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default GolonganDarahSelect;
