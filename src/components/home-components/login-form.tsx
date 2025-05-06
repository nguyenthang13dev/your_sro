"use client"

import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Input, theme } from "antd"
import type React from "react"
import { useState } from "react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", username, password, rememberMe)
  }

  // Custom theme for Ant Design
  const customTheme = {
    token: {
      colorPrimary: "#f59e0b", // amber-500
      colorText: "#fcd34d", // amber-300
      colorTextPlaceholder: "rgba(252, 211, 77, 0.5)", // amber-300 with opacity
      colorBgContainer: "rgba(0, 0, 0, 0.6)",
      colorBorder: "#f59e0b", // amber-500
      borderRadius: 8,
    },
    components: {
      Input: {
        colorBgContainer: "rgba(255, 255, 255, 0.1)",
        colorBorder: "#f59e0b",
      },
      Checkbox: {
        colorPrimary: "#f59e0b",
      },
      Button: {
        colorPrimary: "#f59e0b",
        colorPrimaryHover: "#d97706",
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
      <div className="">
        <div
          className="game-panel-content body-card"
          style={{
            background: "rgba(0, 0, 0, 0.75)",
            borderRadius: "8px",
            padding: "20px",
            border: "1px solid #f59e0b",
            width: "300px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tài khoản"
                prefix={<UserOutlined style={{ color: "rgba(252, 211, 77, 0.5)" }} />}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fcd34d",
                  borderColor: "#f59e0b",
                  height: "40px",
                }}
              />
            </div>

            <div>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                prefix={<LockOutlined style={{ color: "rgba(252, 211, 77, 0.5)" }} />}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ color: "rgba(252, 211, 77, 0.5)" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "rgba(252, 211, 77, 0.5)" }} />
                  )
                }
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fcd34d",
                  borderColor: "#f59e0b",
                  height: "40px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {/* <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ color: "#fcd34d" }}
              >
                <span style={{ color: "#fcd34d", fontSize: "14px" }}>Ghi nhớ tài khoản</span>
              </Checkbox> */}

              <a
                href="#"
                style={{
                  color: "#fcd34d",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                Quên mật khẩu?
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "#f59e0b",
                  borderColor: "#fcd34d",
                  color: "#000",
                  fontWeight: "bold",
                  height: "40px",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                ĐĂNG NHẬP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default LoginForm
