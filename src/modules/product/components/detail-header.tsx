import { Star } from "~/modules/rating/components/star";

export interface Props {
  productName: string;
  averagerStar: number;
  ratingCount: number;
}

export function DetailHeader({
  productName,
  averagerStar,
  ratingCount,
}: Props) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{productName}</h3>
      <div className="flex items-center divide-x divide-gray-500">
        <div className="px-2 flex items-center space-x-0.5">
          <span className="mt-1.5 underline text-yellow-500">
            {averagerStar}
          </span>
          <Star star={averagerStar} fontSize="18px" />
        </div>
        <div className="px-2 text-muted-foreground">
          ({ratingCount} đánh giá)
        </div>
      </div>
    </div>
  );
}
