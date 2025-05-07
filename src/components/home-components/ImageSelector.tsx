import {
  Card,
  Col,
  ConfigProvider,
  Row,
  Badge,
  Divider,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
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

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("/img/imgSelector/a.png");
  const [selectedLable, setSelectedLable] = useState("LUẬT CHƠI");

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
  ];

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

  const images = [
    "/img/imgSelector/a.png",
    "/img/imgSelector/b.png",
    "/img/imgSelector/c.png",
  ];

  const labels = ["LUẬT CHƠI", "LỰA JOB", "LỊCH TRÌNH UPDATE"];

  const handleGetSelectedImg = (image: string, label: string) => {
    setSelectedImage(image);
    setSelectedLable(label);
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
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
                minHeight: "100%",
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
                  {selectedLable}
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

              <div style={{ color: "#fef08a", fontSize: 14, lineHeight: 1.5 }}>
                {/* <li>
                  Max cap: 90 / Class: Only Asia / Skill: 90 / Master: 270 điểm
                </li>
                <li>Ghost Skill: Không Ghost / Item: ITEM D9 - SOX</li>
                <li>Giới hạn: 3 acc/PC, 1JOB / 1IP / khoá buôn (00h00-8h00)</li>
                <li>Time: 5 giờ xanh / 1 giờ vàng</li>
                <li>Trang bị: FULL Từ D1 - D9, đủ SOX</li>
                <li>Hiệu ứng vũ khí: Chuẩn VDC</li>
                <li>Không có hệ thống Gacha</li>
                <li>LKD Đặt biệt: Có LKD</li>
                <li>Item vứt shop: 1 vàng</li>
                <li>SHOP NPC: Giá 10.000 VNĐ (sự kiện)</li>
                <p></p> */}
              </div>
            </Card>
          </ConfigProvider>
        </Col>
        <Col span={12}>
          <Row className="items-start p-4" style={{ display: "flex" }}>
            <Col
              className="w-2/3 h-64 relative mr-4 bg-center bg-contain bg-no-repeat transform scale-[1.5] transition-all duration-300"
              style={{ backgroundImage: `url(${selectedImage})` }}
            ></Col>
            <Col>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <div
                    className="w-12 h-12 relative cursor-pointer"
                    onClick={() => handleGetSelectedImg(image, labels[index])}
                  >
                    <img
                      src={image}
                      alt={`Job ${index + 1}`}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-white font-bold cursor-pointer"
                    onClick={() => handleGetSelectedImg(image, labels[index])}
                  >
                    {labels[index]}
                  </span>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ImageSelector;
