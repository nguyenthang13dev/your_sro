"use client";
import { baseTheme } from "@/constants/ThemeConstant";
import React from "react";

const MyApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ fontFamily: baseTheme.fontFamily }}>
      {children}
    </div>
  );
};

export default MyApp;
