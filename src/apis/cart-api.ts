import httpClient from "~/common/http-client";
import {
  CartRequest,
  UpdateCartRequest,
  DelteCartRequest,
} from "~/common/model/cart.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const cartApi = {
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.CART.GET_ALL),
  countItems: () => httpClient.get<any>(EndpointUtil.NEST.CART.COUNT),
  getByUserAndProductId: (productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.CART.GET_BY_PRODUCT_ID + `?productId=${productId}`
    ),
  add: (data: CartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.ADD, data),
  udpate: (data: UpdateCartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.UPDATE, data),
  delete: (data: DelteCartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.DELETE, data),
};

export default cartApi;
