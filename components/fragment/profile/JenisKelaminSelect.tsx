import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JenisKelaminSelect = ({ field }: { field: any }) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue
            className="border-none shadow bg-[#f0f0f0]"
            placeholder="Pilih Jenis Kelamin"
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
        <SelectItem value="Perempuan">Perempuan</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default JenisKelaminSelect;
