import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

export const orderPredict = async () => {
  const url = EndpointUtil.NEST.AI.ORDER.PREDICTION;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
