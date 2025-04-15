import React from "react";
import { Drawer } from "antd";
import PageWidget from "./QLTinTuc_Widget/PageWidget";

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WidgetConfig: React.FC<DepartmentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      title={<div style={{ textAlign: "center" }}>Widget</div>}
      open={isOpen}
      onClose={onClose}
      width="60%"
      //getContainer={false}
      mask={true}
    >
      <PageWidget />
    </Drawer>
  );
};

export default WidgetConfig;
