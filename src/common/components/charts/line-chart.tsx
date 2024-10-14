"use client";

import * as echarts from "echarts";
import ReactECcharts from "echarts-for-react";
import { memo, useEffect, useState } from "react";
import { ProductUtil } from "~/common/utility/product.util";

interface LineChartProps {
  title: string;
  subTitle?: string;
  dataSubText?: string | number;
  dataAxis: number[] | string[];
  totalOrder: number[];
  totalRevenue: number[];
  optionCustom?: any;
}
const LineChart = ({
  title,
  dataAxis,
  totalOrder,
  totalRevenue,
  optionCustom,
}: LineChartProps) => {
  const [option, setOption] = useState({});
  const scaledTotalRevenue = totalRevenue.map((revenue) => revenue / 1000000);
  useEffect(() => {
    const lineChartOptions = {
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
        // Tùy chọn khác nếu cần thiết
        bottom: 0,
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: "#000",
          boundaryGap: false,
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
          smooth: 0.6, // boolean | number
          name: "Đơn hàng",
          showBackground: true,
          areaStyle: {
            opacity: 0.1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b394fc" },
              { offset: 0.7, color: "#8104fd" },
              { offset: 1, color: "#8104fd" },
            ]),
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b394fc" },
              { offset: 0.7, color: "#8104fd" },
              { offset: 1, color: "#8104fd" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#8104fd" },
                { offset: 0.7, color: "#8104fd" },
                { offset: 1, color: "#b394fc" },
              ]),
            },
          },
          animationEasing: "bounceInOut",
          animationDuration: 2000,
          data: totalOrder,
        },
        {
          type: "line",
          smooth: 0.6, // boolean | number
          name: "Doanh thu",
          showBackground: true,
          areaStyle: {
            opacity: 0.1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#a0e6ff" },
              { offset: 0.7, color: "#00aaff" },
              { offset: 1, color: "#005f88" },
            ]),
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#005f88" },
              { offset: 0.7, color: "#00aaff" },
              { offset: 1, color: "#a0e6ff" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#005f88" },
                { offset: 0.7, color: "#00aaff" },
                { offset: 1, color: "#a0e6ff" },
              ]),
            },
          },
          animationEasing: "bounceInOut",
          animationDuration: 2000,
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
        formatter: (params: any) => {
          // Khởi tạo biến để lưu thông tin tooltip
          let tooltipContent = `${params[0].name}<br/>`;

          // Duyệt qua các params để thêm thông tin cho từng chuỗi dữ liệu
          params.forEach((item: any) => {
            const seriesName = item.seriesName;
            const value = item.value;
            const formattedValue =
              seriesName === "Doanh thu"
                ? `${value} triệu đồng`
                : `${value} đơn`;

            tooltipContent += `${item.marker} ${seriesName}: ${formattedValue}<br/>`;
          });

          return tooltipContent;
        },
      },
      toolbox: {
        right: 0,
        top: "middle",
        orient: "vertical",
        feature: {
          // dataZoom: {},
          // saveAsImage: {
          //   // backgroundColor: "#fff",
          //   // connectedBackgroundColor: "#fff",
          //   title: "Lưu",
          // },
          // dataView: {},
          magicType: {
            type: ["line", "bar"],
          },
        },
        borderColor: "#fff",
        backgroundColor: "transparent",
      },
      ...optionCustom,
    };

    setOption(lineChartOptions);
  }, [dataAxis, totalOrder, title, optionCustom]);

  return <ReactECcharts option={option}></ReactECcharts>;
};

export default memo(LineChart);
