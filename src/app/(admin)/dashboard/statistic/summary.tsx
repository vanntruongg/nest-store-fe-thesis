import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LiaClipboardListSolid,
  LiaUserFriendsSolid,
  LiaBoxesSolid,
} from "react-icons/lia";
import CountUp from "react-countup";

import { BaseUtil } from "~/common/utility/base.util";
import { getUserCount } from "~/modules/user/services/UserService";
import { getProductCount } from "~/modules/product/services/ProductService";
import { getOrderCount } from "~/modules/admin/services/StatisticService";
interface SummaryStatistic {
  users: number;
  products: number;
  orders: number;
  // orders: { [key: string]: number };
}

const SummaryStatistic = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [summary, setSummary] = useState<SummaryStatistic>({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, products, orders] = await Promise.all([
          getUserCount(),
          getProductCount(),
          getOrderCount(),
        ]);

        setSummary({
          users: users.data,
          products: products.data,
          orders: orders.data,
        });
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
    setIsMounted(true);
  }, []);

  const sumaryStatistic = [
    {
      id: 1,
      label: "Tổng số người dùng",
      value: summary.users,
      icon: <LiaUserFriendsSolid size={24} />,
    },
    {
      id: 2,
      label: "Tổng số sản phẩm",
      value: summary.products,
      icon: <LiaBoxesSolid size={24} />,
    },
    {
      id: 3,
      label: "Tổng số đơn hàng",
      value: summary.orders,
      icon: <LiaClipboardListSolid size={24} />,
    },
  ];

  return (
    <div className="flex justify-between gap-4 font-semibold">
      {sumaryStatistic.map(({ id, label, value, icon }) => (
        <div
          key={id}
          className="w-full p-3 flex flex-col space-y-2 justify-between bg-white border border-gray-300 shadow-md rounded-md"
        >
          <p className="text-base">{label}</p>
          <div className="flex items-center justify-between">
            {icon}
            <span className="text-2xl font-semibold leading-none">
              {isMounted ? (
                <CountUp end={value as number} />
              ) : (
                <Loader2
                  strokeWidth={2}
                  className="text-muted-foreground size-5 animate-spin"
                />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SummaryStatistic);
