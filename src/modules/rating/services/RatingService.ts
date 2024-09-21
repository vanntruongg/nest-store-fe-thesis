import { RatingPost } from "../models/RatingPost";
import { EndpointUtil } from "~/common/utility/endpoint.util";
import httpClient from "~/common/http-client";
import { toast } from "~/components/ui/use-toast";

export const getAverageStarByProductId = async (productId: number) => {
  const url =
    EndpointUtil.NEST.RATING.GET_AVERAGE_STAR_OF_PRODUCT +
    `/${productId}` +
    "/average-star";
  const res = await httpClient.get<any>(url);

  return res.payload;
};

export const createRating = async (data: RatingPost) => {
  const url = EndpointUtil.NEST.RATING.CREATE_RATING;
  const res = await httpClient.post<any>(url, data);
  return res.payload;
};

export const deleteRating = async (ratingId: string) => {
  const url = EndpointUtil.NEST.RATING.DELETE_RATING + `/${ratingId}`;
  const res = await httpClient.delete<any>(url);
  return res.payload;
};

export const getRatingByProductId = async (
  productId: number,
  pageNo: number
) => {
  const url =
    EndpointUtil.NEST.RATING.GET_RATING_LIST + `/${productId}?pageNo=${pageNo}`;
  const res = await httpClient.get<any>(url);
  return res.payload;
};

export const getRatingStarPercentage = async (productId: number) => {
  const url =
    EndpointUtil.NEST.RATING.GET_RATING_STAR_PERCENTAGE +
    `/${productId}` +
    "/breakdown";
  const res = await httpClient.get<any>(url);
  return res.payload;
};

export const upvoteRating = async (ratingId: string) => {
  const url = EndpointUtil.NEST.RATING.UPVOTE_RATING + `/${ratingId}`;
  const res = await httpClient.post<any>(url);
  return res.payload;
};

export const getMostUpvoteRating = async (productId: number) => {
  const url =
    EndpointUtil.NEST.RATING.MOST_UPVOTE_RATING + `/${productId}/most-upvote`;
  const res = await httpClient.get<any>(url);
  return res.payload;
};
