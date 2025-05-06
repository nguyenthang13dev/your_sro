"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AchiveMent from "./AchiveMent";
import ServerInfor2 from "./ServerInfor2";
import ImageSelector from "./ImageSelector";
import OnlyServerInfo from "./OnlyServerInfo";

const GameServerNotice = () => {
  const servers = [
    { name: "Server 37 Red Flame Horn 208", date: "10:00 ngày 2..04-29" },
    { name: "Server 37 Red Flame Horn 207", date: "10:00 ngày 2..04-28" },
    { name: "Server 37 Red Flame Horn 206", date: "10:00 ngày 2..04-27" },
    { name: "Server 37 Red Flame Horn 205", date: "10:00 ngày 2..04-26" },
    { name: "Server 37 Red Flame Horn 204", date: "10:00 ngày 2..04-25" },
  ];

  return (
    <div className=" bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg shadow-lg overflow-hidden bg-img-news pd-news">
      {/* Phần hình ảnh bên trái */}

      <Row gutter={[10, 10]} className="mb-4">
        <Col span={12} className="relative">
          {/* Container của Swiper có position: relative */}
          <div className="relative">
            {/* <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={false}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              <SwiperSlide className="img-h382">
                <Image
                  src={"/img/anh-ben-traipng.png"}
                  alt={"Game Character 1"}
                  objectFit="cover"
                  width={600}
                  height={382}
                  layout="responsive"
                />
              </SwiperSlide>
              <SwiperSlide className="img-h382">
                <Image
                  src={"/img/anh-ben-traipng.png"}
                  alt={"Game Character 1"}
                  objectFit="cover"
                  width={600}
                  height={382}
                  layout="responsive"
                />
              </SwiperSlide>
              <SwiperSlide className="img-h382">
                <Image
                  src={"/img/anh-ben-traipng.png"}
                  alt={"Game Character 1"}
                  objectFit="cover"
                  width={600}
                  height={382}
                  layout="responsive"
                />
              </SwiperSlide>
            </Swiper> */}
            {/* ServerInfor2 đè lên Swiper */}
            <ServerInfor2 />
          </div>
        </Col>

        <Col span={12} className="relative">
          <div className="w-full p-6 bg-gradient-to-b from-red-900 to-red-700 min-h382 bg-khung">
            <div className="flex space-x-4 mb-4 border-b border-yellow-500">
              <button className="pb-2 text-yellow-400 border-b-2 border-yellow-400 font-semibold uppercase">
                toàn bộ
              </button>
              <button className="pb-2 text-gray-300 hover:text-yellow-400 uppercase">
                Sự kiện
              </button>
              <button className="pb-2 text-gray-300 hover:text-yellow-400 uppercase">
                Hướng dẫn
              </button>
              <button className="pb-2 text-gray-300 hover:text-yellow-400 uppercase">
                Tin tức
              </button>
            </div>
            <ul className="space-y-2">
              {servers.map((server, index) => (
                <li key={index} className="text-sm">
                  <span className="text-yellow-400">[Thông báo]</span>{" "}
                  {server.name} sẽ ra mắt vào lúc {server.date}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      {/*    
              <div className="container flex justify-around items-center flex-row pd-20 ">
                <div className="relative block-item__banner bg-guide">
                  <Link href="/guide" className="game-button w-full md:w-auto bounce-text">
                    HƯỚNG DẪN NẠP SILK
                  </Link>
                </div>

                <div className="relative block-item__banner bg-schedule">
                  <Link href="/schedule" className="game-button w-full md:w-auto text-schedule text-glow bounce-text">
                    LỊCH HOẠT ĐỘNG SỰ KIỆN
                  </Link>
                </div>

                <div className="relative block-item__banner bg-energy">
                  <Link href="/energy" className="game-button w-full md:w-auto text-energy text-glow bounce-text">
                    CẮM NĂNG TẦN THÙ
                  </Link>
                </div>

                <div className="relative block-item__banner bg-faq">
                  <Link href="/faq" className="game-button w-full md:w-auto text-faq text-glow bounce-text">
                    FAQ
                  </Link>
                </div>
              </div> */}

      {/* Achive ment */}
      {/* <div className="container  ">
        <AchiveMent />
      </div> */}

      <div className="khoi-imge-selector">
        <OnlyServerInfo />
        <ImageSelector />
      </div>
    </div>
  );
};

export default GameServerNotice;
