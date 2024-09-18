import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { OrderPost } from "../model/OrderPost";

export const createOrder = async (orderRequest: OrderPost) => {
  const url = EndpointUtil.NEST.ORDER.CREATE_ORDER;
  const res = await httpClient.post<any>(url, orderRequest);
  return res.payload;
};

export const getAllOrder = async () => {
  const url = EndpointUtil.NEST.ORDER.GET_ALL;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const getAllMyOrder = async (
  pageNo: number,
  pageSize: number,
  orderStatus: string
) => {
  const url = EndpointUtil.NEST.ORDER.GET_MY_ORDER;
  const res = await httpClient.get<any>(
    url + `?pageNo=${pageNo}&pageSize=${pageSize}&orderStatus=${orderStatus}`
  );
  return res.payload;
};
export const getByStatus = async (status: string) => {
  const url = EndpointUtil.NEST.ORDER.GET_BY_STATUS;
  const res = await httpClient.get<any>(url + `?status=${status}`);
  return res.payload;
};
export const updateStatus = async (id: number, status: string) => {
  const url = EndpointUtil.NEST.ORDER.UPDATE_STATUS;
  const res = await httpClient.post<any>(url + `?id=${id}&status=${status}`);
  return res.payload;
};
