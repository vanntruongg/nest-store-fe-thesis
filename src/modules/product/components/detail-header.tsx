import { Star } from "~/modules/rating/components/star";

export interface props {
  productName: string;
  averagerStar: number;
  ratingCount: number;
}

export function DetailHeader({
  productName,
  averagerStar,
  ratingCount,
}: props) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{productName}</h3>
      <div className="flex space-x-2 items-center">
        <Star star={averagerStar} fontSize="18px" />
        <p className="mt-2 leading-none text-muted-foreground">
          ({ratingCount} đánh giá)
        </p>
      </div>
    </div>
  );
}
