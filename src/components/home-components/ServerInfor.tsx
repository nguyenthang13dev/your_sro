"use client"

import
    {
        ClockCircleOutlined,
        StarOutlined,
        UserOutlined,
        WifiOutlined as WifiOffOutlined,
        WifiOutlined,
    } from "@ant-design/icons"
import { Badge, Button, Card, ConfigProvider, Divider, Tag, theme, Tooltip, Typography } from "antd"
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {servers.map((server) => (
            <Tooltip
              key={server.id}
              placement="bottom"
              color="black"
              overlayInnerStyle={{
                border: "1px solid #ca8a04",
                color: "#fef08a",
              }}
              title={
                <div>
                  <Text strong style={{ color: "#fef08a" }}>
                    {server.name}
                  </Text>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <WifiOutlined style={{ fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: "#fef08a", fontSize: 12 }}>
                        Ping: {server.status === "online" ? `${server.ping}ms` : "N/A"}
                      </Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <UserOutlined style={{ fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: "#fef08a", fontSize: 12 }}>Người chơi: {server.players}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StarOutlined style={{ fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: "#fef08a", fontSize: 12 }}>Khu vực: {server.region}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ClockCircleOutlined style={{ fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: "#fef08a", fontSize: 12 }}>Reset: {server.lastReset}</Text>
                    </div>
                  </div>
                </div>
              }
            >
              <Button
                type="default"
                style={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  background: "linear-gradient(to right, #7f1d1d, #b91c1c)",
                  color: "#fcd34d",
                  border: selectedServer === server.id ? "1px solid #fcd34d" : "1px solid #ca8a04",
                  opacity: server.status === "maintenance" ? 0.7 : 1,
                }}
                onClick={() => handleSelectServer(server.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontWeight: 500, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {server.name.split(" - ")[0]}
                  </span>
                  <div>{getStatusIcon(server.status)}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 4 }}>
                  <Text style={{ color: getStatusColor(server.status), fontSize: 12 }}>
                    {server.status === "online" ? "Hoạt động" : server.status === "maintenance" ? "Bảo trì" : "Offline"}
                  </Text>

                  {server.status === "online" && (
                    <Text style={{ color: getPlayerCountColor(server.players, server.maxPlayers), fontSize: 12 }}>
                      {server.players}/{server.maxPlayers}
                    </Text>
                  )}
                </div>

                {server.label && (
                  <div style={{ position: "absolute", top: -8, right: -8 }}>
                    {server.label === "hot" && (
                      <Tag color="red" style={{ fontSize: 10, padding: "0 4px" }}>
                        HOT
                      </Tag>
                    )}
                    {server.label === "new" && (
                      <Tag color="green" style={{ fontSize: 10, padding: "0 4px" }}>
                        NEW
                      </Tag>
                    )}
                    {server.label === "recommended" && (
                      <Tag color="blue" style={{ fontSize: 10, padding: "0 4px" }}>
                        KHUYÊN DÙNG
                      </Tag>
                    )}
                  </div>
                )}
              </Button>
            </Tooltip>
          ))}
        </div>

        {selectedServer && (
          <Button
            type="primary"
            block
            style={{
              background: "linear-gradient(to right, #b45309, #ca8a04)",
              color: "#fef08a",
              fontWeight: "bold",
              border: "1px solid #fcd34d",
            }}
          >
            Chọn Máy Chủ
          </Button>
        )}
      </Card>
    </ConfigProvider>
  )
}

export default ServerInfor
