import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
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
  month: number | string;
  setMonth: Dispatch<SetStateAction<number | string>>;
}

export function RevenueMonthSelector({ month, setMonth }: Props) {
  const [key, setKey] = useState<number>(+new Date());
  return (
    <Select key={key} onValueChange={(value) => setMonth(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            <div className="flex space-x-1 items-center">Chọn tháng</div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chọn tháng</SelectLabel>
          {/* <SelectItem value=" ">Doanh thu tháng</SelectItem> */}
          <Button
            className="w-full px-2"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setMonth("");
              setKey(+new Date());
            }}
          >
            Bỏ chọn
          </Button>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
              {`Tháng ${i + 1}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
