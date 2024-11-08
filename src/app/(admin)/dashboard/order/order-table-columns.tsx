import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Order } from "~/modules/order/model/Order";
import { ProductUtil } from "~/common/utility/product.util";
import { Button } from "~/components/ui/button";
import { statusClasses } from "~/static";
import { UpdateStatus } from "./update-status";
import {
  displayOrderStatus,
  displayPaymentMethod,
} from "~/common/utility/order.util";
import OrderDetails from "./order-details";

export function orderTableColumns(
  updateOrderStatus: (orderId: number, status: string) => void
): ColumnDef<Order>[] {
  const customFilterFn = (row: Row<Order>, id: string, filterValue: string) => {
    if (filterValue === "") return true;
    return parseInt(row.getValue(id)) === parseInt(filterValue);
  };
  return [
    {
      accessorKey: "orderId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center w-full p-0 capitalize"
          >
            Mã
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("orderId")}</div>
      ),
      filterFn: customFilterFn,
    },
    {
      id: "customer",
      enableHiding: true,
      header: () => <div className="text-center">Khách hàng</div>,
      cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
    },
    {
      accessorKey: "orderStatus",
      header: () => {
        return (
          <Button variant="ghost" className="p-0 w-full capitalize">
            Trạng thái đơn hàng
          </Button>
        );
      },
      cell: ({ row }) => {
        const status: string = row.getValue("orderStatus");

        return (
          <div
            className={`w-3/4 mx-auto py-1 font-semibold text-xs text-center rounded-full ${statusClasses[status]} `}
          >
            {displayOrderStatus(status)}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => {
        return (
          <Button variant="ghost" className="p-0 w-full capitalize">
            Phương thức thanh toán
          </Button>
        );
      },
      cell: ({ row }) => {
        const method: string = row.getValue("paymentMethod");
        return (
          <div className="text-center">{displayPaymentMethod(method)}</div>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="p-0 w-full capitalize">
            Tổng tiền
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="capitalize text-center">
            {ProductUtil.formatPrice(row.getValue("totalPrice"))}
          </div>
        );
      },
    },
    {
      accessorKey: "orderDetail",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="p-0 capitalize">
            Chi tiết đơn hàng
          </Button>
        );
      },
      cell: ({ row }) => {
        return <OrderDetails order={row.original} />;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <UpdateStatus
            updateOrderStatus={updateOrderStatus}
            orderStatus={row.original.orderStatus}
            orderId={row.original.orderId}
          />
        );
      },
    },
  ];
}
