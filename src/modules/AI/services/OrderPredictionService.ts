import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const baseUrlServerAI = "http://localhost:8000/api/v1";

export const orderPredict = async () => {
  const url = EndpointUtil.NEST.AI.ORDER_PREDICTION.PREDICTION;
  const res = await httpClient.get<any>(url, { baseUrl: baseUrlServerAI });
  return res.payload;
};
