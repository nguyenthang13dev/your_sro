"use client";

import { Col, Row } from "antd";
import ServerInfor2 from "./ServerInfor2";

import { newsTypeMap } from "@/constants/QLNewsTinTuc";
import { tableQLNewsData } from "@/interface/QLNews/QLNews";
import { qlnewsservice } from "@/services/QLNews/QLNews.service";
import { useDispatch, useSelector } from "@/store/hooks";
import { setNewsGroup } from "@/store/QlNews/QLNewsSlice";
import { setCurrent } from "@/store/QLNewsCurrent/QLNewsCurrentSlice";
import { useCallback, useEffect, useState } from "react";
import DetailTinTuc from "./DetailTinTuc";
import ImageSelector from "./ImageSelector";
import ListAccountRegister from "./ListAccountRegister";
import RankingTable from "./rank-mini";

const GameServerNotice = () =>
{
  const dispatch = useDispatch();
  const newsGroups = useSelector((state) => state.qlnewsGroup.newsGroups)
  const [ activeTab, setActiveTab ] = useState( "all" );
  const [ currentContent, setCurrentContent ] = useState<tableQLNewsData>();



  const handleGetTinTuc = useCallback(async () => {
    const search = {}; // searchQLNewsType
    const res = await qlnewsservice.GetGroupData(search);
    dispatch(setNewsGroup(res.data));
  }, [ newsGroups ] );
  
  const renderNewsItems = () => {
    const currentGroup = newsGroups.find((g) => g.groupName === activeTab);
    if (!currentGroup) return <p>Không có dữ liệu.</p>;
    return (
      <ul className="space-y-2">
        {currentGroup.items.map((item) => (
          <li key={item.id} style={{
            cursor: "pointer"
          }} className="text-sm" onClick={() =>
          {
            dispatch(setCurrent(item));
          }}>
            <span className="text-yellow-400">[{item.title}]</span>
          </li>
        ))}
      </ul>
    );
  };
  const tabNames = ["all", "news",  "event", "notification"];
  useEffect(() => {
    handleGetTinTuc();
  }, []);
  return (
    <>
      <div className="cha-main-layout-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg shadow-lg overflow-hidden bg-img-news">
        {/* Phần hình ảnh bên trái */}
        <div className="main-layout-2">
          <Row gutter={24} className="mb-4">
            <Col span={9} className="relative">
              <ServerInfor2 />
            </Col>
            <Col span={10}>
          <div className="w-full p-6 bg-gradient-to-b from-red-900 to-red-700 min-h300 bg-khung">
            <div className="flex space-x-4 mb-4 border-b border-yellow-500">
              {tabNames.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 uppercase ${
                    activeTab === tab
                      ? "text-yellow-400 border-b-2 border-yellow-400 font-semibold"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {newsTypeMap[tab.toLowerCase()]}
                </button>
              ))}
            </div>
            {renderNewsItems()}
          </div>
            </Col>
            

            <Col span={5}>
              <RankingTable />
            
            </Col>
          </Row>
          <Row gutter={24} className="mb-4">
            <Col span={12}>
              {/* <Rankings /> */}
              <ImageSelector />
            </Col>
            <Col span={12}>
              <DetailTinTuc  />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={12}>
              <ListAccountRegister />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default GameServerNotice;
