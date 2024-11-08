import { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactECcharts = dynamic(() => import("echarts-for-react"), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => (
    <div className="min-h-80 flex justify-center items-center">
      <IconTextLoading />
    </div>
  ),
});
import { OrderDataPrediction } from "~/modules/AI/models/OrderDataPrediction";
import IconTextLoading from "~/common/components/icon-text-loading";

export interface Props {
  data: OrderDataPrediction | null;
}

export function OrderPredictionChart({ data }: Props) {
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
        text: "",
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
          { gt: data ? data.actualData.length - 1 : 0, color: "#00aaff" },
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
  }, [dataAxis, combinedOrderData]);

  return <ReactECcharts option={chartOptions} />;
}
