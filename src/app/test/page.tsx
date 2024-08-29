import React from "react";
import { ProductImageSlider } from "~/components/product-detail/product-image-slider";

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

const page = () => {
  return (
    <div className="bg-white mx-auto h-screen flex items-center justify-center">
      {/* <div className="bg-blue-500 h-full flex-1 ">{}</div>
      <Button type="submit">Tìm kiếm</Button>

      <Loading /> */}
      <div className="w-[400px] h-[500px] bg-gray-300">
        <ProductImageSlider images={images} />
      </div>
    </div>
  );
};

export default page;
