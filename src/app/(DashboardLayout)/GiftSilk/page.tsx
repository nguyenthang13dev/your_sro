"use client"

import { GiftOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, Card, Col, Image, Input, List, Row, Space, Tag, Typography } from "antd"
import { useMemo, useState } from "react"

const { Title, Text } = Typography
const { Search } = Input

interface GiftItem {
  id: string
  name: string
  quantity: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface GiftSilkSet {
  id: string
  name: string
  price: number
  image: string
  description: string
  items: GiftItem[]
  discount?: number
}

const GiftSilk = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Dữ liệu mẫu các bộ gift silk
  const giftSilkSets: GiftSilkSet[] = [
    {
      id: "1",
      name: "Bộ Chiến Binh Huyền Thoại",
      price: 299000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Bộ trang bị dành cho những chiến binh mạnh mẽ",
      discount: 20,
      items: [
        { id: "1", name: "Kiếm Rồng Thiêng", quantity: 1, rarity: "legendary" },
        { id: "2", name: "Giáp Vàng", quantity: 1, rarity: "epic" },
        { id: "3", name: "Nhẫn Sức Mạnh", quantity: 2, rarity: "rare" },
        { id: "4", name: "Thuốc Hồi Máu", quantity: 10, rarity: "common" },
      ],
    },
    {
      id: "2",
      name: "Bộ Pháp Sư Bí Ẩn",
      price: 249000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Trang bị hoàn hảo cho những pháp sư tài năng",
      items: [
        { id: "5", name: "Gậy Phép Thuật", quantity: 1, rarity: "epic" },
        { id: "6", name: "Áo Choàng Ma Thuật", quantity: 1, rarity: "rare" },
        { id: "7", name: "Sách Phép", quantity: 3, rarity: "rare" },
        { id: "8", name: "Thuốc Hồi Mana", quantity: 15, rarity: "common" },
      ],
    },
    {
      id: "3",
      name: "Bộ Sát Thủ Bóng Đêm",
      price: 199000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Dành cho những sát thủ lặng lẽ trong bóng tối",
      discount: 15,
      items: [
        { id: "9", name: "Dao Ám Sát", quantity: 2, rarity: "epic" },
        { id: "10", name: "Mặt Nạ Bóng Đêm", quantity: 1, rarity: "rare" },
        { id: "11", name: "Giày Lặng Lẽ", quantity: 1, rarity: "rare" },
        { id: "12", name: "Bom Khói", quantity: 5, rarity: "common" },
      ],
    },
    {
      id: "4",
      name: "Bộ Cung Thủ Thiên Thần",
      price: 179000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Trang bị thiêng liêng cho những cung thủ thiện lành",
      items: [
        { id: "13", name: "Cung Thiên Thần", quantity: 1, rarity: "legendary" },
        { id: "14", name: "Mũi Tên Ánh Sáng", quantity: 50, rarity: "rare" },
        { id: "15", name: "Găng Tay Bắn Tỉa", quantity: 1, rarity: "epic" },
        { id: "16", name: "Thuốc Tăng Tốc", quantity: 8, rarity: "common" },
      ],
    },
  ]

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredSets = useMemo(() => {
    return giftSilkSets.filter(
      (set) =>
        set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        set.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Hàm xác định màu sắc theo độ hiếm
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "gold"
      case "epic":
        return "purple"
      case "rare":
        return "blue"
      case "common":
        return "default"
      default:
        return "default"
    }
  }

  // Hàm xử lý mua hàng
  const handlePurchase = (setId: string, setName: string) => {
    console.log(`Mua bộ: ${setName} (ID: ${setId})`)
    // Thêm logic xử lý mua hàng ở đây
  }

  // Hàm format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
          <GiftOutlined style={{ marginRight: "8px" }} />
          Cửa Hàng Gift Silk
        </Title>

        {/* Thanh tìm kiếm */}
        <div style={{ marginBottom: "24px" }}>
          <Search
            placeholder="Tìm kiếm theo tên bộ gift silk..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "500px", margin: "0 auto", display: "block" }}
          />
        </div>

        {/* Danh sách các bộ gift silk */}
        <Row gutter={[16, 16]}>
          {filteredSets.map((set) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={set.id}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={set.name}
                    src={set.image || "/placeholder.svg"}
                    height={200}
                    style={{ objectFit: "cover" }}
                    preview={false}
                  />
                }
                actions={[
                  <Button
                    key="buy"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handlePurchase(set.id, set.name)}
                    style={{ width: "90%" }}
                  >
                    Mua Ngay
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <Text strong style={{ fontSize: "16px" }}>
                        {set.name}
                      </Text>
                      <Space>
                        <Text style={{ fontSize: "18px", color: "#ff4d4f" }}>
                          {formatPrice(set.discount ? set.price * (1 - set.discount / 100) : set.price)}
                        </Text>
                        {set.discount && (
                          <>
                            <Text delete style={{ color: "#999" }}>
                              {formatPrice(set.price)}
                            </Text>
                            <Tag color="red">-{set.discount}%</Tag>
                          </>
                        )}
                      </Space>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <Text type="secondary">{set.description}</Text>

                      <div>
                        <Text strong style={{ marginBottom: "8px", display: "block" }}>
                          Vật phẩm trong bộ:
                        </Text>
                        <List
                          size="small"
                          dataSource={set.items}
                          renderItem={(item) => (
                            <List.Item style={{ padding: "4px 0", border: "none" }}>
                              <Space size="small" style={{ width: "100%", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: "12px" }}>{item.name}</Text>
                                <Space size="small">
                                  <Text style={{ fontSize: "12px" }}>x{item.quantity}</Text>
                                  <Tag
                                    color={getRarityColor(item.rarity)}
                                    style={{ fontSize: "10px", margin: 0 }}
                                  >
                                    {item.rarity}
                                  </Tag>
                                </Space>
                              </Space>
                            </List.Item>
                          )}
                        />
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {filteredSets.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px" }}>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Không tìm thấy bộ gift silk nào phù hợp với từ khóa
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default GiftSilk
