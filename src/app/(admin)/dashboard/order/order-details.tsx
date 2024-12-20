import { displayPaymentMethod, OrderUtil } from "~/common/utility/order.util";
import { ProductUtil } from "~/common/utility/product.util";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import OrderItem from "~/modules/order/components/order-item";
import { Order } from "~/modules/order/model/Order";

interface Props {
  order: Order;
}

const OrderDetails = ({ order }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-200">
          <span className="sr-only">Open detail</span>
          Xem chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1025px]">
        <DialogHeader>
          <DialogTitle>
            Thông tin chi tiết đơn hàng: {order.orderId}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 space-x-4">
          <div className="col-span-2  flex flex-col justify-between">
            <div className="">
              <h3 className="capitalize text-lg font-bold">
                Địa chỉ nhận hàng
              </h3>
              <div className="mt-4">
                <h3 className="capitalize text-sm font-semibold">
                  {order.name}
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500">(*)</span>
                  Ghi chú:
                  <p>{order.notes}</p>
                </div>
              </div>
            </div>
            <div className="space-x-2">
              <span> Tổng tiền:</span>
              <span className="font-semibold">
                {ProductUtil.formatPrice(order.totalPrice)}
              </span>
            </div>
          </div>
          <div className="col-span-4">
            <h3 className="capitalize text-lg font-bold">Sản phẩm</h3>
            <div className="px-4 max-h-[325px] border divide-y overflow-scroll">
              {order.orderItems.map((orderItem) => (
                <OrderItem key={orderItem.productId} item={orderItem} />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="w-full flex flex-col items-center">
          <div className="w-full p-4 flex items-center justify-between text-sm divide-x divide-dotted border-t border-dotted shadow-sm">
            <div className="">{OrderUtil.formatDate(order.createdDate)}</div>
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
};

export default OrderDetails;
