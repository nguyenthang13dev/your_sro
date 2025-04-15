"use client";
import { Layout } from "antd";
import {
  TEMPLATE,
  GRAY_SCALE,
  SIDE_NAV_WIDTH,
} from "@/constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "@/store/hooks";
import MenuContent from "./MenuContent";
const { Sider } = Layout;

export const SideNav = () => {
  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  return (
    <Sider
      style={{
        height: `calc(100vh - ${TEMPLATE.HEADER_HEIGHT}px)`,
        position: `fixed`,
        top: `${TEMPLATE.HEADER_HEIGHT}px`,
        boxShadow: "0 1px 4px -1px rgba(0, 0, 0, 0.15)",
        zIndex: 999,
        backgroundColor: `${GRAY_SCALE.WHITE}`,
      }}
      className="side-nav"
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent />
      </Scrollbars>
    </Sider>
  );
};
