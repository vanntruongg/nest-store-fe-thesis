import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { ProductPost } from "~/modules/product/models/ProductPost";
import { ProductPut } from "~/modules/product/models/ProductPut";

const productApi = {
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_ALL),
  getList: (
    category: number,
    sortOrder: string,
    pageNo: number,
    pageSize: number
  ) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_LIST +
        `?category=${category}&sortOrder=${sortOrder}&pageNo=${pageNo}&pageSize=${pageSize}`
    ),
  getProductById: (productId: number) =>
    httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_BY_ID + `/${productId}`),
  getProductByName: (name: string, limit: number = 10) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_BY_NAME + `?name=${name}&limit=${limit}`
    ),
  // getProductByCategory: (categoryId: number, limit: number) =>
  //   httpClient.get<any>(
  //     EndpointUtil.NEST.PRODUCT.GET_BY_CATEGORY +
  //       `/${categoryId}/limit/${limit}`
  //   ),
  // getTopLevelCategory: () =>
  //   httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_TOP_LEVEL_CATEGORY),

  // getAllSubCategory: (categoryId: number) =>
  //   httpClient.get<any>(
  //     EndpointUtil.NEST.PRODUCT.GET_ALL_SUBCATEGORY + `/${categoryId}`
  //   ),
  createProduct: (createProductData: ProductPost) =>
    httpClient.post<any>(
      EndpointUtil.NEST.PRODUCT.CREATE_PRODUCT,
      createProductData
    ),
  updateProduct: (updateProductData: ProductPut) =>
    httpClient.post<any>(
      EndpointUtil.NEST.PRODUCT.UPDATE_PRODUCT,
      updateProductData
    ),
  getProductCount: () =>
    httpClient.get<any>(EndpointUtil.NEST.PRODUCT.COUNT_PRODUCT),
};

export default productApi;
