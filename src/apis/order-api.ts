import httpClient from "~/common/http-client";
import { OrderRequest } from "~/common/model/order.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const orderApi = {
  createOrder: (orderRequest: OrderRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.ORDER.CREATE_ORDER, orderRequest),
  getUrlPaymentVNPay: (amount: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ORDER.GET_URL_PAYMENT_VNPAY + `?amount=${amount}`
    ),
  getAllPaymentMethod: () =>
    httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_ALL_PAYMENT_METHOD),
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_ALL),
  getAllByUser: () => httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_BY_USER),
  getByStatus: (status: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ORDER.GET_BY_STATUS + `?status=${status}`
    ),
  updateStatus: (id: number, status: string) =>
    httpClient.post<any>(
      EndpointUtil.NEST.ORDER.UPDATE_STATUS + `?id=${id}&status=${status}`
    ),
};

export default orderApi;
