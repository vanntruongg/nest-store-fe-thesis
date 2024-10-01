"use client";

import { useEffect, useState } from "react";
import { OrderGet } from "~/modules/order/model/OrderGet";
import {
  getAllOrder,
  updateStatus,
} from "~/modules/order/services/OrderService";
import { BaseUtil } from "~/common/utility/base.util";
import { Pagination } from "~/modules/admin/components/pagination";
import { OrderStatusSelector } from "./order-status-selector";
import { orderTableColumns } from "./order-table-columns";
import { TableDataAdmin } from "~/modules/admin/components/table";
import { PaymentMethodSelector } from "./payment-method-selector";
import { toast } from "~/components/ui/use-toast";

export default function OrderManagementPage() {
  const [data, setData] = useState<OrderGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllOrder(
          pageNo,
          pageSize,
          orderStatus,
          paymentMethod
        );
        setData(result.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isUpdate, pageNo, pageSize, orderStatus, paymentMethod]);

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      const result = await updateStatus(orderId, status);
      toast({ description: result.message });
      setIsUpdate(!isUpdate);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  const columns = orderTableColumns(handleUpdateOrderStatus);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Đơn hàng</h2>
      </div>
      <div className="flex space-x-4">
        <OrderStatusSelector
          status={orderStatus}
          setOrderStatus={setOrderStatus}
        />
        <PaymentMethodSelector
          method={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
      <TableDataAdmin
        data={data?.orderList || []}
        columns={columns}
        loading={loading}
      />
      {data && (
        <Pagination
          pageNo={pageNo}
          setPageNo={setPageNo}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
        />
      )}
    </div>
  );
}
