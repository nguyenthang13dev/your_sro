"use client"

import
  {
    WifiOutlined as WifiOffOutlined,
    WifiOutlined
  } from "@ant-design/icons"
import { Badge, Card, ConfigProvider, Divider, theme, Typography } from "antd"
import { useState } from "react"

const { Title, Text } = Typography

interface ServerData {
  id: number
  name: string
  status: "online" | "offline" | "maintenance"
  players: number
  maxPlayers: number
  region: string
  ping: number
  label?: "hot" | "new" | "recommended"
  lastReset: string
}

const ServerInfor = () => {
  const [selectedServer, setSelectedServer] = useState<number | null>(null)

  const servers: ServerData[] = [
    {
      id: 1,
      name: "Server 1 - Rồng Xanh",
      status: "online",
      players: 1250,
      maxPlayers: 2000,
      region: "Asia",
      ping: 25,
      label: "hot",
      lastReset: "2 ngày trước",
    },
    {
      id: 2,
      name: "Server 2 - Phượng Hoàng",
      status: "online",
      players: 980,
      maxPlayers: 2000,
      region: "Asia",
      ping: 30,
      label: "new",
      lastReset: "5 ngày trước",
    },
    {
      id: 3,
      name: "Server 3 - Hổ Vàng",
      status: "online",
      players: 750,
      maxPlayers: 2000,
      region: "Asia",
      ping: 35,
      lastReset: "10 ngày trước",
    },
    {
      id: 4,
      name: "Server 4 - Rùa Đen",
      status: "maintenance",
      players: 0,
      maxPlayers: 2000,
      region: "Asia",
      ping: 0,
      lastReset: "Bảo trì",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#4ade80" // green-400
      case "offline":
        return "#ef4444" // red-500
      case "maintenance":
        return "#eab308" // yellow-500
      default:
        return "#9ca3af" // gray-400
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <WifiOutlined style={{ color: "#4ade80" }} />
      case "offline":
      case "maintenance":
        return <WifiOffOutlined style={{ color: "#ef4444" }} />
      default:
        return null
    }
  }

  const getPlayerCountColor = (players: number, maxPlayers: number) => {
    const ratio = players / maxPlayers
    if (ratio > 0.8) return "#f87171" // red-400
    if (ratio > 0.5) return "#facc15" // yellow-400
    return "#4ade80" // green-400
  }

  const handleSelectServer = (id: number) => {
    setSelectedServer(id)
  }

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
  }

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Title level={4} style={{ color: "#fcd34d", margin: 0 }}>
            Thông Tin Máy Chủ
          </Title>
          <Badge
            count={
              servers.reduce((acc, server) => acc + (server.status === "online" ? server.players : 0), 0) +
              " người chơi"
            }
            style={{ backgroundColor: "#b91c1c", color: "#fef08a", border: "1px solid #eab308" }}
          />
        </div>

        <Divider style={{ borderColor: "#92400e", margin: "12px 0" }} />

        <div style={{ color: "#fef08a", fontSize: 14, lineHeight: 1.5 }}>
           <li>Max cap: 90 / Class: Only Asia / Skill: 90 / Master: 270 điểm</li>
              <li>Ghost Skill: Không Ghost / Item: ITEM D9 - SOX</li>
              <li>Giới hạn: 3 acc/PC, 1JOB / 1IP / khoá buôn (00h00-8h00)</li>
              <li>Time: 5 giờ xanh / 1 giờ vàng</li>
              <li>Trang bị: FULL Từ D1 - D9, đủ SOX</li>
              <li>Hiệu ứng vũ khí: Chuẩn VDC</li>
              <li>Không có hệ thống Gacha</li>
              <li>LKD Đặt biệt: Có LKD</li>
              <li>Item vứt shop: 1 vàng</li>
              <li>SHOP NPC: Giá 10.000 VNĐ (sự kiện)</li>
          <p>
          </p>
        </div>

       
      </Card>
    </ConfigProvider>
  )
}

export default ServerInfor
