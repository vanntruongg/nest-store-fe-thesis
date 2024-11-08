"use client";
import dynamic from "next/dynamic";
// import * as echarts from "echarts";
import { memo, useEffect, useMemo, useState } from "react";
import IconTextLoading from "../../../common/components/icon-text-loading";
const ReactECcharts = dynamic(() => import("echarts-for-react"), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => (
    <div className="min-h-80 flex justify-center items-center">
      <IconTextLoading />
    </div>
  ),
});
interface LineChartProps {
  title: string;
  subTitle?: string;
  dataSubText?: string | number;
  dataAxis: number[] | string[];
  totalOrder: number[];
  totalRevenue: number[];
  optionCustom?: any;
}
const OrderRevenueChart = ({
  title,
  dataAxis,
  totalOrder,
  totalRevenue,
  optionCustom,
}: LineChartProps) => {
  const scaledTotalRevenue = useMemo(
    () => totalRevenue.map((revenue) => revenue / 1_000_000),
    [totalRevenue]
  );

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const lineChartOptions = useMemo(() => {
    return {
      title: {
        text: title,
        textStyle: {
          color: "#000",
          fontStyle: "Normal",
          fontSize: 16,
          fontWeight: "bolder",
          fontFamily: "Nunito, sans-serif",
        },
      },
      legend: {
        data: ["Đơn hàng", "Doanh thu"],
        bottom: 0,
        textStyle: {
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
        name: dataAxis.length > 12 ? "Ngày" : "Tháng",
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
      yAxis: [
        {
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
        {
          type: "value",
          name: "💰 Doanh thu (Triệu VND)",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
          position: "right", // Trục Y cho revenue nằm bên phải
        },
      ],
      series: [
        {
          type: "line",
          smooth: true, // boolean | number
          name: "Đơn hàng",
          showBackground: true,
          areaStyle: {
            opacity: 0.1,
            color: "#8104fd",
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: "#b394fc" },
            //   { offset: 0.7, color: "#8104fd" },
            //   { offset: 1, color: "#8104fd" },
            // ]),
          },
          itemStyle: {
            opacity: 1,
            color: "#8104fd",
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: "#8104fd" },
            //   { offset: 0.7, color: "#8104fd" },
            //   { offset: 1, color: "#b394fc" },
            // ]),
          },
          // emphasis: {
          //   itemStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "#8104fd" },
          //       { offset: 0.7, color: "#8104fd" },
          //       { offset: 1, color: "#b394fc" },
          //     ]),
          //   },
          // },
          data: totalOrder,
        },
        {
          type: "line",
          smooth: true,
          name: "Doanh thu",
          showBackground: true,
          areaStyle: {
            opacity: 0.1,
            color: "#00aaff",
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: "#a0e6ff" },
            //   { offset: 0.7, color: "#00aaff" },
            //   { offset: 1, color: "#005f88" },
            // ]),
          },
          itemStyle: {
            opacity: 1,
            color: "#00aaff",
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: "#005f88" },
            //   { offset: 0.7, color: "#00aaff" },
            //   { offset: 1, color: "#a0e6ff" },
            // ]),
          },
          emphasis: {
            itemStyle: {
              color: "#00aaff",
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   { offset: 0, color: "#005f88" },
              //   { offset: 0.7, color: "#00aaff" },
              //   { offset: 1, color: "#a0e6ff" },
              // ]),
            },
          },
          data: scaledTotalRevenue,
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          axis: "auto",
        },
        show: true,
        // formatter: (params: any) => {
        //   // Khởi tạo biến để lưu thông tin tooltip
        //   let tooltipContent = `${params[0].name}<br/>`;

        //   // Duyệt qua các params để thêm thông tin cho từng chuỗi dữ liệu
        //   params.forEach((item: any) => {
        //     const seriesName = item.seriesName;
        //     const value = item.value;
        //     const formattedValue =
        //       seriesName === "Doanh thu"
        //         ? `${value} triệu đồng`
        //         : `${value} đơn`;

        //     tooltipContent += `${item.marker} ${seriesName}: ${formattedValue}<br/>`;
        //   });

        //   return tooltipContent;
        // },
      },
      toolbox: {
        right: 0,
        top: "middle",
        orient: "vertical",
        feature: {
          magicType: {
            type: ["line", "bar"],
          },
        },
        borderColor: "#fff",
        backgroundColor: "transparent",
      },
      ...optionCustom,
    };
  }, [title, dataAxis, totalOrder, scaledTotalRevenue]);

  return <ReactECcharts option={lineChartOptions}></ReactECcharts>;
};

export default memo(OrderRevenueChart);
