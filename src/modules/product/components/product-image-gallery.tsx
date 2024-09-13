"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { ProductImage } from "~/common/model/product.model";

export interface IProductImageGalleryProps {
  images: ProductImage[];
}

export function ProductImageGallery({ images }: IProductImageGalleryProps) {
  const [activeThumb, setActiveThumb] = useState<Swiper>();
  return (
    <div className="size-full space-y-5">
      <SwiperComponent
        loop={images.length > 1}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: activeThumb }}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className="product-images-slider w-full h-4/5"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              alt="slide"
              src={image.imageUrl}
              fill
              sizes="100"
              className="select-none"
            />
          </SwiperSlide>
        ))}
      </SwiperComponent>
      <SwiperComponent
        loop={images.length > 1}
        onSwiper={setActiveThumb}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs w-full h-1/6"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="border cursor-pointer">
            <div className="product-images-slider-thumbs-wrapper">
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
      </SwiperComponent>
    </div>
  );
}
