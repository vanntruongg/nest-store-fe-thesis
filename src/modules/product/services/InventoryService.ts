import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { InventoryPut } from "../models/InventoryPut";

export const getStockByProductId = async (productId: number) => {
  const url = EndpointUtil.NEST.INVENTORY.GET_BY_PRODUCT_ID;
  const res = await httpClient.get<any>(url + `/${productId}`);
  return res.payload;
};
export const getStockByProductIdAndSize = async (
  productId: number,
  size: string
) => {
  const url = EndpointUtil.NEST.INVENTORY.GET_BY_PRODUCT_ID_AND_SIZE;
  const res = await httpClient.get<any>(url + `?size=${size}&id=${productId}`);
  return res.payload;
};

export const updateInventory = async (inventoryPut: InventoryPut) => {
  const url = EndpointUtil.NEST.INVENTORY.UPDATE;
  const res = await httpClient.put<any>(url, inventoryPut);
  return res.payload;
};
