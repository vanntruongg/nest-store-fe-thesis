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
import { memo } from "react";

export interface Props {
  ratingList: Rating[] | null;
  pageNo: number;
  totalElements: number;
  totalPages: number;
  averageStar: number;
  ratingStarPercentage: RatingBreakdownModel[];
  mostUpvoteRating: Rating | null;
  toggleVoteRating: (ratingId: string) => void;
  handleChangePage: (selectedItem: { selected: number }) => void;
  handleDeleteRating: (ratingId: string) => void;
}

function RatingList({
  ratingList,
  pageNo,
  totalElements,
  totalPages,
  averageStar,
  ratingStarPercentage,
  mostUpvoteRating,
  toggleVoteRating,
  handleChangePage,
  handleDeleteRating,
}: Props) {
  return (
    <div className="p-4 flex flex-col space-y-8">
      {/* <div className="flex space-x-2 items-center">
        <div className="bg-yellow-500 p-1">
          <IoIosStar className="text-white" />
        </div>
        <h4 className="text-xl font-bold leading-none">Đánh giá sản phẩm</h4>
      </div> */}
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
            <div className="col-span-2">
              <MostHelpfulRating
                rating={mostUpvoteRating}
                toggleVoteRating={toggleVoteRating}
              />
            </div>
          </div>
          <div className="space-y-4">
            {ratingList?.map((rating) => (
              <RatingItem
                key={rating.id}
                rating={rating}
                handleDeleteRating={handleDeleteRating}
                toggleVoteRating={toggleVoteRating}
              />
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
    </div>
  );
}

export default memo(RatingList);
