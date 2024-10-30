import { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactECcharts = dynamic(() => import("echarts-for-react"), {
  ssr: false, // Disable server-side rendering for this component
});

import { OrderDataPrediction } from "~/modules/AI/models/OrderDataPrediction";

export interface Props {
  data: OrderDataPrediction;
}

export function Chart({ data }: Props) {
  const dataAxis = data
    ? [
        ...data.actualData.map((item) => item.month),
        ...data.predictedData.map((item) => item.month),
      ]
    : [];

  const combinedOrderData = data
    ? [
        ...data.actualData.map((item) => item.orders),
        ...data.predictedData.map((item) => item.orders),
      ]
    : [];

  const chartOptions = useMemo(() => {
    return {
      title: {
        text: "Đơn hàng",
        textStyle: {
          color: "#000",
          fontStyle: "Normal",
          fontSize: 16,
          fontWeight: "bolder",
          fontFamily: "Nunito, sans-serif",
        },
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: "#000",
          boundaryGap: false,
        },
        nameTextStyle: {
          fontFamily: "Nunito, sans-serif",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        type: "value",
        name: "📝 Đơn hàng",
        nameTextStyle: {
          fontFamily: "Nunito, sans-serif",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      visualMap: {
        show: false,
        dimension: 0,
        pieces: [
          {
            gt: 0,
            lte: data ? data.actualData.length - 1 : 0,
            color: "#8104fd",
          },
          { gt: data ? data.actualData.length - 1 : 0, color: "#005f88" },
        ],
      },
      series: [
        {
          type: "line",
          name: "Đơn hàng thực tế",
          data: combinedOrderData,
          smooth: true,
          label: {
            show: true,
            position: "top",
            color: "#999",
          },
        },
      ],
    };
  }, [dataAxis, combinedOrderData]);

  return (
    <div className="bg-gray-100 p-4">
      <ReactECcharts option={chartOptions} />
      <div className="flex justify-center">
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-10 h-0.5 bg-[#8104fd]"></span>
            <p>Đơn hàng thực tế</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-10 h-0.5 bg-[#005f88]"></span>
            <p>Đơn hàng dự kiến</p>
          </div>
        </div>
      </div>
    </div>
  );
}
