import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const ratingApi = {
  getRatingList: () =>
    httpClient.get<any>(EndpointUtil.NEST.RATING.GET_RATING_LIST),
  createRating: (payload: RatingPost) =>
    httpClient.get<any>(EndpointUtil.NEST.RATING.CREATE_RATING),
  deleteRating: (ratingId: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.RATING.DELETE_RATING + `/${ratingId}`
    ),
  getAverageRatingStar: (productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.RATING.GET_AVERAGE_STAR_OF_PRODUCT +
        `/${productId}` +
        "/average-star"
    ),
};

export default ratingApi;
