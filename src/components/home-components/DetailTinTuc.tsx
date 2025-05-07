"use client";

import {
  WifiOutlined as WifiOffOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { Badge, Card, ConfigProvider, Divider, theme, Typography } from "antd";
import { useState } from "react";
import { Rankings } from "./rankings";
import RankingTable from "./rank-mini";

const { Title, Text } = Typography;

interface ServerData {
  id: number;
  name: string;
  status: "online" | "offline" | "maintenance";
  players: number;
  maxPlayers: number;
  region: string;
  ping: number;
  label?: "hot" | "new" | "recommended";
  lastReset: string;
}

const DetailTinTuc = () => {
  const [selectedServer, setSelectedServer] = useState<number | null>(null);

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
          height: "100%",
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
            Chi tiết tin tức
          </Title>
        </div>

        <Divider style={{ borderColor: "#92400e", margin: "12px 0" }} />

        <div style={{ color: "#fef08a", fontSize: 14, lineHeight: 1.5 }}></div>
      </Card>
    </ConfigProvider>
  );
};

export default DetailTinTuc;
