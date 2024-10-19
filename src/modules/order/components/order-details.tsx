import { BaseUtil } from "~/common/utility/base.util";
import {
  displayOrderStatus,
  displayPaymentMethod,
  OrderUtil,
} from "~/common/utility/order.util";
import { ProductUtil } from "~/common/utility/product.util";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { statusClasses } from "~/static";
import { Order } from "~/modules/order/model/Order";

export interface Props {
  order: Order;
}

export function OrderDetail({ order }: Props) {
  const {
    orderId,
    name,
    phone,
    address,
    notes,
    orderStatus,
    totalPrice,
    createdDate,
  } = order;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Chi tiết đơn hàng</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogDescription className="flex gap-4 uppercase">
            <span className="">Mã đơn hàng: {orderId}</span>
            <span className="w-0.5 h-full bg-gray-200"></span>
            <span
              className={cn(
                "px-2 py-1 font-bold text-sm",
                statusClasses[orderStatus]
              )}
            >
              {displayOrderStatus(orderStatus)}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 divide-x">
          <div className="p-4 flex-1 flex flex-col gap-2">
            <span className="text-lg font-medium">Địa chỉ giao hàng</span>
            <span className="font-semibold">{name}</span>
            <div className="flex flex-col gap-1 text-muted-foreground text-sm">
              <span>{BaseUtil.formatPhoneNumber(phone)}</span>
              <span>{address}</span>
              <span>{notes}</span>
            </div>
          </div>
          <div className="p-4 flex-1 text-sm divide-y">
            <div className="p-4 flex justify-between">
              <div className=" text-muted-foreground text-nowrap">
                Tổng tiền hàng
              </div>
              <div className="">{ProductUtil.formatPrice(totalPrice)}</div>
            </div>

            <div className="p-4 flex justify-between">
              <div className=" text-muted-foreground text-nowrap">
                Phí vận chuyển
              </div>
              <div className="">{ProductUtil.formatPrice(0)}</div>
            </div>
            <div className="p-4 flex justify-between">
              <div className=" text-muted-foreground text-nowrap">
                Thành tiền
              </div>
              <div className=" text-primary">
                {ProductUtil.formatPrice(totalPrice)}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full p-4 flex items-center justify-between text-sm divide-x divide-dotted border-t border-dotted shadow-sm">
            <div className="">{OrderUtil.formatDate(createdDate)}</div>
            <div className="px-4 flex items-center space-x-2 text-muted-foreground">
              <span>Phương thức thanh toán:</span>
              <p className="py-1 px-2 border rounded-md">
                {displayPaymentMethod(order.paymentMethod)}
              </p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
