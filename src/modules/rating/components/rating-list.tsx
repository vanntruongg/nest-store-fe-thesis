"use client";

import MaxWidthWrapper from "~/common/components/max-width-wrapper";
import { IoIosStar } from "react-icons/io";
import { RatingItem } from "./rating-item";
import { Rating } from "../models/Rating";
import ReactPaginate from "react-paginate";
import { OverallRating } from "./overall-rating";
import { RatingBreakdown } from "./rating-breakdown";
import { MostHelpfulRating } from "./most-helpful-rating";
import { RatingBreakdown as RatingBreakdownModel } from "../models/RatingBreakdown";
import { RatingShemaType } from "~/app/schema-validations/rating.shema";
import { PostRatingForm } from "./post-rating-form";

export interface IRatingListProps {
  ratingList: Rating[] | null;
  pageNo: number;
  totalElements: number;
  totalPages: number;
  averageStar: number;
  ratingStarPercentage: RatingBreakdownModel[];
  handleChangePage: (selectedItem: { selected: number }) => void;
  handleCreateRating: (data: RatingShemaType) => void;
}

export function RatingList({
  ratingList,
  pageNo,
  totalElements,
  totalPages,
  averageStar,
  ratingStarPercentage,
  handleChangePage,
  handleCreateRating,
}: IRatingListProps) {
  return (
    <MaxWidthWrapper className="my-20 p-6 flex flex-col space-y-8 bg-gray-100">
      <div className="flex space-x-2 items-center">
        <div className="bg-yellow-500 p-1">
          <IoIosStar className="text-white" />
        </div>
        <h4 className="text-xl font-bold leading-none">Đánh giá sản phẩm</h4>
      </div>
      {totalElements === 0 ? (
        <span>Hiện tại chưa có đánh giá nào</span>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <OverallRating
              averageStar={averageStar}
              totalRatings={totalElements}
            />
            <RatingBreakdown ratingStarPercentage={ratingStarPercentage} />
            <MostHelpfulRating />
          </div>
          <div className="space-y-4">
            {ratingList?.map((rating) => (
              <RatingItem key={rating.id} rating={rating} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages && (
            <ReactPaginate
              forcePage={pageNo}
              previousLabel={"Trước"}
              nextLabel={"Tiếp"}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              onPageChange={handleChangePage}
              containerClassName={"pagination-container"}
              previousClassName={"previous-btn"}
              nextClassName={"next-btn"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
            />
          )}
        </>
      )}
    </MaxWidthWrapper>
  );
}
