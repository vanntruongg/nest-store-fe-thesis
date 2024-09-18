import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { AddressPost } from "~/modules/address/modules/AddressPost";
import { AddressPut } from "~/modules/address/modules/AddressPut";

export const createAddress = async (payload: AddressPost) => {
  const url = EndpointUtil.NEST.ADDRESS.USER.CREATE_ADDRESS;
  const res = await httpClient.post<any>(url, payload);
  return res.payload;
};
export const updateAddress = async (payload: AddressPut) => {
  const url = EndpointUtil.NEST.ADDRESS.USER.UPDATE_ADDRESS;
  const res = await httpClient.post<any>(url, payload);
  return res.payload;
};
export const deleteAddress = async (addressId: number) => {
  const url = EndpointUtil.NEST.ADDRESS.USER.DELETE_ADDRESS;
  const res = await httpClient.delete<any>(url + `?addressId=${addressId}`);
  return res.payload;
};
export const getAllAddress = async () => {
  const url = EndpointUtil.NEST.ADDRESS.USER.GET_ALL_BY_USER_EMAIL;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const getDefaultAddress = async () => {
  const url = EndpointUtil.NEST.ADDRESS.USER.GET_DEFAULT_ADDRESS;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const setDefaultAddress = async (addressId: number) => {
  const url = EndpointUtil.NEST.ADDRESS.USER.UPDATE_DEFAULT_ADDRESS;
  const res = await httpClient.post<any>(url + `?addressId=${addressId}`);
  return res.payload;
};
