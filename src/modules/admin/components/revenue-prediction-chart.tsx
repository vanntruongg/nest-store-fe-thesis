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
import IconTextLoading from "~/common/components/icon-text-loading";
import { RevenueDataPrediction } from "~/modules/AI/models/RevenueDataPrediction";
import { ProductUtil } from "~/common/utility/product.util";

export interface Props {
  data: RevenueDataPrediction | null;
}

export function RevenuePredictionChart({ data }: Props) {
  const dataAxis = data
    ? [
        ...data.actualData.map((item) => item.month),
        ...data.predictedData.map((item) => item.month),
      ]
    : [];

  const combinedRevenueData = data
    ? [
        ...data.actualData.map((item) => item.revenue),
        ...data.predictedData.map((item) => item.revenue),
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
        name: "💰 Triệu đồng",
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
          data: combinedRevenueData,
          smooth: true,
          label: {
            show: true,
            position: "top",
            color: "#999",
            formatter: (params: any) => {
              return ProductUtil.formatPrice(params.value);
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          start: 0,
          end: 100,
        },
      ],
    };
  }, [dataAxis, combinedRevenueData]);
  console.log(combinedRevenueData);

  return <ReactECcharts option={chartOptions} />;
}
