import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export interface Props {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}

export function RevenueYearSelector({ year, setYear }: Props) {
  return (
    <Select onValueChange={(value) => setYear(parseInt(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={year} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chọn năm</SelectLabel>
          <SelectItem value={(new Date().getFullYear() - 2).toString()}>
            {new Date().getFullYear() - 2}
          </SelectItem>
          <SelectItem value={(new Date().getFullYear() - 1).toString()}>
            {new Date().getFullYear() - 1}
          </SelectItem>
          <SelectItem value={new Date().getFullYear().toString()}>
            {new Date().getFullYear()}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
