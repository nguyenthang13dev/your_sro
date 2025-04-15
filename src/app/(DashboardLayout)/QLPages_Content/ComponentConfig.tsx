import React from "react";
import { Drawer } from "antd";
import PageComponent from "./QLPage_Component/PageComponent";

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComponentConfig: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      title={<div style={{ textAlign: "center" }}>Components</div>}
      open={isOpen}
      onClose={onClose}
      width="55%"
      //getContainer={false}
      mask={true}
    >
      <PageComponent />
    </Drawer>
  );
};

export default ComponentConfig;
