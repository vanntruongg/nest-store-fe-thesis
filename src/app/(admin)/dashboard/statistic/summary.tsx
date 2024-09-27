import { Loader2 } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LiaClipboardListSolid,
  LiaUserFriendsSolid,
  LiaBoxesSolid,
} from "react-icons/lia";
import CountUp from "react-countup";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { BaseUtil } from "~/common/utility/base.util";
import { OrderUtil } from "~/common/utility/order.util";
import { getUserCount } from "~/modules/user/services/UserService";
import { getProductCount } from "~/modules/product/services/ProductService";
import { getOrderCount } from "~/modules/admin/services/StatisticService";
interface SummaryStatistic {
  users: number;
  products: number;
  orders: { [key: string]: number };
}

const SummaryStatistic = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [summary, setSummary] = useState<SummaryStatistic>({
    users: 0,
    products: 0,
    orders: {},
  });
  console.log("re-render");

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

  const totalOrders = useMemo(() => {
    return Object.values(summary.orders).reduce((acc, curr) => acc + curr, 0);
  }, [summary.orders]);

  const sumaryStatistic = [
    {
      id: 1,
      label: "Tổng số người dùng",
      value: summary.users,
      details: false,
      icon: <LiaUserFriendsSolid size={24} />,
    },
    {
      id: 2,
      label: "Tổng số sản phẩm",
      value: summary.products,
      details: false,
      icon: <LiaBoxesSolid size={24} />,
    },
    {
      id: 3,
      label: "Tổng số đơn hàng",
      value: summary.orders,
      details: true,
      icon: <LiaClipboardListSolid size={24} />,
    },
  ];

  const handleSelectStatus = (status: string) => {
    const params = new URLSearchParams();
    params.set("orderStatus", status);
    router.replace("/dashboard/orders" + "?" + params.toString());
  };
  return (
    <div className="flex justify-between gap-4 font-semibold">
      {sumaryStatistic.map(({ id, label, value, details, icon }) =>
        details ? (
          <div
            key={id}
            className="w-full p-2 flex items-center space-x-2 justify-between bg-white border border-gray-300 shadow-sm rounded-md"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{label}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-lg">
                  Chi tiết
                </DropdownMenuLabel>
                {Object.entries(value).map(([status, value]) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleSelectStatus(status)}
                    className="cursor-pointer"
                  >
                    {OrderUtil.mapOrderStatus(status)}: {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-2xl font-semibold leading-none">
              {isMounted ? (
                <CountUp end={totalOrders} />
              ) : (
                <Loader2
                  strokeWidth={2}
                  className="text-muted-foreground size-5 animate-spin"
                />
              )}
            </span>
          </div>
        ) : (
          <div
            key={id}
            className="w-full p-3 flex flex-col space-y-2 justify-between bg-white border border-gray-300 shadow-sm rounded-md"
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
        )
      )}
      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
        <p className="text-sm">Tổng số người dùng</p>
        <span className="text-3xl font-semibold">
          {isMounted ? (
            <CountUp end={summary.users} />
          ) : (
            <Loader2
              strokeWidth={2}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div> */}

      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
        <p className="text-sm">Tổng số sản phẩm</p>
        <span className="text-3xl font-semibold">
          {isMounted ? (
            <CountUp end={summary.products} />
          ) : (
            <Loader2
              strokeWidth={2}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div> */}
      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Tổng số đơn hàng</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Chi tiết</DropdownMenuLabel>
            {Object.entries(summary.orders).map(([status, value]) => (
              <DropdownMenuItem key={status}>
                {status}: {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-3xl font-semibold">
          {isMounted ? (
            <CountUp end={totalOrders} />
          ) : (
            <Loader2
              strokeWidth={2}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div> */}
    </div>
  );
};
export default memo(SummaryStatistic);
