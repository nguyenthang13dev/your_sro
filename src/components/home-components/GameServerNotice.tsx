"use client";

import { Card, Col, Row } from "antd";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AchiveMent from "./AchiveMent";
import ServerInfor2 from "./ServerInfor2";

import ImageSelectorInfo from "./ImageSelectorInfo";
import { Rankings } from "./rankings";
import RankingTable from "./rank-mini";
import DetailTinTuc from "./DetailTinTuc";
import ImageSelector from "./ImageSelector";

const GameServerNotice = () => {
  const servers = [
    { name: "Server 37 Red Flame Horn 208", date: "10:00 ngày 2..04-29" },
    { name: "Server 37 Red Flame Horn 207", date: "10:00 ngày 2..04-28" },
    { name: "Server 37 Red Flame Horn 206", date: "10:00 ngày 2..04-27" },
    { name: "Server 37 Red Flame Horn 205", date: "10:00 ngày 2..04-26" },
    { name: "Server 37 Red Flame Horn 204", date: "10:00 ngày 2..04-25" },
  ];

  return (
    <>
      <div className="cha-main-layout-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg shadow-lg overflow-hidden bg-img-news">
        {/* Phần hình ảnh bên trái */}
        <div className="main-layout-2">
          <Row gutter={24} className="mb-4">
            <Col span={12} className="relative">
              <ServerInfor2 />
            </Col>
            <Col span={12} className="relative">
              <div className="w-full p-6 bg-gradient-to-b from-red-900 to-red-700 min-h300  bg-khung">
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
          <Row gutter={24} className="mb-4">
            <Col span={12}>
              {/* <Rankings /> */}
              <RankingTable />
              <ImageSelector />
            </Col>
            <Col span={12}>
              <DetailTinTuc />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default GameServerNotice;
