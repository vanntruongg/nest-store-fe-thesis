import httpClient from "~/common/http-client";
import { IUpdateUser } from "~/common/model/user.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const userApi = {
  getProfile: (accessToken: string) =>
    httpClient.get<any>(EndpointUtil.NEST.IDENTITY.USER.GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getAllUser: () =>
    httpClient.get<any>(EndpointUtil.NEST.IDENTITY.USER.GET_ALL),
  changePassword: (oldPassword: string, newPassword: string) =>
    httpClient.post<any>(EndpointUtil.NEST.IDENTITY.USER.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    }),
  updateUser: (data: IUpdateUser) =>
    httpClient.post<any>(EndpointUtil.NEST.IDENTITY.USER.UPDATE_USER, data),
  deleteUser: (email: string) =>
    httpClient.delete<any>(
      EndpointUtil.NEST.IDENTITY.USER.DELETE_USER + `/${email}`
    ),
  getUserCount: () =>
    httpClient.get<any>(EndpointUtil.NEST.IDENTITY.USER.COUNT_USER),
};

export default userApi;
