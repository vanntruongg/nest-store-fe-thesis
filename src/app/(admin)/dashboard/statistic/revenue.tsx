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

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number | string>("");

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
  }, [year, month, totalOrder]);

  const sumOfOrders = useMemo(() => {
    return totalOrder.reduce((acc, curr) => acc + curr, 0);
  }, [totalOrder]);
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
