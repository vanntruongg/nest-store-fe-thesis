"use client";
import React, { useEffect, useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/common/components/icon-text-loading";
import { OrderStatus } from "~/common/components/order-status";
import { Order } from "./order";
import orderApi from "~/apis/order-api";
import { Order as OrderModel } from "~/modules/order/model/Order";

const PurchasePage = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await orderApi.getAllByUser();
        setOrders(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <OrderStatus />
      {/* orders */}

      {loading ? (
        <div className="h-full bg-white flex justify-center items-center">
          <IconTextLoading />
        </div>
      ) : (
        <Order orders={orders} />
      )}
    </div>
  );
};

export default PurchasePage;
