"use client";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImgSlide1 from "../../../assets/slide/slide-1.webp";
import ImgSlide2 from "../../../assets/slide/slide-2.webp";
import ImgSlide3 from "../../../assets/slide/slide-3.webp";
import Link from "next/link";
import { ROUTES } from "~/common/constants/routes";

const Slider = () => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        preventClicks={false}
        preventClicksPropagation={false}
        scrollbar={true}
      >
        {/* {slides.map(({ id, image }) => (
          <SwiperSlide key={id} className="select-none">
            <Image src={image} alt={`slide-${id}`} sizes="50vw" />
          </SwiperSlide>
        ))} */}
        <SwiperSlide className="">
          <div className="flex justify-end relative">
            <div className="p-10 md:p-20 md:w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">
                  Tìm sản phẩm tốt nhất trong mùa này.
                </span>
                <p className="text-5xl">Bộ sưu tập độc quyền dành cho bạn</p>
              </div>
              <Link
                href={ROUTES.SHOP}
                className="bg-black px-6 py-3 text-18 text-white font-bold font-nunito hover:shadow-md hover:bg-primary hover:text-white transition-all duration-200"
              >
                Mua sắm ngay
              </Link>
            </div>
            <Image
              src={ImgSlide1}
              alt="slide1"
              className="h-auto w-[600px]"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <div className="flex justify-end relative min-h-[400px]">
            <div className="p-10 md:p-20 md:w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">
                  Tìm sản phẩm tốt nhất trong mùa này.
                </span>
                <p className="text-5xl">Bộ sưu tập độc quyền dành cho bạn</p>
              </div>
              <Link
                href={ROUTES.SHOP}
                className="bg-black px-6 py-3 text-18 text-white font-bold font-nunito hover:shadow-md hover:bg-primary hover:text-white transition-all duration-200"
              >
                Mua sắm ngay
              </Link>
            </div>
            <Image
              src={ImgSlide2}
              alt="slide2"
              className="w-[820px] h-auto"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <div className="flex justify-end relative">
            <div className="p-10 md:p-20 md:w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">
                  Tìm sản phẩm tốt nhất trong mùa này.
                </span>
                <p className="text-5xl">Bộ sưu tập độc quyền dành cho bạn</p>
              </div>
              <Link
                href={ROUTES.SHOP}
                className="bg-black px-6 py-3 text-18 text-white font-bold font-nunito hover:shadow-md hover:bg-primary hover:text-white transition-all duration-200"
              >
                Mua sắm ngay
              </Link>
            </div>
            <Image
              src={ImgSlide3}
              alt="slide-3"
              className="h-auto w-[608px]"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
