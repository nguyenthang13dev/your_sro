"use client";
import { ConfigProvider, Layout } from "antd";
import "@/app/assets/css/global.css";
import "@/app/assets/css/font.css";
import "@/app/assets/css/ant-button.css";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";

import { Suspense } from "react";
import Loading from "@/components/shared-components/Loading";
import { ToastContainer } from "react-toastify";

const { Content } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ConfigProvider>
      <Layout>
        <ToastContainer />
        <Layout>
          <Content className="h-100 ">
            <Suspense fallback={<Loading content="content" />}>
              {children}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
