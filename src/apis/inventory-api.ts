import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const inventoryApi = {
  getByProductId: (productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.INVENTORY.GET_BY_PRODUCT_ID + `/${productId}`
    ),
  getByProductIdAndSize: (productId: number, size: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.INVENTORY.GET_BY_PRODUCT_ID_AND_SIZE +
        `?size=${size}&id=${productId}`
    ),
};

export default inventoryApi;
