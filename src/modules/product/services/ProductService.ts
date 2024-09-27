import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { ProductPost } from "../models/ProductPost";
import { ProductPut } from "../models/ProductPut";

export const getProductById = async (productId: number) => {
  const url = EndpointUtil.NEST.PRODUCT.GET_BY_ID;
  const res = await httpClient.get<any>(url + `/${productId}`);
  return res.payload;
};

export const getAllProduct = async (pageNo: number, pageSize: number) => {
  const url =
    EndpointUtil.NEST.PRODUCT.GET_ALL +
    `?pageNo=${pageNo}&pageSize=${pageSize}`;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
export const getListProduct = async (
  category: number,
  sortOrder: string,
  pageNo: number,
  pageSize: number
) => {
  const url = EndpointUtil.NEST.PRODUCT.GET_LIST;
  const res = await httpClient.get<any>(
    url +
      `?category=${category}&sortOrder=${sortOrder}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return res.payload;
};

export const getProductByName = async (name: string, limit: number = 10) => {
  const url = EndpointUtil.NEST.PRODUCT.GET_BY_NAME;
  const res = await httpClient.get<any>(url + `?name=${name}&limit=${limit}`);
  return res.payload;
};
export const createProduct = async (createProductData: ProductPost) => {
  const url = EndpointUtil.NEST.PRODUCT.CREATE_PRODUCT;
  const res = await httpClient.post<any>(url, createProductData);
  return res.payload;
};
export const updateProduct = async (data: ProductPut) => {
  const url = EndpointUtil.NEST.PRODUCT.UPDATE_PRODUCT;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};
export const getProductCount = async () => {
  const url = EndpointUtil.NEST.PRODUCT.COUNT_PRODUCT;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
