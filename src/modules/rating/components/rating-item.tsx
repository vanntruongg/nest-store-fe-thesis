import { Star } from "./star";
import { Rating } from "../models/Rating";

export interface props {
  rating: Rating;
}

export function RatingItem({ rating }: props) {
  return (
    <div className="bg-white p-4 flex flex-col space-y-2 rounded-md">
      <div className="flex space-x-2 items-center">
        <Star star={rating.star} fontSize="18px" />
        <div className="text-muted-foreground text-sm leading-none mt-2">
          {rating.createdDate}
        </div>
      </div>
      <div className="font-semibold text-lg">{rating.productName}</div>

      <div className="text-muted-foreground">{rating.content}</div>

      <div className="self-end font-semibold">
        {rating.lastName} {rating.firstName}
      </div>
    </div>
  );
}
