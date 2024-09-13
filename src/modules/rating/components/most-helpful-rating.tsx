import { Target } from "lucide-react";
import { Star } from "./star";

export interface props {}

export function MostHelpfulRating(props: props) {
  return (
    <div className="col-span-2 p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-1">
        <Target size={16} className="text-blue-500" />
        <h5 className="text-lg font-semibold">Đánh giá hữu ích</h5>
      </div>
      <div className="p-2">
        <div className="flex space-x-2 rounded-md">
          <div className="flex flex-col items-center font-semibold text-nowrap px-4">
            <span>Trần Văn Trường</span>
            <p className="text-muted-foreground text-sm leading-none mt-0.5">
              3 ngày trước
            </p>
          </div>
          <div>
            <Star star={4} fontSize="18px" />
            <div className="font-semibold text-lg">
              Sản phẩm áo thun phong cách Hàn Quốc
            </div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit illo magni illum, iste vero unde dicta eum dolore
              aspernatur! Sunt, quos aliquid?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
