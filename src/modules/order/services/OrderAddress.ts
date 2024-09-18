import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

export const getOrderDeliveryAddressById = async (addressId: number) => {
  const url = EndpointUtil.NEST.ADDRESS.ORDER.GET_DELIVERY_ADDRESS;
  const res = await httpClient.get<any>(url + `/${addressId}`);
  return res.payload;
};
