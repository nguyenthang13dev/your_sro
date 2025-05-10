"use client"

import { authService } from "@/services/auth/auth.service"
import { Card, ConfigProvider, Typography, theme } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import relativeTime from "dayjs/plugin/relativeTime"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

dayjs.extend(relativeTime)
dayjs.locale("vi")

const { Title, Text } = Typography

interface AccountItem {
    userName: string
  createAt: string 
}

interface ScrollingAccountsListProps {
  title?: string
  maxHeight?: number
  speed?: "slow" | "normal" | "fast"
}

const ListAccountRegister: React.FC<ScrollingAccountsListProps> = ({
  title = "Tài khoản mới đăng ký",
  maxHeight = 400,
  speed = "normal",
}) => {
  const [displayAccounts, setDisplayAccounts] = useState<AccountItem[]>([])
    const containerRef = useRef<HTMLDivElement>( null )
    
    const handleGetData = async () =>
    {
        try
        {
            const res = await authService.GetAccountRecentLy();
            setDisplayAccounts( res.data ); 
        } catch ( err )
        {
            toast.error("Có lỗi khi lấy danh sách")
        }
      
    }
  
  // Clone accounts for continuous scrolling effect
  useEffect(() => {
      handleGetData();
  }, [])

  // Get animation speed in seconds
  const getAnimationDuration = () => {
    const baseSpeed = displayAccounts.length * 2
    switch (speed) {
      case "slow": return baseSpeed * 1.5
      case "fast": return baseSpeed * 0.6
      default: return baseSpeed
    }
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
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Title level={4} style={{ color: "#fcd34d", margin: "0 0 16px 0", textAlign: "center" }}>
          {title}
        </Title>

        <div
          ref={containerRef}
          style={{
            maxHeight: `${maxHeight}px`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {displayAccounts?.length > 0 ? (
            <div
              className="scrolling-container"
              style={{
                animation: `scrollUp ${getAnimationDuration()}s linear infinite`,
              }}
            >
              {displayAccounts?.map((account, index) => (
                <div
                  key={`${index}`}
                  className="account-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 8px",
                    borderBottom: "1px solid rgba(146, 64, 14, 0.3)",
                    background: "rgba(0, 0, 0, 0.2)",
                    marginBottom: "8px",
                    borderRadius: "6px",
                    transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Text style={{ color: "#fcd34d", fontSize: "16px", display: "block" }}>
                      {account.userName} đã đăng ký tài khoản vào {account.createAt}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Text style={{ color: "#fef08a", display: "block", textAlign: "center" }}>
              Chưa có tài khoản nào đăng ký
            </Text>
          )}
        </div>
      </Card>

      <style jsx global>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .scrolling-container {
          padding: 4px;
        }

        .account-item:hover {
          transform: translateX(5px);
          background: rgba(20, 20, 20, 0.4);
        }

        /* Add a fade effect at the top and bottom */
        .scrolling-container::before,
        .scrolling-container::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 30px;
          z-index: 1;
          pointer-events: none;
        }

        .scrolling-container::before {
          top: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
        }

        .scrolling-container::after {
          bottom: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
        }
      `}</style>
    </ConfigProvider>
  )
}

export default ListAccountRegister
