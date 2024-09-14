import { cn } from "~/lib/utils";
import { RatingBreakdown as RatingBreakdownModel } from "../models/RatingBreakdown";
import { Target } from "lucide-react";
import { IoIosStar } from "react-icons/io";

export interface Props {
  ratingStarPercentage: RatingBreakdownModel[];
}

export function RatingBreakdown({ ratingStarPercentage }: Props) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-1">
        <Target size={16} className="text-green-500" />
        <h5 className="text-lg font-semibold">Phân tích đánh giá</h5>
      </div>
      <div className="p-2 space-y-1">
        {ratingStarPercentage.map(({ star, percentage, totalRatings }) => (
          <div key={star} className="flex space-x-4 items-center text-nowrap">
            <div className="flex items-center space-x-1">
              <span className="font-medium">{star}</span>
              <IoIosStar className="text-yellow-500" />
            </div>
            <div className="relative bg-gray-100 rounded-full w-full h-3 overflow-hidden">
              <span
                style={{ width: percentage + "%" }}
                className={cn("absolute left-0 h-full bg-primary rounded-full")}
              ></span>
            </div>
            <span className="text-sm">{totalRatings}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
