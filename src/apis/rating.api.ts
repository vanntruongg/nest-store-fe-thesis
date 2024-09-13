import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import { RatingPost } from "~/modules/rating/models/RatingPost";

const ratingApi = {
  getRatingList: (productId: number, pageNo: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.RATING.GET_RATING_LIST +
        `/${productId}?pageNo=${pageNo}`
    ),
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
  getRatingStarPercentage: (productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.RATING.GET_RATING_STAR_PERCENTAGE +
        `/${productId}` +
        "/breakdown"
    ),
};

export default ratingApi;
