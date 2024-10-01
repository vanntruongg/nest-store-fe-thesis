import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { paymentMethodList } from "~/common/utility/order.util";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export interface Props {
  method: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export function PaymentMethodSelector({ method, setPaymentMethod }: Props) {
  const [key, setKey] = useState<number>(+new Date());
  return (
    <Select key={key} onValueChange={setPaymentMethod}>
      <SelectTrigger className="w-[200px] flex justify-center">
        <SelectValue
          placeholder={
            <div className="flex space-x-1 items-center">
              Phương thức thanh toán
              <ChevronDown size={20} />
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {paymentMethodList.map(({ method, displayName }) => (
          <SelectItem
            value={method}
            className="flex justify-center cursor-pointer"
          >
            {displayName}
          </SelectItem>
        ))}
        <Button
          className="w-full px-2"
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setPaymentMethod("");
            setKey(+new Date());
          }}
        >
          Bỏ chọn
        </Button>
      </SelectContent>
    </Select>
  );
}
