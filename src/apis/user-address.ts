import httpClient from "~/common/http-client";
import {
  CreateAddressRequest,
  UpdateAddressRequest,
} from "~/common/model/address.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const userAddressApi = {
  createAddress: (payload: CreateAddressRequest) =>
    httpClient.post<any>(
      EndpointUtil.NEST.ADDRESS.USER.CREATE_ADDRESS,
      payload
    ),
  updateAddress: (payload: UpdateAddressRequest) =>
    httpClient.post<any>(
      EndpointUtil.NEST.ADDRESS.USER.UPDATE_ADDRESS,
      payload
    ),
  deleteAddress: (addressId: number) =>
    httpClient.delete<any>(
      EndpointUtil.NEST.ADDRESS.USER.DELETE_ADDRESS + `?addressId=${addressId}`
    ),
  getAllAddress: () =>
    httpClient.get<any>(EndpointUtil.NEST.ADDRESS.USER.GET_ALL_BY_USER_EMAIL),
  getDefaultAddress: () =>
    httpClient.get<any>(EndpointUtil.NEST.ADDRESS.USER.GET_DEFAULT_ADDRESS),
  setDefaultAddress: (addressId: number) =>
    httpClient.post<any>(
      EndpointUtil.NEST.ADDRESS.USER.UPDATE_DEFAULT_ADDRESS +
        `?addressId=${addressId}`
    ),
};

export default userAddressApi;
