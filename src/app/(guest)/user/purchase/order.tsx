import Image from "next/image";
import NoData from "../../../../../public/assets/no-data.png";
import { IOrder } from "~/common/model/order.model";
import ItemOrder from "~/components/item-order";
import { ProductUtil } from "~/common/utility/product.util";
import { statusClasses } from "~/static";
import { OrderDetails } from "./order-details";
import { OrderUtil } from "~/common/utility/order.util";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface IOrderProps {
  orders: IOrder[];
}

export function Order({ orders }: IOrderProps) {
  const searchParams = useSearchParams();
  const [filterdOrders, setFilteredOrder] = useState<IOrder[]>([]);

  useEffect(() => {
    const status = searchParams.get("orderStatus") || "ALL";

    const filteredOrderByStatus =
      status === "ALL"
        ? orders
        : orders.filter((order) => order.orderStatus === status);

    setFilteredOrder(filteredOrderByStatus);
  }, [searchParams]);

  return (
    <div className="w-full h-full">
      {filterdOrders.length === 0 ? (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center">
          <Image src={NoData} alt="no data" width={250} height={250} />
          <p className="text-lg">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filterdOrders.map((order) => (
            <div key={order.orderId} className="bg-white">
              <div className="flex justify-between gap-2 py-4 px-6 border-b">
                <div className="">Mã đơn: {order.orderId}</div>
                <div
                  className={`text-sm font-bold px-2 py-1 ${
                    statusClasses[OrderUtil.mapOrderStatus(order.orderStatus)]
                  }`}
                >
                  {OrderUtil.mapOrderStatus(order.orderStatus)}
                </div>
              </div>
              <div className="px-6 divide-y">
                {order.orderDetail.map((itemOrder) => (
                  <ItemOrder key={itemOrder.orderDetailId} item={itemOrder} />
                ))}
              </div>
              <div className="bg-zinc-50 p-6 flex justify-between items-center gap-4 border-t border-dotted">
                <OrderDetails order={order} />

                <div className="flex gap-2">
                  Thành tiền:
                  <p className="text-primary font-semibold">
                    {ProductUtil.formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
