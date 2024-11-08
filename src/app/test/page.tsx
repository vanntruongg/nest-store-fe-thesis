"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { orderPredict } from "~/modules/AI/services/OrderPredictionService";
import { OrderDataPrediction } from "~/modules/AI/models/OrderDataPrediction";

const ReactECcharts = dynamic(() => import("echarts-for-react"), {
  ssr: false, // Disable server-side rendering for this component
});
// const dataAxis = [
//   "Tháng 1",
//   "Tháng 2",
//   "Tháng 3",
//   "Tháng 4",
//   "Tháng 5",
//   "Tháng 6",
//   "Tháng 7",
//   "Tháng 8",
//   "Tháng 9",
//   "Tháng 10",
//   "Tháng 11",
//   "Tháng 12",
// ];
// const realOrder = [
//   { value: 9, lineStyle: { color: "#8104fd" } },
//   { value: 10, lineStyle: { color: "#8104fd" } },
//   { value: 8, lineStyle: { color: "#8104fd" } },
//   { value: 12, lineStyle: { color: "#8104fd" } },
//   { value: 5, lineStyle: { color: "#8104fd" } },
//   { value: 1, lineStyle: { color: "#8104fd" } },
//   { value: 3, lineStyle: { color: "#8104fd" } },
//   { value: 24, lineStyle: { color: "#8104fd" } },
//   { value: 10, lineStyle: { color: "#8104fd" } },
//   { value: 19, lineStyle: { color: "#8104fd" } },
//   { value: 22, lineStyle: { color: "red" } },
//   { value: 21, lineStyle: { color: "red" } },
// ];

// const realOrder = [
//   { value: 9 },
//   { value: 10 },
//   { value: 8 },
//   { value: 12 },
//   { value: 5 },
//   { value: 1 },
//   { value: 3 },
//   { value: 24 },
//   { value: 10 },
//   { value: 19 },
// ];

// const predictedOrder = [{ value: 22 }, { value: 21 }];

// const combinedOrder = [...realOrder, ...predictedOrder];

// const realOrder2 = [
//   { value: 9 },
//   { value: 10 },
//   { value: 8 },
//   { value: 12 },
//   { value: 5 },
//   { value: 1 },
//   { value: 3 },
//   { value: 24 },
//   { value: 10 },
//   { value: 19 },
//   { value: 22 },
// ];
// const data = {
//   actualData: [
//     {
//       month: "01-2024",
//       orders: 9,
//     },
//     {
//       month: "02-2024",
//       orders: 10,
//     },
//     {
//       month: "03-2024",
//       orders: 8,
//     },
//     {
//       month: "04-2024",
//       orders: 12,
//     },
//     {
//       month: "05-2024",
//       orders: 5,
//     },
//     {
//       month: "06-2024",
//       orders: 1,
//     },
//     {
//       month: "07-2024",
//       orders: 3,
//     },
//     {
//       month: "08-2024",
//       orders: 24,
//     },
//     {
//       month: "09-2024",
//       orders: 10,
//     },
//   ],
//   predictedData: [
//     {
//       month: "10-2024",
//       orders: 9,
//     },
//   ],
// };

// const dataAxis2 = [
//   ...data.actualData.map((item) => item.month),
//   ...data.predictedData.map((item) => item.month),
// ];

// const combinedOrder2 = [
//   ...data.actualData.map((item) => item.orders),
//   ...data.predictedData.map((item) => item.orders),
// ];

// const predictedOrder2 = [{ value: 20 }];

// const combinedOrder2 = [...realOrder2, ...predictedOrder2];

// const predOrder = [12, 15, 22, 21, 24, 42, 28, 31, 29, 40, 34, 37];
const TestComponent = () => {
  const [data, setData] = useState<OrderDataPrediction | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await orderPredict();
      setData(res.data);
    };
    fetchData();
  }, []);

  const dataAxis = data
    ? [
        ...data.actualData.map((item) => item.month),
        ...data.predictedData.map((item) => item.month),
      ]
    : [];

  const combinedOrder = data
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
          data: combinedOrder,
          smooth: true,
          label: {
            show: true,
            position: "top",
            color: "#999",
          },
        },
      ],
      // dataZoom: [
      //   {
      //     type: "slider",
      //     start: 0,
      //     end: 100,
      //   },
      //   {
      //     type: "inside",
      //     start: 0,
      //     end: 100,
      //   },
      // ],
    };
  }, [dataAxis, combinedOrder]);

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
};

export default TestComponent;
