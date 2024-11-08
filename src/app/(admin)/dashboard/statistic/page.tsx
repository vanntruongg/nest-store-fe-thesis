"use client";
import SummaryStatistic from "./summary";
import Revenue from "./revenue";
import { OrderPrediction } from "./order-prediction";

const StatisticPage = () => {
  return (
    <div className="space-y-4">
      <SummaryStatistic />
      <Revenue />
      <OrderPrediction />
    </div>
  );
};

export default StatisticPage;
