import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { orderStatusList } from "~/common/utility/order.util";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export interface Props {
  status: string;
  setOrderStatus: Dispatch<SetStateAction<string>>;
}

export function OrderStatusSelector({ status, setOrderStatus }: Props) {
  const [key, setKey] = useState<number>(+new Date());

  return (
    <Select key={key} onValueChange={setOrderStatus}>
      <SelectTrigger className="w-[200px] flex justify-center">
        <SelectValue
          placeholder={
            <div className="flex space-x-1 items-center">
              Trạng thái đơn hàng
              <ChevronDown size={20} />
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {orderStatusList.map(({ status, displayName }) => (
          <SelectItem value={status} className="flex justify-center">
            {displayName}
          </SelectItem>
        ))}
        <Button
          className="w-full px-2"
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setOrderStatus("");
            setKey(+new Date());
          }}
        >
          Bỏ chọn
        </Button>
      </SelectContent>
    </Select>
  );
}
