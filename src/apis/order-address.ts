import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const orderAddressApi = {
  getOrderDeliveryAddressById: (addressId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ADDRESS.ORDER.GET_DELIVERY_ADDRESS + `/${addressId}`
    ),
};

export default orderAddressApi;
