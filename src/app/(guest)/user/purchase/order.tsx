import { memo, useState } from "react";
import Image from "next/image";

import NoData from "../../../../../public/assets/no-data.png";
import { statusClasses } from "~/static";
import { ProductUtil } from "~/common/utility/product.util";
import { displayOrderStatus } from "~/common/utility/order.util";
import { OrderDetail } from "../../../../modules/order/components/order-details";
import { Order as OrderModel } from "~/modules/order/model/Order";
import OrderItem from "~/modules/order/components/order-item";
import { Pagination } from "~/modules/common/components/pagination";
import { OrderStatus } from "~/modules/order/model/OrderStatus";
import { ItemRatingSelector } from "./item-rating-selector";

export interface Props {
  orders: OrderModel[];
  pageNo: number;
  totalElements: number;
  totalPages: number;
  handleChangePage: (selected: any) => void;
}

function Order({ orders, pageNo, totalPages, handleChangePage }: Props) {
  const [openItemRatingSelector, setOpenItemRatingSelector] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleItemRatingSelector = (orderId: number) => {
    // Mở selector của orderId hiện tại, và đóng tất cả selector khác
    setOpenItemRatingSelector((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="w-full h-full">
      {orders.length === 0 ? (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center">
          <Image src={NoData} alt="no data" width={250} height={250} />
          <p className="text-lg">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white">
              <div className="flex justify-between gap-2 py-4 px-6 border-b">
                <div className="">Mã đơn: {order.orderId}</div>
                <div
                  className={`text-sm font-bold px-2 py-1 ${
                    statusClasses[order.orderStatus]
                  }`}
                >
                  {displayOrderStatus(order.orderStatus)}
                </div>
              </div>
              <div className="px-6 divide-y">
                {order.orderItems.map((itemOrder) => (
                  <OrderItem key={itemOrder.orderDetailId} item={itemOrder} />
                ))}
              </div>

              <div className="bg-zinc-50 p-6 flex justify-between items-center gap-4 border-t border-dotted">
                <div className="flex space-x-4">
                  <OrderDetail order={order} />
                  {order.orderStatus === OrderStatus.COMPLETED && (
                    <ItemRatingSelector
                      open={openItemRatingSelector[order.orderId]}
                      setOpen={() => toggleItemRatingSelector(order.orderId)}
                      oderItems={order.orderItems}
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  Thành tiền:
                  <p className="text-primary font-semibold">
                    {ProductUtil.formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white">
            <Pagination
              pageNo={pageNo}
              totalPages={totalPages}
              className="pagination-center"
              handleChangePage={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Order);
