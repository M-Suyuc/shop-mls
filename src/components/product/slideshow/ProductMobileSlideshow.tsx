"use client";

import Image from "next/image";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
              className="object-cover object-top"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
