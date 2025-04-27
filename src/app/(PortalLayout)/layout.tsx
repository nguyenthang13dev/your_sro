"use client";
import "@/app/assets/css/ant-button.css";
import "@/app/assets/css/global.css";
import { ConfigProvider, Layout } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import "./custom.css";

import Footer from "@/components/home-components/footer";
import { MainNavigation } from "@/components/home-components/main-navigation";
import Loading from "@/components/shared-components/Loading";
import { Suspense } from "react";
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
                      {/* Top Navigation */}
        <MainNavigation />
              {children}
            <Footer />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
