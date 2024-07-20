import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const statisticApi = {
  getOrderCount: () =>
    httpClient.get<any>(
      EndpointUtil.NEST.STATISTIC.GET_TOTAL_ORDER_COUNT_BY_STATUS
    ),
  revenueStatistic: (year: number, month: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.STATISTIC.REVENUE_STATISTIC +
        `?year=${year}&month=${month}`
    ),
  orderStatistic: (year: number, month: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.STATISTIC.ORDER_STATISTIC +
        `?year=${year}&month=${month}`
    ),
};

export default statisticApi;
