"use client";
import React from "react";
import { RatingItem } from "~/modules/rating/components/rating-item";
import { Rating } from "~/modules/rating/models/Rating";
import { UserAvatar } from "~/modules/user/components/user-avatar";

const images = [
  {
    id: 43,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1712480119/nest_store/xkkk2rqy3cyenw5k0g4u.jpg",
  },
  {
    id: 50,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1722755119/nest_store/vn-11134207-7r98o-ll3opk5wv5qgb9_wgkp25.jpg",
  },
  {
    id: 51,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1722755287/nest_store/vn-11134207-7r98o-ll3opk5x0s0898_thkaru.jpg",
  },
  {
    id: 52,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1722755317/nest_store/vn-11134207-7r98o-ll3opk5wxyvc2e_amqk7i.jpg",
  },
  {
    id: 53,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1722755363/nest_store/vn-11134207-7r98o-ll3opk5wwkaw14_frimho.jpg",
  },
  {
    id: 54,
    imageUrl:
      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1722755404/nest_store/vn-11134207-7r98o-ll3opk5wqy14e4_pdrzw9.jpg",
  },
];

const rating: Rating = {
  id: "1",
  content: "Sản phẩm chất lượng",
  createdBy: "truongtran.lv2019@gmail.com",
  createdDate: "2 ngày trước",
  firstName: "Van Truong",
  lastName: "Tran",
  productId: 1,
  upvoteUsers: [],
  star: 4,
};

const page = () => {
  const handleDeleteRating = (ratingId: string) => {
    console.log(ratingId);
  };
  return (
    // <div className="bg-white mx-auto h-screen flex items-center justify-center">
    //   {/* <div className="bg-blue-500 h-full flex-1 ">{}</div>
    //   <Button type="submit">Tìm kiếm</Button>

    //   <Loading /> */}
    //   {/* <div className="w-[400px] h-[500px] bg-gray-300">
    //     <ProductImageSlider images={images} />
    //   </div> */}
    // </div>
    <div className="w-full h-screen flex justify-center items-center p-20 bg-green-100">
      {/* <RatingList productId={1} /> */}
      {/* <PostRatingForm productId={1} productName="Quần tây" /> */}
      {/* <RatingItem rating={rating} handleDeleteRating={handleDeleteRating} /> */}
    </div>
  );
};

export default page;
