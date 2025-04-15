"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import BannerConstant from "@/constants/BannerConstant";
import { UploadedItem } from "@/interface/QLPages_Banner/QLPages_Banner";
import React from "react";

interface PropsData {
  dataImage: UploadedItem[];
  typeBanner: string;
}
const BannerWidget: React.FC<PropsData> = ({ dataImage, typeBanner }) => {
  return (
    <>
      {typeBanner == BannerConstant.Static ? (
        <>
          {dataImage && dataImage?.length > 0 && (
            <img
              style={{
                width: "100%",
                height: "inherit",
                objectFit: "cover",
              }}
              alt="img"
              src={`${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}/${dataImage[0]?.duongDanFile}`}
            />
          )}
        </>
      ) : (
        <>
          <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {dataImage &&
              dataImage?.length > 0 &&
              dataImage?.map((slide, index) => (
                <>
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                </>
              ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default BannerWidget;
