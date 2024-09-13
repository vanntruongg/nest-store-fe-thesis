import { Target } from "lucide-react";
import { Star } from "./star";

export interface props {
  averageStar: number;
  totalRatings: number;
}

export function OverallRating({ averageStar, totalRatings }: props) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-1">
        <Target size={16} className="text-primary" />
        <h5 className="text-lg font-semibold">Đánh giá tổng thể</h5>
      </div>
      <div className="p-2 flex flex-col items-center space-y-4">
        <div className="text-5xl space-x-1">
          <span className="font-semibold">{averageStar}</span>
          <span className="text-4xl text-muted-foreground">/</span>
          <span className="text-4xl text-muted-foreground">5</span>
        </div>
        <Star star={averageStar} fontSize="28px" />
        <p className="text-muted-foreground font-medium">
          ({totalRatings} đánh giá)
        </p>
      </div>
    </div>
  );
}
