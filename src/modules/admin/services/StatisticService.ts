import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

export const getOrderCount = async () => {
  const url = EndpointUtil.NEST.STATISTIC.GET_TOTAL_ORDER_COUNT_BY_STATUS;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const revenueStatistic = async (year: number, month: string) => {
  const url = EndpointUtil.NEST.STATISTIC.REVENUE_STATISTIC;
  const res = await httpClient.get<any>(url + `?year=${year}&month=${month}`);
  return res.payload;
};
export const orderStatistic = async (year: number, month: string) => {
  const url = EndpointUtil.NEST.STATISTIC.ORDER_STATISTIC;
  const res = await httpClient.get<any>(url + `?year=${year}&month=${month}`);
  return res.payload;
};
