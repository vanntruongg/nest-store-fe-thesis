import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

export const getAllCategory = async () => {
  const url = EndpointUtil.NEST.PRODUCT.CATEGORY.GET_ALL;
  const res = await httpClient.get<any>(url);
  return res.payload;
};

export const getAllParentById = async (categoryId: number) => {
  const url = EndpointUtil.NEST.PRODUCT.CATEGORY.GET_ALL_PARENT_BY_ID;
  const res = await httpClient.get<any>(url + `/${categoryId}`);
  return res.payload;
};
