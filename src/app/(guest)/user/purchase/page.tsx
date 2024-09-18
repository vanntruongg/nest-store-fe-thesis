"use client";
import React, { useEffect, useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/common/components/icon-text-loading";
import { OrderStatus } from "~/common/components/order-status";
import { Order } from "./order";
import { Order as OrderModel } from "~/modules/order/model/Order";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "~/utils/createQueryString";
import { getAllMyOrder } from "~/modules/order/services/OrderService";

const PurchasePage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const pageSize = 5;

  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const pageNo = searchParams.get("pageNo") || "1";
    const orderStatus = searchParams.get("orderStatus") || "ALL";
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllMyOrder(
          parseInt(pageNo) - 1,
          pageSize,
          orderStatus
        );
        setOrders(result.data.orderList);
        setTotalElements(result.data.totalElements);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setPageNo(parseInt(pageNo) - 1);
  }, [searchParams]);

  const handleChangePage = ({ selected }: any) => {
    router.push(
      pathname + "?" + createQueryString("pageNo", selected + 1, searchParams)
    );
    setPageNo(selected);
  };

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <OrderStatus />
      {/* orders */}

      {loading ? (
        <div className="h-full bg-white flex justify-center items-center">
          <IconTextLoading />
        </div>
      ) : (
        <Order
          orders={orders}
          pageNo={pageNo}
          totalElements={totalElements}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default PurchasePage;
