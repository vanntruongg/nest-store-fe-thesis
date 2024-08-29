import { useState } from "react";
import orderAddressApi from "~/apis/order-address";
import { IOrder, OrderDeliveryAddress } from "~/common/model/order.model";
import { BaseUtil } from "~/common/utility/base.util";
import { OrderUtil } from "~/common/utility/order.util";
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

export interface IOrderDetailsProps {
  order: IOrder;
}

export function OrderDetails({ order }: IOrderDetailsProps) {
  const { orderId, addressId, notes, orderStatus, totalPrice, createdDate } =
    order;
  const [deliveryAddress, setDeliveryAddress] =
    useState<OrderDeliveryAddress | null>(null);

  const fetchData = async () => {
    try {
      const result = await orderAddressApi.getOrderDeliveryAddressById(
        addressId
      );
      setDeliveryAddress(result.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={fetchData}>
          Chi tiết đơn hàng
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogDescription className="flex gap-4 uppercase">
            <span className="">Mã đơn hàng: {orderId}</span>
            <span className="w-0.5 h-full bg-gray-200"></span>
            <span className="text-primary ">{orderStatus}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 divide-x">
          <div className="p-4 flex-1 flex flex-col gap-2">
            <span className="text-lg font-medium">Địa chỉ giao hàng</span>
            <span className="font-semibold">{deliveryAddress?.name}</span>
            <div className="flex flex-col gap-1 text-muted-foreground text-xs">
              <span>{BaseUtil.formatPhoneNumber(deliveryAddress?.phone)}</span>
              <span>
                {`${deliveryAddress?.street}, ${deliveryAddress?.ward}, ${deliveryAddress?.district}, ${deliveryAddress?.province}`}
              </span>
              <span>{notes}</span>
            </div>
          </div>
          <div className="p-4 flex-1 text-sm divide-y">
            <div className="p-4 flex justify-between">
              <div className="px-4 text-muted-foreground text-nowrap">
                Tổng tiền hàng
              </div>
              <div className="px-4">{ProductUtil.formatPrice(totalPrice)}</div>
            </div>

            <div className="p-4 flex justify-between">
              <div className="px-4 text-muted-foreground text-nowrap">
                Phí vận chuyển
              </div>
              <div className="px-4">{ProductUtil.formatPrice(0)}</div>
            </div>
            <div className="p-4 flex justify-between">
              <div className="px-4 text-muted-foreground text-nowrap">
                Thành tiền
              </div>
              <div className="px-4 text-primary">
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
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
