export type OrderDataPrediction = {
  actualData: OrderData[];
  predictedData: OrderData[];
};

export type OrderData = {
  month: string;
  orders: number;
};
