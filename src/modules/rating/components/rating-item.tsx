import { Star } from "./star";
import { Rating } from "../models/Rating";
import { useUser } from "~/hooks/useUser";
import { MoreHorizontal, ThumbsUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
export interface Props {
  rating: Rating;
  handleDeleteRating: (ratingId: string) => void;
  toggleVoteRating: (ratingId: string) => void;
}

export function RatingItem({
  rating,
  handleDeleteRating,
  toggleVoteRating,
}: Props) {
  const { user } = useUser();

  return (
    <div className="bg-zinc-100 p-4 flex flex-col space-y-4 rounded-md">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Star star={rating.star} fontSize="18px" />
          <div className="text-muted-foreground text-sm leading-none mt-2">
            {rating.createdDate}
          </div>
        </div>
        {user.email === rating.createdBy && (
          <div className="aspect-square size-6 flex justify-center relative items-center bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal size={18} />
              </PopoverTrigger>
              <PopoverContent className="w-full -translate-x-1/2 p-0">
                <Button
                  variant={"outline"}
                  onClick={() => handleDeleteRating(rating.id)}
                >
                  Xóa đánh giá
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {/* <div className="font-semibold text-lg">{rating.productName}</div> */}

      <div className="text-muted-foreground">{rating.content}</div>

      <div className="flex justify-between">
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
        <div className="font-semibold">
          {rating.lastName} {rating.firstName}
        </div>
      </div>
    </div>
  );
}
