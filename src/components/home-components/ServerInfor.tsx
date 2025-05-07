"use client";

import
  {
    WifiOutlined as WifiOffOutlined,
    WifiOutlined,
  } from "@ant-design/icons";
import { Badge, Card, ConfigProvider, Divider, theme, Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const ServerInfor = () => {
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
          width: 360,
          fontSize: "16px",
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
            Thông Tin Quan Trọng
          </Title>
          {/* <Badge
            count={
              servers.reduce(
                (acc, server) =>
                  acc + (server.status === "online" ? server.players : 0),
                0
              ) + " người chơi"
            }
            style={{
              backgroundColor: "#b91c1c",
              color: "#fef08a",
              border: "1px solid #eab308",
            }}
          /> */}
        </div>

        <Divider style={{ borderColor: "#92400e", margin: "12px 0" }} />

        <div className="grid grid-cols-1 gap-4">
          <div style={{ color: "#fef08a", fontWeight: "bold" }}>
            <a>1. Sự kiện ĐUA TOP Khai mở server</a>
          </div>
          <div style={{ color: "#fef08a", fontWeight: "bold" }}>
            <a>2. Khuyến mại nạp thẻ - Nhận ngàn tích luỹ</a>
          </div>
          <div style={{ color: "#fef08a", fontWeight: "bold" }}>
            <a>3. Điểm đặc sắc của Server : Silkroad Việt</a>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default ServerInfor;
