"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Order = dynamic(() => import("~/app/(guest)/user/purchase/order"), {
  ssr: false,
});

import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/common/components/icon-text-loading";

import { getAllMyOrder } from "~/modules/order/services/OrderService";
import { OrderGet } from "~/modules/order/model/OrderGet";

import { OrderStatusSelector } from "~/app/(admin)/dashboard/order/order-status-selector";

const PurchasePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderGet | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const pageSize = 5;

  const [orderStatus, setOrderStatus] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllMyOrder(pageNo, pageSize, orderStatus);
        setOrders(result.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setPageNo(pageNo);
  }, [orderStatus, pageNo, pageSize]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNo]);

  const handleChangePage = ({ selected }: any) => {
    setPageNo(selected);
  };

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <OrderStatusSelector
        status={orderStatus}
        setOrderStatus={setOrderStatus}
      />
      {loading ? (
        <div className="h-full bg-white flex justify-center items-center">
          <IconTextLoading />
        </div>
      ) : (
        orders && (
          <Order
            orders={orders.orderList || []}
            pageNo={pageNo}
            totalElements={orders.totalElements}
            totalPages={orders.totalPages}
            handleChangePage={handleChangePage}
          />
        )
      )}
    </div>
  );
};

export default PurchasePage;
