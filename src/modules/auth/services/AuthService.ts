import { EndpointUtil } from "~/common/utility/endpoint.util";
import { AuthResponse, ResetPassword } from "../model/AuthModel";
import httpClient from "~/common/http-client";
import {
  LoginShemaType,
  RegisterShemaType,
} from "~/app/schema-validations/auth.shema";

export const login = async (loginPayload: LoginShemaType) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.LOGIN;
  const res = await httpClient.post<any>(url, loginPayload);
  return res.payload;
};
export const register = async (
  registerPayload: Omit<RegisterShemaType, "confirmPassword">
) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.REGISTER;
  const res = await httpClient.post<any>(url, registerPayload);
  return res.payload;
};
export const auth = async (body: AuthResponse) => {
  const url = EndpointUtil.NEST.IDENTITY.SERVER.AUTH;
  const res = await httpClient.post<any>(url, body, { baseUrl: "" });
  return res.payload;
};

export const logoutFromNextServer = async (token: string) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.LOGOUT;
  const res = await httpClient.post<any>(url, { token });
  return res.payload;
};
export const logout = async (token: string) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.LOGOUT;
  const res = await httpClient.post<any>(url, { token });
  return res.payload;
};

export const logoutFromNextClientToNextServer = async (
  force?: boolean | undefined
) => {
  const url = EndpointUtil.NEST.IDENTITY.SERVER.LOGOUT;
  const res = await httpClient.post<any>(url, { force }, { baseUrl: "" });
  return res.payload;
};

export const handleRefreshToken = async (refreshToken: string) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.REFRESH_TOKEN;
  const res = await httpClient.post<any>(url, { refreshToken });
  return res.payload;
};
export const requestVerifyEmail = async (email: string) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.REQUEST_VERIFY_ACCOUNT;
  const res = await httpClient.post<any>(url + `?email=${email}`);
  return res.payload;
};
export const verifyEmail = async (token: string) => {
  const url = EndpointUtil.NEST.IDENTITY.AUTH.VERIFY_EMAIL;
  const res = await httpClient.post<any>(url + `?token=${token}`);
  return res.payload;
};
export const forgotPassword = async (email: string) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.FORGOT_PASSWORD;
  const res = await httpClient.post<any>(url + `?email=${email}`);
  return res.payload;
};
export const resetPassword = async (resetPassword: ResetPassword) => {
  const url = EndpointUtil.NEST.IDENTITY.USER.RESET_PASSWORD;
  const res = await httpClient.post<any>(url, resetPassword);
  return res.payload;
};
