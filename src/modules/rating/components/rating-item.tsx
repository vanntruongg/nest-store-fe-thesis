import { Star } from "./star";
import { Rating } from "../models/Rating";
import { useUser } from "~/hooks/useUser";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
export interface Props {
  rating: Rating;
  handleDeleteRating: (ratingId: string) => void;
}

export function RatingItem({ rating, handleDeleteRating }: Props) {
  const { user } = useUser();

  return (
    <div className="bg-white p-4 flex flex-col space-y-2 rounded-md">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Star star={rating.star} fontSize="18px" />
          <div className="text-muted-foreground text-sm leading-none mt-2">
            {rating.createdDate}
          </div>
        </div>
        {/* {user.email === rating.createdBy && ( */}
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
        {/* )} */}
      </div>
      <div className="font-semibold text-lg">{rating.productName}</div>

      <div className="text-muted-foreground">{rating.content}</div>

      <div className="self-end font-semibold">
        {rating.lastName} {rating.firstName}
      </div>
    </div>
  );
}
