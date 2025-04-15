import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";
import { Card, Image } from "antd";
import { qlPages_BannerType } from "@/interface/QLPages_Banner/QLPages_Banner";
import clasess from "./page.module.css";
import { useEffect, useState } from "react";
import BannerConstant from "@/constants/BannerConstant";

interface Props {
  data: qlPages_BannerType;
}

const PreviewBanner: React.FC<Props> = (props: Props) => {
  const [bannerData, setBannerData] = useState<qlPages_BannerType>(props.data);

  useEffect(() => {
    setBannerData(props.data);
  }, [props.data]);

  // Chỉ dùng các module khi typeBanner là "SLIDE"
  const modules = [Navigation, Autoplay];
  if (bannerData.typeBanner === BannerConstant.Slide) {
    if (bannerData.pagination) modules.push(Pagination);
    if (bannerData.effect === "fade") modules.push(EffectFade);
    if (bannerData.effect === "cube") modules.push(EffectCube);
    if (bannerData.effect === "coverflow") modules.push(EffectCoverflow);
    if (bannerData.effect === "flip") modules.push(EffectFlip);
  }

  return (
    <Card title="Hiển thị banner" className="mt-4">
      {bannerData.typeBanner === BannerConstant.Static ? (
        bannerData.dataImage && bannerData.dataImage.length > 0 ? (
          <Image
            preview={false}
            alt="banner"
            src={`${process.env.NEXT_PUBLIC_API_URL}/Uploads/${bannerData.dataImage[0].duongDanFile}`}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <>Không có ảnh</>
        )
      ) : (
        // Hiển thị banner dạng SLIDE
        <Swiper
          slidesPerView={bannerData.slidesPerView}
          loop={bannerData.loop}
          navigation={bannerData.navigation || false}
          pagination={bannerData.pagination ? { clickable: true } : false}
          autoplay={
            bannerData.autoplayDelay
              ? { delay: bannerData.autoplayDelay * 1000 }
              : undefined
          }
          effect={bannerData.effect}
          modules={modules}
          className={`mt-4 ${clasess.swiper}`}
        >
          {Array.from({ length: bannerData.totalSlides ?? 0 }).map(
            (_, index) => (
              <SwiperSlide key={index}>
                {bannerData.dataImage && bannerData.dataImage.length > 0 ? (
                  <Image
                    preview={false}
                    alt="banner"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/Uploads/${
                      bannerData.dataImage[index % bannerData.dataImage.length]
                        .duongDanFile
                    }`}
                  />
                ) : (
                  <>Banner {index + 1}</>
                )}
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </Card>
  );
};

export default PreviewBanner;
