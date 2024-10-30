"use client";

import { orderPredict } from "~/modules/AI/services/OrderPredictionService";
import { Chart } from "./chart";
import { useEffect, useState } from "react";
import { OrderDataPrediction } from "~/modules/AI/models/OrderDataPrediction";

export function AIPredictOrder() {
  const [data, setData] = useState<OrderDataPrediction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await orderPredict();
      setData(res.data);
    };
    fetchData();
  }, []);

  return data && <Chart data={data} />;
}
