
import React from "react";
import { Drawer } from "antd";
import { tableTrangThaiLuongXuLyDataType } from "@/interface/TrangThaiLuongXuLy/TrangThaiLuongXuLy";

interface TrangThaiLuongXuLyViewProps {
  trangThaiLuongXuLy?: tableTrangThaiLuongXuLyDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const TrangThaiLuongXuLyDetail: React.FC<TrangThaiLuongXuLyViewProps> = ({ trangThaiLuongXuLy, isOpen, onClose }) => {
  return (
    <Drawer
      title="Thông tin chi tiết"
      width="20%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={isOpen}
    >
      <div>
        <h6 className="text-muted text-uppercase mb-3">Thông tin chung</h6>
        
      </div>
    </Drawer>
  );
};

export default TrangThaiLuongXuLyDetail;

