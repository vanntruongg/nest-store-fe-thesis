"use client";
import SummaryStatistic from "./summary";
import Revenue from "./revenue";

const StatisticPage = () => {
  return (
    <div className="space-y-4">
      <SummaryStatistic />
      <Revenue />
    </div>
  );
};

export default StatisticPage;
