import Image from "next/image";
import NoData from "../../public/assets/no-data.png";
import { IOrder } from "~/common/model/order.model";
import ItemOrder from "~/components/item-order";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { BaseUtil } from "~/common/utility/base.util";
import { statusClasses } from "~/static";
import { OrderUtil } from "~/common/utility/order.util";
export interface IPurchaseProps {
  orders: IOrder[];
}

export function Purchase({ orders }: IPurchaseProps) {
  return (
    <div className="w-full h-full">
      {orders.length === 0 ? (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center">
          <Image src={NoData} alt="no data" width={250} height={250} />
          <p className="text-lg">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(
            ({
              orderId,
              address,
              notes,
              orderDetail,
              orderStatus,
              totalPrice,
              paymentMethod,
              createdDate,
            }) => (
              <div key={orderId} className="bg-white">
                <div className="flex justify-between gap-2 py-4 px-6 border-b">
                  <div className="">Mã đơn: {orderId}</div>
                  <div
                    className={`text-sm font-bold px-2 py-1 ${
                      statusClasses[BaseUtil.mapOrderStatus(orderStatus)]
                    }`}
                  >
                    {BaseUtil.mapOrderStatus(orderStatus)}
                  </div>
                </div>
                <div className="px-6 divide-y">
                  {orderDetail.map((itemOrder) => (
                    <ItemOrder key={itemOrder.orderDetailId} item={itemOrder} />
                  ))}
                </div>
                <div className="bg-zinc-50 p-6 flex justify-between items-center gap-4 border-t border-dotted">
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
                          <span className="text-primary ">{orderStatus}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-4 divide-x">
                        <div className="p-4 flex-1 flex flex-col gap-2">
                          <p className="text-lg font-medium">
                            Địa chỉ giao hàng
                          </p>
                          <p className="font-semibold">{address.name}</p>
                          <div className="flex flex-col gap-1 text-muted-foreground text-xs">
                            <p>{BaseUtil.formatPhoneNumber(address.phone)}</p>
                            <p>{`${address.street}, ${address.ward}, ${address.district}, ${address.province}`}</p>
                            <p>{notes}</p>
                          </div>
                        </div>
                        <div className="p-4 flex-1 text-sm divide-y">
                          <div className="p-4 flex justify-between">
                            <div className="px-4 text-muted-foreground text-nowrap">
                              Tổng tiền hàng
                            </div>
                            <div className="px-4">
                              {ProductUtil.formatPrice(totalPrice)}
                            </div>
                          </div>

                          <div className="p-4 flex justify-between">
                            <div className="px-4 text-muted-foreground text-nowrap">
                              Phí vận chuyển
                            </div>
                            <div className="px-4">
                              {ProductUtil.formatPrice(0)}
                            </div>
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
                        <div className="w-full p-4 flex justify-between text-sm divide-x divide-dotted border-t border-dotted shadow-sm">
                          <div className="">
                            {OrderUtil.formatDate(createdDate)}
                          </div>
                          <div className="px-4 flex text-muted-foreground">
                            <span>Phương thức thanh toán:</span>
                            <p className="px-4">{paymentMethod}</p>
                          </div>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="flex gap-2">
                    Thành tiền:
                    <p className="text-primary font-semibold">
                      {ProductUtil.formatPrice(totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
