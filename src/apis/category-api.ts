import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const categoryApi = {
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.PRODUCT.CATEGORY.GET_ALL),
  getAllParentById: (categoryId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.CATEGORY.GET_ALL_PARENT_BY_ID + `/${categoryId}`
    ),
};

export default categoryApi;
