"use client";
import { lightTheme } from "@/constants/ThemeConstant";
import { Providers } from "@/store/providers";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React from "react";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body className="dir-ltr">
        <div className="App">
          <Providers>
            <ConfigProvider theme={lightTheme} locale={viVN}>
              {children}
            </ConfigProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
