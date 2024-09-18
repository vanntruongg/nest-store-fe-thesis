import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

export const getAddressDataByParentCode = async (parentCode: string | null) => {
  const url =
    EndpointUtil.NEST.ADDRESS_DATA.GET_ADDRESS_DATA_BY_PARENT_CODE +
    `?parentCode=${parentCode}`;

  const response = await httpClient.get<any>(url);

  return response.payload;
};
