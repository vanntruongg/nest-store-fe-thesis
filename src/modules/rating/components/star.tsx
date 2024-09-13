import StarRatings from "react-star-ratings";

export interface IStarProps {
  star: number;
  fontSize: string;
}

export function Star({ star, fontSize }: IStarProps) {
  return (
    <StarRatings
      rating={star ? star : 0}
      starRatedColor="#eab308"
      starDimension={fontSize}
      starSpacing="1px"
      name="rating-header"
    />
  );
}
