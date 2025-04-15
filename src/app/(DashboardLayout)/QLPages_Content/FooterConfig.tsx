import React from "react";
import { Drawer } from "antd";
import FooterViewer from "./Footer/FooterViewer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FooterConfig: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      title={<div style={{ textAlign: "center" }}>Cấu hình Footer</div>}
      open={isOpen}
      onClose={onClose}
      width="55%"
      mask={true}
    >
      <FooterViewer />
    </Drawer>
  );
};

export default FooterConfig;
