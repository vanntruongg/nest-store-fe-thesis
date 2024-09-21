import { Target, ThumbsUp } from "lucide-react";
import { Star } from "./star";
import { Rating } from "../models/Rating";
import { cn } from "~/lib/utils";
import { useUser } from "~/hooks/useUser";

export interface Props {
  rating: Rating | null;
  toggleVoteRating: (ratingId: string) => void;
}

export function MostHelpfulRating({ rating, toggleVoteRating }: Props) {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-1">
        <Target size={16} className="text-blue-500" />
        <h5 className="text-lg font-semibold">Đánh giá hữu ích</h5>
      </div>
      {rating && (
        <div className="flex rounded-md h-full py-4 divide-x">
          <div className="px-4 flex flex-col items-center font-semibold">
            <p>
              {rating.lastName} {rating.firstName}
            </p>
            <span className="text-muted-foreground text-sm leading-none mt-0.5">
              {rating.createdDate}
            </span>
          </div>
          <div className="px-4 flex flex-col justify-between">
            <div className="">
              <Star star={rating.star} fontSize="18px" />
              <p className="">{rating.content}</p>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm ">
              <div
                className="cursor-pointer"
                onClick={() => toggleVoteRating(rating.id)}
              >
                <ThumbsUp
                  size={18}
                  className={cn("hover:text-primary", {
                    "text-primary": rating.upvoteUsers.includes(user.email),
                  })}
                />
              </div>
              <span className=" mt-1">({rating.upvoteUsers.length})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
