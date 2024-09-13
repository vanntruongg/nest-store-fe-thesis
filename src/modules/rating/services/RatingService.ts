import ratingApi from "~/apis/rating.api";
import { RatingPost } from "../models/RatingPost";

export const getAverageStarByProductId = async (productId: number) => {
  const res = await ratingApi.getAverageRatingStar(productId);

  return res.payload.data;
};

export const createRating = async (data: RatingPost) => {
  const res = await ratingApi.createRating(data);
  return res.payload;
};

export const getRatingByProductId = async (
  productId: number,
  pageNo: number
) => {
  const res = await ratingApi.getRatingList(productId, pageNo);
  return res.payload.data;
};

export const getRatingStarPercentage = async (productId: number) => {
  const res = await ratingApi.getRatingStarPercentage(productId);
  return res.payload.data;
};
getRatingStarPercentage;
