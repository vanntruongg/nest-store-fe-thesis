export type RevenueDataPrediction = {
  actualData: RevenueData[];
  predictedData: RevenueData[];
};

export type RevenueData = {
  month: string;
  revenue: number;
};
