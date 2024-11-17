"use client";
import SummaryStatistic from "./summary";
import Revenue from "./revenue";
import { OrderPrediction } from "./order-prediction";
import { RevenuePrediction } from "./revenue-prediction";

const StatisticPage = () => {
  return (
    <div className="space-y-4">
      <SummaryStatistic />
      <Revenue />
      <RevenuePrediction />
      <OrderPrediction />
    </div>
  );
};

export default StatisticPage;
