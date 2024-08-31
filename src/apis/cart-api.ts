import httpClient from "~/common/http-client";
import {
  CartRequest,
  UpdateCartRequest,
  DelteCartRequest,
} from "~/common/model/cart.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const cartApi = {
  getAll: (email: string) =>
    httpClient.get<any>(EndpointUtil.NEST.CART.GET_ALL + `?email=${email}`),
  countItems: (email: string) =>
    httpClient.get<any>(EndpointUtil.NEST.CART.COUNT + `?email=${email}`),
  getByUserAndProductId: (email: string, productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.CART.GET_BY_USER_AND_PRODUCT_ID +
        `?email=${email}&productId=${productId}`
    ),
  add: (data: CartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.ADD, data),
  udpate: (data: UpdateCartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.UPDATE, data),
  delete: (data: DelteCartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.DELETE, data),
};

export default cartApi;
