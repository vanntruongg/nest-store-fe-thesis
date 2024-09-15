import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { OrderPost } from "~/modules/order/model/OrderPost";

const orderApi = {
  createOrder: (orderRequest: OrderPost) =>
    httpClient.post<any>(EndpointUtil.NEST.ORDER.CREATE_ORDER, orderRequest),
  getUrlPaymentVNPay: (amount: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ORDER.GET_URL_PAYMENT_VNPAY + `?amount=${amount}`
    ),
  getAllPaymentMethod: () =>
    httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_ALL_PAYMENT_METHOD),
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_ALL),
  getAllMyOrder: (pageNo: number, pageSize: number, orderStatus: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ORDER.GET_MY_ORDER +
        `?pageNo=${pageNo}&pageSize=${pageSize}&orderStatus=${orderStatus}`
    ),
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
