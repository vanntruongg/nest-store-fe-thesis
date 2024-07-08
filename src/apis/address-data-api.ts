import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const addressDataApi = {
  getAddressDataByParentCode: (parentCode: string | null) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ADDRESS_DATA.GET_ADDRESS_DATA_BY_PARENT_CODE +
        `?parentCode=${parentCode}`
    ),
};

export default addressDataApi;
