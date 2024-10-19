import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { UserPut } from "../model/UserPut";

export const getProfile = async (accessToken: string) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.GET_PROFILE;
  const res = await httpClient.get<any>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.payload;
};
export const getAllUser = async (pageNo: number, pageSize: number) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.GET_ALL;
  const res = await httpClient.get<any>(
    url + `?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return res.payload;
};
export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.CHANGE_PASSWORD;
  const res = await httpClient.post<any>(url, {
    oldPassword,
    newPassword,
  });
  return res.payload;
};
export const updateUser = async (data: UserPut) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.UPDATE_USER;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};
export const deleteUser = async (email: string) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.DELETE_USER;
  const res = await httpClient.delete<any>(url + `/${email}`);
  return res.payload;
};
export const getUserCount = async () => {
  const url = EndpointUtil.NEST.IDENTITY.USER.COUNT_USER;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const searchUserByName = async (
  name: string,
  pageNo: number,
  pageSize: number
) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.SEARCH_BY_NAME;
  const res = await httpClient.get<any>(
    url + `/${name}?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return res.payload;
};
