"use client";

import { useState } from "react";

import { Swiper as SwiperObject } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div
      className={`${className} sticky top-5 h-full max-h-[650px] min-h-[600px]`}
    >
      {/* big image */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="w-full h-fit overflow-hidden rounded-lg"
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="">
            <Image
              width={1024}
              height={800}
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
              className="w-full h-full object-contain object-top"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* little images */}
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction="vertical"
        className="mySwiper w-[20%] h-[100%]"
      >
        {images.map((image) => (
          <SwiperSlide
            key={image}
            className="cursor-pointer my-2 overflow-hidden rounded-xl"
          >
            <Image
              width={300}
              height={300}
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
              className="w-fit h-full md:object-cover mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
