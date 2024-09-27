"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Image as ProductImage } from "../models/Image";

export interface Props {
  imageUrl: string;
}

export function ProductImageGallery({ imageUrl }: Props) {
  const [activeThumb, setActiveThumb] = useState<Swiper>();
  return (
    <div className="pr-32 space-y-5">
      <SwiperComponent
        // loop={images.length > 1}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: activeThumb }}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className="product-images-slider w-full"
      >
        {/* {images.map((image) => ( */}
        <SwiperSlide key={imageUrl} className="p-5 aspect-square">
          <Image alt="slide" src={imageUrl} fill className="select-none" />
        </SwiperSlide>
        {/* ))} */}
      </SwiperComponent>
      {/* <SwiperComponent
        loop={images.length > 1}
        onSwiper={setActiveThumb}
        slidesPerView={4}
        spaceBetween={10}
        // centeredSlides={true}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="border cursor-pointer">
            <div className="aspect-square">
              <Image
                fill
                sizes="100"
                alt="slide"
                src={image.imageUrl}
                className="select-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent> */}
    </div>
  );
}
