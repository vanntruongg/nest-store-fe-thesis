import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { orderStatusList } from "~/common/utility/order.util";
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/components/ui/use-toast";
import { updateStatus } from "~/modules/order/services/OrderService";

export interface IUpdateStatusProps {
  orderStatus: string;
  orderId: number;
  updateOrderStatus: (orderId: number, status: string) => void;
}

export function UpdateStatus({
  updateOrderStatus,
  orderId,
  orderStatus,
}: IUpdateStatusProps) {
  const handleUpdateStatus = async (orderId: number, status: string) => {
    updateOrderStatus(orderId, status);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Cập nhật trạng thái đơn đơn hàng</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {orderStatusList
          .filter(({ status }) => status != orderStatus)
          .map(({ status, displayName }) => (
            <DropdownMenuItem key={status} className="p-0">
              <Button
                variant={"ghost"}
                onClick={() => handleUpdateStatus(orderId, status)}
              >
                {displayName}
              </Button>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
