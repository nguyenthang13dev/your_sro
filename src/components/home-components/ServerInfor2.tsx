"use client";

import { objectFixNews } from "@/constants/QLNewsTinTuc";
import { useSelector } from "@/store/hooks";
import { Card, ConfigProvider, Divider, theme, Typography } from "antd";
import { useMemo } from "react";

const { Title, Text } = Typography;
// Custom theme for Ant Design
const customTheme = {
  token: {
    colorPrimary: "#ca8a04", // yellow-600
    colorBgContainer: "rgba(0, 0, 0, 0.6)",
    colorBorder: "#ca8a04", // yellow-600
    borderRadius: 8,
  },
  components: {
    Card: {
      colorBorderSecondary: "#92400e", // yellow-800
    },
    Button: {
      colorPrimary: "#b45309", // yellow-700
      colorPrimaryHover: "#a16207", // yellow-600
    },
  },
};
const ServerInfor2 = () => {
  const newsGroups = useSelector( state => state.qlnewsGroup.newsGroups );
  
  console.log(newsGroups)
  const news = useMemo( () =>
  {
    return newsGroups?.find(x => x.groupName == objectFixNews.serverinfor);
  }, [newsGroups])
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        ...customTheme,
      }}
    >
      <Card
        bordered
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          borderColor: "#ca8a04",
          borderWidth: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Title level={4} style={{ color: "#fcd34d", margin: 0 }}>
            Thông Tin Máy Chủ
          </Title>
        </div>

        <Divider style={{ borderColor: "#92400e", margin: "12px 0" }} />
        
        <div style={{ color: "#fef08a", fontSize: 14, lineHeight: 1.5 }}>
          {(news?.items && news.items[0]) ? (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: news.items[0]?.content ?? "" }}
              style={{
                padding: 0,
                color: "#f8fafc", // slate-50
                fontSize: "1rem",
              }}
            />
          ) : (
            <Text style={{ color: "#fef08a" }}>Không có nội dung</Text>
          )}
        </div>

      </Card>
    </ConfigProvider>
  );
};

export default ServerInfor2;
