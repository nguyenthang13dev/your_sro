"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input, Checkbox, Button, ConfigProvider, theme } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.service";
import { toast } from "react-toastify";
import { setLogin } from "@/store/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

type LoginType = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe] = useState(false); // Nếu cần có thể bật lại checkbox
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const [userInfo, setUserInfo] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  const onLogin = async (loginForm: LoginType) => {
    try {
      const data = await authService.login(loginForm);
      if (data != null && data.status) {
        dispatch(setLogin(data));
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setMessage("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password, rememberMe });
  };

  const customTheme = {
    token: {
      colorPrimary: "#f59e0b",
      colorText: "#fcd34d",
      colorTextPlaceholder: "rgba(252, 211, 77, 0.5)",
      colorBgContainer: "rgba(0, 0, 0, 0.6)",
      colorBorder: "#f59e0b",
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
  };

  const handleGetUserInfo = async () => {
    try {
      const response = await authService.getInfo();
      if (response.status) {
        setUserInfo(response.data);
      }
      console.log(response);
    } catch (err) {}
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    setToken(accessToken);
    if (accessToken) {
      handleGetUserInfo();
    }
  }, []);

  return (
    <>
      {token ? (
        <>
          <Button
            type="primary"
            onClick={() => router.push("/dashboard")}
            style={{
              background: "linear-gradient(45deg, #f59e0b, #fbbf24)",
              borderColor: "#fcd34d",
              color: "#1f2937",
              fontWeight: "600",
              width: "100%",
              fontSize: "24px",
              height: "48px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              minHeight: "70%",
              marginTop: "24px",
            }}
          >
            Xin chào, {userInfo?.userName}
          </Button>
        </>
      ) : (
        <ConfigProvider
          theme={{ algorithm: theme.darkAlgorithm, ...customTheme }}
        >
          <div className="card-items">
            <div
              className="game-panel-content body-card"
              style={{
                background: "rgba(0, 0, 0, 0.75)",
                borderRadius: "8px",
                padding: "20px",
                border: "1px solid #f59e0b",
                width: "100%",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tài khoản"
                  prefix={
                    <UserOutlined
                      style={{ color: "rgba(252, 211, 77, 0.5)" }}
                    />
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fcd34d",
                    borderColor: "#f59e0b",
                    height: "40px",
                  }}
                />

                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  prefix={
                    <LockOutlined
                      style={{ color: "rgba(252, 211, 77, 0.5)" }}
                    />
                  }
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined
                        style={{ color: "rgba(252, 211, 77, 0.5)" }}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        style={{ color: "rgba(252, 211, 77, 0.5)" }}
                      />
                    )
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fcd34d",
                    borderColor: "#f59e0b",
                    height: "40px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
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

                {message && (
                  <div
                    style={{
                      color: "#f87171",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {message}
                  </div>
                )}

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
              </form>
            </div>
          </div>
        </ConfigProvider>
      )}
    </>
  );
}

export default LoginForm;
