"use client"

import { Col } from "antd";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerGame = () =>
{
   return  <Col span={12} className="relative">
              <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
       <SwiperSlide className=''>
            <Image
                src={'/img/background/per1.png'}
                alt={'Game Character 1'}
                objectFit="cover"
                width={600}
                height={382}
                layout="responsive"
              />
            </SwiperSlide>
            <SwiperSlide className=''>
            <Image
                src={'/img/background/per2.png'}
                alt={'Game Character 1'}
                objectFit="cover"
                width={600}
                height={382}
                layout="responsive"
              />
            </SwiperSlide>
                 <SwiperSlide className=''>
            <Image
                src={'/img/background/per3.png'}
                alt={'Game Character 1'}
                objectFit="cover"
                width={600}
                height={382}
                layout="responsive"
              />
            </SwiperSlide>
      </Swiper>
                     
              </Col>

}

export default BannerGame;