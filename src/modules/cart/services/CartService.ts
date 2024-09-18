import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { CartDelete, CartPost, CartPut } from "../model/CartRequest";

export const cartGetAll = async () => {
  const url = EndpointUtil.NEST.CART.GET_ALL;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const cartCountItems = async () => {
  const url = EndpointUtil.NEST.CART.COUNT;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const getCartByUserAndProductId = async (productId: number) => {
  const url = EndpointUtil.NEST.CART.GET_BY_PRODUCT_ID;
  const res = await httpClient.get<any>(url + `?productId=${productId}`);
  return res.payload;
};
export const addToCart = async (data: CartPost) => {
  const url = EndpointUtil.NEST.CART.ADD;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};
export const udpateCart = async (data: CartPut) => {
  const url = EndpointUtil.NEST.CART.UPDATE;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};
export const deleteFromCart = async (data: CartDelete) => {
  const url = EndpointUtil.NEST.CART.DELETE;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};
