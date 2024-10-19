import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { CategoryPost, CategoryPut } from "../models/Category";

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

export const createCategory = async (categoryPost: CategoryPost) => {
  const url = EndpointUtil.NEST.PRODUCT.CATEGORY.CREATE;
  const res = await httpClient.post<any>(url, categoryPost);
  return res.payload;
};

export const updateCategory = async (categoryPut: CategoryPut) => {
  const url = EndpointUtil.NEST.PRODUCT.CATEGORY.UPDATE;
  const res = await httpClient.put<any>(url, categoryPut);
  return res.payload;
};
