import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductUtil } from "~/common/utility/product.util";
import LineChart from "~/common/components/charts/line-chart";

import { getOrderRevenue } from "~/modules/admin/services/StatisticService";
import { RevenueYearSelector } from "./revenue-year-selector";
import { RevenueMonthSelector } from "./revenue-month-selector";

const Revenue = () => {
  const [periodTime, setPeriodTime] = useState<number[]>([]);
  const [totalOrder, setTotalOrder] = useState<number[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number | string>("");

  // const year =
  //   searchParams.get("revenueByYear") ?? new Date().getFullYear().toString();
  // const month = searchParams.get("revenueByMonth") ?? "";
  useEffect(() => {
    const fetchData = async () => {
      const result = await getOrderRevenue(year, month);
      const periodTimes = result.data.map((item: any) => item.periodValue);
      const totalOrders = result.data.map((item: any) => item.totalOrder);
      const totalRevenues = result.data.map((item: any) => item.totalRevenue);
      setPeriodTime(periodTimes);
      setTotalOrder(totalOrders);
      setTotalRevenue(totalRevenues);
    };
    fetchData();
  }, [year, month]);

  const handleChangeYear = (year: string) => {
    const month = searchParams.get("revenueByMonth") || "";
    // handleSetQueryString(year, month);
  };
  const handleChangeMonth = (month: string) => {
    const year =
      searchParams.get("revenueByYear") || new Date().getFullYear().toString();
    // handleSetQueryString(year, month);
  };

  // const handleSetQueryString = (year: string, month: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("revenueByYear", year);
  //   params.set("revenueByMonth", month !== " " ? month : "");
  //   router.push(pathname + "?" + params.toString());
  // };

  const sumOfOrders = useMemo(() => {
    return totalOrder.reduce((acc, curr) => acc + curr, 0);
  }, [totalRevenue]);
  const sumOfRevenues = useMemo(() => {
    return totalRevenue.reduce((acc, curr) => acc + curr, 0);
  }, [totalRevenue]);

  return (
    <div className="p-4 space-y-2 w-full bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-bold text-xl">Thống kê đơn hàng & doang thu</h3>

        <div className="flex space-x-4">
          <RevenueYearSelector year={year} setYear={setYear} />
          <RevenueMonthSelector month={month} setMonth={setMonth} />
        </div>
      </div>

      {/* totalOrders & totalRevenue */}
      <div className="flex space-x-8">
        <div className="flex space-x-2 items-center text-[#8104fd] font-semibold">
          <span className="size-2 bg-[#8104fd] rounded-full"></span>
          <p> {`Tổng ${sumOfOrders} đơn hàng`}</p>
        </div>
        <div className="flex space-x-2 items-center text-[#005f88] font-semibold">
          <span className="size-2 bg-[#005f88] rounded-full"></span>
          <p>{`Tổng doanh thu ${ProductUtil.formatPrice(sumOfRevenues)}`}</p>
        </div>
      </div>

      <LineChart
        title=""
        // title={`Tổng doanh thu ${ProductUtil.formatPrice(sumOfRevenues)}`}
        dataAxis={periodTime}
        totalOrder={totalOrder}
        totalRevenue={totalRevenue}
        // optionCustom={optionsCustom}
      />
    </div>
  );
};

export default Revenue;
